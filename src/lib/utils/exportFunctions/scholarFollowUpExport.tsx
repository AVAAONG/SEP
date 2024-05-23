'use client';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const exportFollowUpData = async (attendeesData: {}[]) => {
  const response = await fetch('/excelTemplates/follow_up_template.xlsx');
  const arrayBuffer = await response.arrayBuffer();

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(arrayBuffer);

  const worksheet1 = workbook.getWorksheet(1);
  const worksheet2 = workbook.getWorksheet(2);
  const worksheet3 = workbook.getWorksheet(3);
  if (!worksheet1) throw new Error(`Worksheet 1 not found`);
  if (!worksheet2) throw new Error(`Worksheet 2 not found`);
  if (!worksheet3) throw new Error(`Worksheet 3 not found`);
  else {
    attendeesData.forEach((attendee, index) => {
      const rowIndex = index + 2; // Start from row 2
      Object.values(attendee).forEach((value, colIndex) => {
        const excelColIndex = colIndex + 1; // Excel is 1-indexed
        if ([5, 6, 7, 8].includes(excelColIndex)) {
          // If the column is 5, 6, 7, or 8, convert the value to a number
          worksheet1.getCell(rowIndex, excelColIndex).value = Number(value);
          worksheet2.getCell(rowIndex, excelColIndex).value = Number(value);
          worksheet3.getCell(rowIndex, excelColIndex).value = Number(value);
        } else {
          worksheet1.getCell(rowIndex, excelColIndex).value = value?.toString();
          worksheet2.getCell(rowIndex, excelColIndex).value = value?.toString();
          worksheet3.getCell(rowIndex, excelColIndex).value = value?.toString();
        }
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, `reporte de seguimiento - ${new Date().toLocaleDateString()}.xlsx`);
  }
};

export default exportFollowUpData;
