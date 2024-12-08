// components/Layout.tsx
"use client";
import Header from '@/components/UI/Header';
import Sidebar from '@/components/UI/Sidebar';
import { useLoggedUserQuery } from '@/redux/api/userApi';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { push } = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data, isLoading } = useLoggedUserQuery(undefined);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Redirect User to home if role is 'User'
  if (data?.data?.role === 'User') {
    push('/');
  }

  return (
    <div className="overflow-hidden main">
      <div className="flex flex-col flex-1 w-full h-screen">
        {/* Header Component */}
        <Header isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} data={data} isLoading={isLoading} />

        {/* Main Content */}
        <main className="flex md:h-[88vh] overflow-hidden">
          {/* Sidebar Component */}
          <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} data={data} />

          {/* Content Container with no-scrollbar */}
          <div className="container mx-auto p-4 overflow-hidden md:overflow-y-auto no-scrollbar">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
