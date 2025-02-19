'use client';
import { revalidateSpecificPath, setCookie } from '@/lib/serverAction';
import { Select, SelectItem, Selection } from "@heroui/react";
import { useState } from 'react';

export default function Selector({ chapters, currentAdminChapter }) {
    const [value, setValue] = useState<Selection | undefined>(new Set([currentAdminChapter]));
    const handleSelectionChange = async (newValue: Selection) => {
        if (newValue) {
            await setCookie('chapter', Array.from(newValue)[0]);
        }
        revalidateSpecificPath('/admin/**');
        setValue(newValue);
    };

    if (currentAdminChapter !== 'Rokk6_XCAJAg45heOEzYb') return null;
    else {

        return (
            <div className="w-32 h-10">
                <Select
                    radius="sm"
                    size='sm'
                    isDisabled={currentAdminChapter !== 'Rokk6_XCAJAg45heOEzYb'}
                    label="Capitulo"
                    variant="flat"
                    labelPlacement="outside-left"
                    classNames={{
                        label: 'hidden',
                    }}
                    selectedKeys={value}
                    defaultSelectedKeys={value}
                    className="max-w-xs"
                    onSelectionChange={async (value) => handleSelectionChange(value)}
                >
                    {chapters.map((chapter) => (
                        <SelectItem key={chapter.id} value={chapter.name}>
                            {chapter.name.toLowerCase()}
                        </SelectItem>
                    ))}
                </Select>
            </div >
        );
    }

}
