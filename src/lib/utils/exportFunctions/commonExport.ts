'use client';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const exportDataToExcel = async (data: any, fileName: string) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data");

    if (!worksheet) throw new Error(`Worksheet not found`);

    // Write column headers
    const headers = Object.keys(data[0]);
    const headerRow = worksheet.getRow(1);
    headers.forEach((header: string, index: number) => {
        headerRow.getCell(index + 1).value = header ?? 'N/A';
    });
    headerRow.commit();

    // Write data
    data.forEach((item: Record<string, string>, rowIndex: number) => {
        const row = worksheet.getRow(rowIndex + 2);
        headers.forEach((header: string, colIndex: number) => {
            console.log(header, item[header]);
            row.getCell(colIndex + 1).value = item[header];
        });
        row.commit();
    });

    // Save the workbook and download it
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, `${fileName.trim()}.xlsx`);
};

export default exportDataToExcel;