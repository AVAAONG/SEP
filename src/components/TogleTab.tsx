'use client';
import { Tab, Tabs } from "@heroui/react";
import { useSearchParams } from 'next/navigation';
import React from 'react';

interface TogleTabProps {
  options: {
    key: string;
    title: string;
  }[];
}

const TogleTab: React.FC<TogleTabProps> = ({ options }) => {
  const { get } = useSearchParams();
  const selectedKeyQueryParam = get('selectedKey') || options[0].key;

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
        className="!text-white"
        classNames={{
          tabList: 'bg-gray-100 dark:bg-gray-800',
          tab: '!text-white',
        }}
        radius="full"
      >
        {options.map((option) => (
          <Tab className="!text-white" key={option.key} title={option.title} />
        ))}
      </Tabs>
    </div>
  );
};

export default TogleTab;
