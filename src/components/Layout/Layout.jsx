import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] flex overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen custom-scrollbar relative">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
