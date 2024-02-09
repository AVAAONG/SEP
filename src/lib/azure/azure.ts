'use server'
import { BlobServiceClient } from "@azure/storage-blob";
import shortUUID from "short-uuid";
function deserializeBlob(base64String: string, type: string): Buffer {
    const base64Data = base64String.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');
    return buffer;
}
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
if (!AZURE_STORAGE_CONNECTION_STRING) {
    throw Error('Azure Storage Connection string not found');
}

const SAAS_TOKEN = process.env.AZURE_STORAGE_CONTAINER_BLOB_SAS_TOKEN

// Create the BlobServiceClient object with connection string
const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING!
);
const containerName = 'profilepictures'
const fileContainerName = 'userfiles'


// Get a reference to a container

// export const createAzureBlobContainer = async () => {
//     const containerClient = blobServiceClient.getContainerClient(containerName);
//     await containerClient.create()
// }
const containerClient = blobServiceClient.getContainerClient(containerName);
const fileContainerClient = blobServiceClient.getContainerClient(fileContainerName);

export const uploadBlob = async (blob: string, type: string, containerType: 'files' | 'picture' = 'picture') => {
    let blockBlobClient;
    if (containerType === 'picture') blockBlobClient = containerClient.getBlockBlobClient(shortUUID.generate());
    else if (containerType === 'files') blockBlobClient = fileContainerClient.getBlockBlobClient(shortUUID.generate())

    const s = deserializeBlob(blob, type);
    try {
        const response = await blockBlobClient.uploadData(s, {
            blobHTTPHeaders: { blobContentType: type },
        });
        console.log('File uploaded to Azure Blob Storage');
        return blockBlobClient.url
    } catch (error) {
        console.error('Error uploading file: ', error);
    }
}

export const deleteBlob = async (blobUrl: string) => {
    const blobName = blobUrl.split('/').pop();
    const blockBlobClient = containerClient.getBlockBlobClient(blobName!);
    try {
        await blockBlobClient.delete();
        console.log('File deleted from Azure Blob Storage');
    } catch (error) {
        console.error('Error deleting file: ', error);
    }
}

export const getBlobImage = async (url: string | null | undefined) => {
    const image = url ? `${url}?${SAAS_TOKEN}` : null;
    return image;
}

export const getBlobFile = async (url: string | null | undefined) => {
    const file = url ? `${url}?${process.env.AZURE_STORAGE_CONTAINER_BLOB_SAS_TOKEN_FILES}` : null;
    return file;
}