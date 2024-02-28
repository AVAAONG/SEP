'use client'
import { Tab, Tabs } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const TogleTab = () => {
    const { get } = useSearchParams();
    const selectedKeyQueryParam = get('selectedKey') || 'CALENDAR';

    const handleSelectionChange = (key: React.Key) => {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('selectedKey', key.toString());
        window.location.search = urlParams.toString();
    };

    return (
        <div className="flex flex-wrap gap-4">
            <Tabs
                color="success"
                selectedKey={selectedKeyQueryParam}
                onSelectionChange={handleSelectionChange}
                aria-label="Tabs colors"
                classNames={{
                    tabList: 'bg-gray-100',
                }}
                radius="full"
            >
                <Tab key="CALENDAR" title="Calendario" />
                <Tab key="LIST" title="Lista" />
            </Tabs>
        </div>
    );
};

export default TogleTab;
