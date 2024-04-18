'use client';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const exportDataToExcel = async (data: any, fileName: string) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data");

    if (!worksheet) throw new Error(`Worksheet not found`);

    // Write column headers
    const headers = Object.keys(data[0]);
    headers.forEach((header: string, index: number) => {
        const cellAddress = `${String.fromCharCode(65 + index)}1`;
        worksheet.getCell(cellAddress).value = header;
    });

    // Write data
    data.forEach((item: Record<string, string>, rowIndex: number) => {
        headers.forEach((header: string, colIndex: number) => {
            const cellAddress = `${String.fromCharCode(65 + colIndex)}${rowIndex + 2}`;
            worksheet.getCell(cellAddress).value = item[header];
        });
    });

    // Save the workbook and download it
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, `${fileName.trim()}.xlsx`);
};

export default exportDataToExcel;