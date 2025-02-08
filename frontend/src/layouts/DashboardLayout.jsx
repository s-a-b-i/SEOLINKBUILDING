import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import NavbarPublisher from "../components/NavbarPublisher";
import NavbarAdvertiser from "../components/NavbarAdvertiser";

const DashboardLayout = ({ mode, toggleMode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar 
        mode={mode} 
        toggleMode={toggleMode}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen w-full lg:ml-64">
        {/* Navbar */}
        <div className="sticky top-0 z-10 bg-white border-b w-full">
          {mode === "Publisher" ? (
            <NavbarPublisher 
              // userName="Michael Smyth"
              onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          ) : (
            <NavbarAdvertiser 
              // userName="Michael Smyth"
              onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          )}
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-2 md:p-6 bg-white overflow-x-hidden   overflow-y-auto">
          <div className="max-w-6xl mx-auto ">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;