"use client";
import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    // <div className="flex h-screen bg-gray-100">
    //   {/* Sidebar */}
    //   <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

    //   {/* Main Content - Shift right on desktop to account for fixed sidebar width */}
    //   <div className="flex-1 flex flex-col overflow-hidden md:ml-[240px]">
    //     {/* Navbar with toggle */}
    //     <Navbar onToggleSidebar={toggleSidebar} />

    //     {/* Page Content - Consistent padding on all sides for all pages */}
    //     <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
    //       {children}
    //     </main>
    //   </div>

    //   {/* Mobile Overlay */}
    //   {isSidebarOpen && (
    //     <div
    //       className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
    //       onClick={() => setIsSidebarOpen(false)}
    //     />
    //   )}
    // </div>
    <div className="flex h-screen bg-gray-100 relative">
      {" "}
      {/* ← add relative */}
      {/* Main content always visible */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-[240px]">
        <Navbar onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {children}
        </main>
      </div>
      {/* Sidebar – higher z-index */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      {/* Overlay – between content and sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[45] md:hidden" // z between content and sidebar
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
