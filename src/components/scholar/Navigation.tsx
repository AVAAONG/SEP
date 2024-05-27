'use client';
import React from 'react';
import NavigationBar from './NavigationBar';
import Sidebar from './Sidebar';

const Navigation = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>
        <Sidebar />
        <div className="md:pl-64 flex flex-col flex-1">
          <NavigationBar />
          <main className="flex-1">
            <div className="">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Navigation;
