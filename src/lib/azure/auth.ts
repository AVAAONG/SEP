'use client';
import { PublicClientApplication } from '@azure/msal-browser';
import msalConfig from './authConfig';

export async function acquireToken() {
    const myMSALObj = new PublicClientApplication(await msalConfig());
    const scopes = ["Calendars.ReadWrite"];

    await myMSALObj.initialize();

    try {
        const accounts = myMSALObj.getAllAccounts();
        const silentRequest = {
            scopes: scopes,
            account: accounts[0],
            forceRefresh: false // Try to get a token silently
        };
        if (accounts.length > 0) {

            const response = await myMSALObj.acquireTokenSilent(silentRequest);
            return response.accessToken;
        } else {
            return await myMSALObj.acquireTokenSilent(silentRequest);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}
