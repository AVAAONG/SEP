import { Drive } from "../auth/auth";

/**
 * Deletes a file based on its Id
 * @param FileId the id of the file we want to delete
 */
export const deleteFile = (fileId: string) => {
    try {
        Drive.files.delete({ fileId });

    }
    catch (e) {
        console.error(e);
    }
};
/**
 * Creates a copy of the form template {@linkcode TEMPLATE_WORKSHOP_FORM_PROPERTY_KEY}
 *
 * It makes a copy of the form we set of as template for registring to the workshops an then move that document to a specific directory.
 *
 * @returns the id of the form reciently created

 * @see {@link https://developers.google.com/apps-script/reference/drive} for reference about app-script rive
 * @see {@link https://developers.google.com/apps-script/reference/drive/file} for reference about DriveApp 'File' Class
 */
export const copyFile = async (fileName: string, fileId: string, folderId: string) => {
    try {
        const res = await Drive.files.copy({ fileId, requestBody: { name: fileName, parents: [folderId] } });
        console.log(`File copied successfully with ID: ${res.data.id}`);
        return res.data.id;
    } catch (err) {
        console.error(err);
    }

};

export const getFile = async (fileId: string) => {
    try {
        const res = await Drive.files.get({ fileId });
        return res.data;
    } catch (err) {
        console.error(err);
    }
}

export const getAllFilesInFolder = async (folderId: string) => {
    const res = await Drive.files.list({
        q: `'${folderId}' in parents and mimeType='application/vnd.google-apps.spreadsheet'`,
        fields: 'nextPageToken, files(id, name)',
    });
    const files = res.data.files;
    if (files?.length) {
        return files;
    } else {
        console.log('No files found.');
    }
}
