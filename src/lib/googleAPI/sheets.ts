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