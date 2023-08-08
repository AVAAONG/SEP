'use client';
import React, { Children } from 'react';
import TransitionC from './Transition';
import Sidebar from './Sidebar';
import NavigationBar from './NavigationBar';

const Navigation = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>
        <TransitionC />
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
