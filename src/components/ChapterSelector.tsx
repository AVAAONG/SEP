'use client';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { Select, SelectItem, Selection } from '@nextui-org/react';
import { getCookie, setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
//this chapters would be fetched from the database
const chapters = [
  {
    value: 'Rokk6_XCAJAg45heOEzYb',
    label: 'Caracas',
  },
  {
    value: 'VYmgeeUPWwh_P_myJ1PCJ',
    label: 'Carabobo',
  },
  {
    value: 'H0rvqSucbop6uozNUpuC-',
    label: 'Zulia',
  },
];

export default function ChapterSelector() {
  const [value, setValue] = useState<Selection | undefined>(new Set([]));

  useEffect(() => {
    const chapterFromCookie = getCookie('chapter')?.toString();
    setValue(chapterFromCookie ? new Set([chapterFromCookie]) : undefined);
  }, []);

  const handleSelectionChange = (newValue: Selection) => {
    setValue(newValue);
    if (newValue) {
      setCookie('chapter', Array.from(newValue)[0]);
    }
    revalidateSpecificPath('/admin/**');
  };

  return (
    <div className="w-32 h-10">
      <Select
        radius="sm"
        label="Capitulo"
        variant="flat"
        labelPlacement="outside-left"
        classNames={{
          label: 'hidden',
        }}
        selectedKeys={value}
        defaultSelectedKeys={value}
        className="max-w-xs"
        onSelectionChange={handleSelectionChange}
      >
        {chapters.map((animal) => (
          <SelectItem key={animal.value} value={animal.value}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
