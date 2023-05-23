import * as MicrosoftGraph from "@microsoft/microsoft-graph-client";

const COUTLOOK_CLIENT_ID = process.env.OUTLOOK_CLIENT_ID;
const OUTLOOK_CLIENT_SECRET = process.env.OUTLOOK_CLIENT_SECRET;
const OUTLOOK_TENANT_ID = process.env.OUTLOOK_TENANT_ID;


export const getAccessToken = async () => {
    const authProvider = new MicrosoftGraph.ClientCredentialAuthProvider(
        COUTLOOK_CLIENT_ID,
        OUTLOOK_CLIENT_SECRET,
        OUTLOOK_TENANT_ID
    );

    try {
        const client = MicrosoftGraph.Client.init({
            authProvider,
        });

        const result = await client.api("/oauth2/v2.0/token").post({
            grant_type: "client_credentials",
            scope: "https://graph.microsoft.com/.default",
        });

        return result.access_token;
    } catch (error) {
        console.error(error);
    }
}


export const sendEmail = async (accessToken: string, messageObject: {}) => {
    const client = MicrosoftGraph.Client.init({
        authProvider: (done: any) => {
            done(null, accessToken);
        },
    });
    try {
        await client.api("/me/sendMail").post({ messageObject });
    } catch (error) {
        console.error(error);
    }
}


export const createMailMessageObject = (
    subject: string,
    htmlMessage: string,
    toRecipients: string[],
    ccRecipients: string[],
    bccRecipients: string[]
) => {
    const message = {
        subject,
        body: {
            contentType: "HTML",
            content: htmlMessage,
        },
        toRecipients: toRecipients.map((email) => ({
            emailAddress: {
                address: email,
            },
        })),
        ccRecipients: ccRecipients.map((email) => ({
            emailAddress: {
                address: email,
            },
        })),
        bccRecipients: bccRecipients.map((email) => ({
            emailAddress: {
                address: email,
            },
        })),
    };
    return message;
}