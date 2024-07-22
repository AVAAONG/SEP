'use client';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

interface AttendeeData {
  [key: string]: string | number;
}

const exportFollowUpData = async (attendeesData: AttendeeData[]) => {
  const response = await fetch('/excelTemplates/follow_up_template.xlsx');
  const arrayBuffer = await response.arrayBuffer();

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(arrayBuffer);

  const worksheets = [workbook.getWorksheet(1), workbook.getWorksheet(2), workbook.getWorksheet(3)];

  if (worksheets.some((sheet) => !sheet)) {
    throw new Error('One or more required worksheets not found');
  }
  attendeesData.forEach((attendee, index) => {
    const rowIndex = index + 2; // Start from row 2
    Object.entries(attendee).forEach(([key, value], colIndex) => {
      const excelColIndex = colIndex + 1; // Excel is 1-indexed
      worksheets.forEach((worksheet) => {
        if (worksheet) {
          if ([5, 6, 7, 8].includes(excelColIndex) && typeof value === 'number') {
            worksheet.getCell(rowIndex, excelColIndex).value = value;
          } else {
            worksheet.getCell(rowIndex, excelColIndex).value = value?.toString() || '';
          }
        }
      });
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  saveAs(blob, `reporte de seguimiento - ${date}.xlsx`);
};

export default exportFollowUpData;
