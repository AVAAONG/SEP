import { PublicClientApplication } from '@azure/msal-browser';
import { Client as GraphClient } from '@microsoft/microsoft-graph-client';
import { PrismaClient } from '@prisma/client';

// Prisma model for storing tokens
const prisma = new PrismaClient();

// MSAL configuration
const config = {
    auth: {
        clientId: 'your_application_id',
        authority: `https://login.microsoftonline.com/your_tenant_id`,
        clientSecret: 'your_client_secret',
    },
    system: {
        loggerOptions: {
            loggerCallback() { }, // Disable MSAL logs if desired
        },
    },
};

const cca = new PublicClientApplication(config);
const graphScopes = ['https://graph.microsoft.com/.default'];

async function getAuthenticatedGraphClient() {
    try {
        // Try to fetch tokens from Prisma
        const storedToken = await prisma.token.findFirst();

        if (storedToken) {
            const tokenRequest = {
                scopes: graphScopes,
                account: null, // Account not needed in client credentials flow
                refreshToken: storedToken.refreshToken,
            };

            const response = await cca.acquireTokenByCode(tokenRequest);

            // Update tokens in Prisma if refreshed
            if (response.accessToken && response.refreshToken) {
                await prisma.token.update({
                    where: { id: storedToken.id },
                    data: { accessToken: response.accessToken, refreshToken: response.refreshToken },
                });
            }

            return GraphClient.init({
                authProvider: (done) => done(null, response.accessToken),
            });
        } else {
            // No token found - acquire a new access token
            const response = await cca.acquireTokenForClient(graphScopes);

            // Store new tokens in Prisma
            await prisma.token.create({
                data: { accessToken: response.accessToken, refreshToken: response.refreshToken },
            });

            return GraphClient.init({
                authProvider: (done) => done(null, response.accessToken),
            });
        }
    } catch (error) {
        console.error('Error acquiring access token:', error);
        throw error;
    }
}
