import { sheets_v4 } from '@googleapis/sheets';
import { Sheets } from './auth';

const copySheet = async (spreadsheetId: string, activityName: string) => {
  try {
    const response = await Sheets.spreadsheets.sheets.copyTo({
      sheetId: 0,
      spreadsheetId,
      requestBody: {
        destinationSpreadsheetId: spreadsheetId,
      },
    });
    //TODO: fix the name of the sheet
    createSheetName(spreadsheetId, response.data.sheetId!, activityName);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Sets the name of the sheet in where all the response for an specific workshop would be saved
 *
 *@description It uses recursion in the case we have an error saying "sheet already exist" to set an incremental value (the `numb` parameter), whitin parentesis,  following the sheet name to avoid that error to stop the program.
 *
 *  We cannot have two workshops named "Liderazgo" due to the configuration of the sheets, but we can seet a second workshop with that name with an incremental value that will allow us to have multiple sheets with the same name. Example:
 *
 * - the first instace will be"Liderazgo"
 * - the second instace will be "Liderazgo (1)"
 * - the third instace will be "Liderazgo (2)" and so on
 *
 * @param ss the spreadsheet we want to grab to set the the name of the newly created Sheet
 * @param tittle The tittle of the sheet (The workshop's tittle)
 * @param numb a param that allows us to set an increment if there are two sheets with the same name
 */
const createSheetName = (spreadsheetId: string, sheetId: number, tittle: string, numb = 0) => {
  let num = numb === 0 ? 1 : 0;
  let sheetTittle = tittle;
  try {
    updateSheetName(spreadsheetId, sheetId, sheetTittle);
  } catch (e) {
    num += numb;
    /**
     * substract the `(num)` part of the string to avoid the tittle have multiple parenteses. eg. `tittle(num)(num)(num)`
     */
    sheetTittle =
      numb === 0 ? `${tittle}(${num})` : `${tittle.slice(0, tittle.length - 3)}(${num})`;
    createSheetName(spreadsheetId, sheetId, sheetTittle, num + 1);
  }
  return sheetTittle;
};

export const getSheetsName = async (spreadsheetId: string) => {
  try {
    const response = await Sheets.spreadsheets.get({
      spreadsheetId: spreadsheetId,
    });
    const sheets = response.data.sheets;
    const sheetsName = sheets?.map((sheet) => sheet.properties?.title);

    return sheetsName;
  } catch (err) {
    console.error(err);
  }
};

const updateSheetName = async (spreadsheetId: string, sheetId: number, sheetName: string) => {
  try {
    const response = await Sheets.spreadsheets.batchUpdate({
      spreadsheetId: spreadsheetId,
      requestBody: {
        requests: [
          {
            updateSheetProperties: {
              properties: {
                sheetId: sheetId,
                title: sheetName,
              },
              fields: 'title',
            },
          },
        ],
      },
    });
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

// const createSpreadSheetFormResponse = () => {
//   const myDate = new Date();
//   const currentMonth = Number(myDate.getMonth().toFixed());
//   const { storedMonth, actualSpreadSheet } = getFormData();
//   if (currentMonth === storedMonth) {
//     let ss = SpreadsheetApp.openById(actualSpreadSheet);
//     const source = SpreadsheetApp.openById(SPREADSHEET_TEMPLATE_FOR_FORM_VALIDATION_ID);
//     const sheetToCpy = source.getSheets()[0];
//     sheetToCpy.copyTo(ss);
//     return ss;
//   }
//   else {
//     const ss = createSpreadSheet(MONTHS[currentMonth]);
//     const source = SpreadsheetApp.openById(SPREADSHEET_TEMPLATE_FOR_FORM_VALIDATION_ID);
//     const sheetToCpy = source.getSheets()[0];
//     sheetToCpy.copyTo(ss);
//     updateFormData(ss);
//     return ss;
//   }
// };

// const updateSpreadsheet = async (spreadsheetId: string, updateObject: ) => {

//   try {
//     const response = await Sheets.spreadsheets.values.update();
//     console.log(response.data);
//   } catch (err) {
//     console.error(err);
//   }

// }

const createSpreadseetUpdateObject = async (
  spreadsheetId: string,
  range: string,
  values: any[]
): Promise<sheets_v4.Params$Resource$Spreadsheets$Values$Update> => {
  const updateObject = {
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    requestBody: {
      values,
    },
  };
  return updateObject;
};

/**
 * Retrieves values from a Google Sheets spreadsheet.
 * @param spreadsheetId - The ID of the spreadsheet to retrieve values from.
 * @param range - The range of cells to retrieve values from.
 * @returns A promise that resolves to an array of arrays, where each inner array represents a row of values.
 */
export const getSpreadsheetValues = async (spreadsheetId: string, range: string) => {
  try {
    const response = await Sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return response.data.values;
  } catch (err) {
    console.error(err);
  }
};



export const getSpreadsheetValuesByUrl = async (spreadsheetUrl: string, range: string) => {
  const spreadsheetId = spreadsheetUrl.split('/')[5];
  try {
    const response = await Sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return response.data.values;
  } catch (err) {
    console.error(err);
  }
}

//create spreadsheetId
export const createSpreadsheet = async (title: string) => {
  try {
    const response = await Sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title,
        },
      },
    });
    return response.data.spreadsheetId;
  } catch (err) {
    console.error(err);
  }
}
//append values to spreadshee
export const appendSpreadsheetValues = async (
  spreadsheetUrl: string,
  sheetName: string,
  values: any[]
) => {
  const spreadsheetId = spreadsheetUrl.split('/')[5];
  try {
    const sheet = await Sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:F`,
      majorDimension: 'COLUMNS',
    });
    const lastRow = sheet.data.values[0].length + 1;
    const range = `${sheetName}!A${lastRow}`;
    const response = await Sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};


//create a new spreadsheet and return its url 
export const createSpreadsheetAndReturnUrl = async (title: string) => {
  try {
    const response = await Sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title,
        },
      },
    });
    return response.data.spreadsheetUrl;
  } catch (err) {
    console.log("Error al crear el spreadsheet")
    console.error(err);
  }
}
//append a new row with a specified  values to a spreadsheet 
export const appendSpreadsheetValuesByRange = async (
  spreadsheetUrl: string,
  values: any[]
) => {
  const spreadsheetId = spreadsheetUrl.split('/')[5];
  try {
    const response = await Sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:F',
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

//insert a value in a specific cell of a spreadsheet
export const insertSpreadsheetValue = async (
  spreadsheetId: string,
  range: string,
  values: any[]
) => {
  try {
    const response = await Sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};