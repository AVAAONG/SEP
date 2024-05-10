'use server';

import { Configuration } from '@azure/msal-browser';

/**
 * @file Azure Authentication
 * @description Functions related to Azure authentication
 */
const TENANT_ID = process.env.TENANT_ID;
const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;

if (!TENANT_ID || !CLIENT_ID || !REDIRECT_URI) throw new Error('Missing environment variables');


const msalConfig = async (): Promise<Configuration> => {
    return {
        auth: {
            clientId: CLIENT_ID,
            authority: `https://login.microsoftonline.com/${TENANT_ID}`,
            redirectUri: 'http://localhost:3000/admin/api/ms-api-callback',
        },
        cache: {
            cacheLocation: "sessionStorage",
            storeAuthStateInCookie: false

        }
    }
};

export default msalConfig;
