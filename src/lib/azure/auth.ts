'use server'
import { BlobSASPermissions, BlobServiceClient, StorageSharedKeyCredential, generateBlobSASQueryParameters } from "@azure/storage-blob";
import shortUUID from "short-uuid";
import { updateUsesr } from "../db/utils/users";
function deserializeBlob(base64String: string, type: string): Buffer {
    const base64Data = base64String.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');
    return buffer;
}
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
// if (!AZURE_STORAGE_CONNECTION_STRING) {
//     throw Error('Azure Storage Connection string not found');
// }

// Create the BlobServiceClient object with connection string
const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING!
);
const containerName = 'imagenes'
const blobName = 'nimbre' + shortUUID.generate()

// Get a reference to a container
const containerClient = blobServiceClient.getContainerClient(containerName);
const blockBlobClient = containerClient.getBlockBlobClient(blobName);

export const createAzureBlobContainer = async (blob: Blob, type: string) => {
    const s = deserializeBlob(blob, type);
    try {
        await blockBlobClient.uploadData(s, {
            blobHTTPHeaders: { blobContentType: type },
        });
        console.log('File uploaded to Azure Blob Storage');
        await updateUsesr(blockBlobClient.url);
    } catch (error) {
        console.error('Error uploading file: ', error);
    }
};

export const getImage = async (blockBlobClientUrl: string) => {
    const startsOn = new Date();
    const expiresOn = new Date(startsOn.valueOf() + 86400); // 24 hours later
    const permissions = BlobSASPermissions.parse("r"); // "r" for read
    const sasToken = generateBlobSASQueryParameters(
        { startsOn, expiresOn, permissions, containerName },
        new StorageSharedKeyCredential(
            process.env.AZURE_ACCOUNT_NAME!,
            process.env.AZURE_ACCOUNT_KEY!
        )
    ).toString();

    // Return URL with SAS token
    return `${blockBlobClientUrl}?${sasToken}`;
}

//function to grab the file and send it to the server
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = async function () {
            const base64String = reader.result;
            try {
                await createAzureBlobContainer(base64String, file.type);
                console.log('File uploaded to Azure Blob Storage');
            } catch (error) {
                console.error('Error uploading file: ', error);
            }
        };
        reader.readAsDataURL(file);
    }
}