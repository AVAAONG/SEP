'use client';
import { Button } from '@nextui-org/react';
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
    >
      <svg
        fill="currentColor"
        className="w-5 h-4 text-green-500"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 67.671 67.671"
        xmlSpace="preserve"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          {' '}
          <g>
            {' '}
            <path d="M52.946,23.348H42.834v6h10.112c3.007,0,5.34,1.536,5.34,2.858v26.606c0,1.322-2.333,2.858-5.34,2.858H14.724 c-3.007,0-5.34-1.536-5.34-2.858V32.207c0-1.322,2.333-2.858,5.34-2.858h10.11v-6h-10.11c-6.359,0-11.34,3.891-11.34,8.858v26.606 c0,4.968,4.981,8.858,11.34,8.858h38.223c6.358,0,11.34-3.891,11.34-8.858V32.207C64.286,27.239,59.305,23.348,52.946,23.348z"></path>{' '}
            <path d="M24.957,14.955c0.768,0,1.535-0.293,2.121-0.879l3.756-3.756v13.028v6v11.494c0,1.657,1.343,3,3,3s3-1.343,3-3V29.348v-6 V10.117l3.959,3.959c0.586,0.586,1.354,0.879,2.121,0.879s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242l-8.957-8.957 C35.492,0.291,34.725,0,33.958,0c-0.008,0-0.015,0-0.023,0s-0.015,0-0.023,0c-0.767,0-1.534,0.291-2.12,0.877l-8.957,8.957 c-1.172,1.171-1.172,3.071,0,4.242C23.422,14.662,24.189,14.955,24.957,14.955z"></path>{' '}
          </g>{' '}
        </g>
      </svg>
      Exportar
    </Button>
  );
};

export default ExportButton;
