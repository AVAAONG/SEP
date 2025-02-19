'use client';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { Button } from "@heroui/react";
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

interface ExportButtonProps {
  activityTitle: string;
  competenceOrLevel: string;
  speakerName: string;
  modality: string;
  platform: string;
  date: string;
  hour: string;
  attendeesData: {}[];
}

async function writeToCell(workbook: ExcelJS.Workbook, cellAddress: string, value: any) {
  // Get the worksheet
  const worksheet = workbook.getWorksheet(1);

  // Write the value to the cell
  worksheet.getCell(cellAddress).value = value;
}

const exportAttendanceData = async (
  activityTitle: string,
  competenceOrLevel: string,
  speakerName: string,
  modality: string,
  platform: string,
  date: string,
  hour: string,
  attendeesData: {}[]
) => {
  const response = await fetch('/excelTemplates/attendance_template.xlsx');
  const arrayBuffer = await response.arrayBuffer();

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(arrayBuffer);
  writeToCell(workbook, 'A2', activityTitle);
  writeToCell(workbook, 'A3', competenceOrLevel);
  writeToCell(workbook, 'B4', speakerName);
  writeToCell(workbook, 'B5', modality);
  writeToCell(workbook, 'B6', platform);
  writeToCell(workbook, 'D4', date);
  writeToCell(workbook, 'D5', hour);
  writeToCell(workbook, 'D6', attendeesData.length);

  const worksheet = workbook.getWorksheet(1);
  attendeesData.forEach((attendee, index) => {
    const rowIndex = index + 8; // Start from row 8
    Object.values(attendee).forEach((value, colIndex) => {
      worksheet.getCell(rowIndex, colIndex + 1).value = value.toString(); // colIndex + 1 because Excel is 1-indexed
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  saveAs(blob, `${activityTitle.trim()}.xlsx`);
};

const ExportButton: React.FC<ExportButtonProps> = ({
  activityTitle,
  competenceOrLevel,
  speakerName,
  modality,
  platform,
  date,
  hour,
  attendeesData,
}) => {
  return (
    <Button
      onClick={() =>
        exportAttendanceData(
          activityTitle,
          competenceOrLevel,
          speakerName,
          modality,
          platform,
          date,
          hour,
          attendeesData
        )
      }
      className="w-auto flex gap-2 items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10  dark:focus:ring-gray-700 dark:bg-slate-950 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      type="button"
      startContent={<ArrowUpTrayIcon className="w-5 h-5 text-primary-1" />}
    >
      Exportar lista
    </Button>
  );
};

export default ExportButton;
