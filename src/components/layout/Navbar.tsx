// Updated: components/layout/Navbar.tsx (Assuming this is your Header; added hamburger toggle)
"use client";
import { useState } from "react";
import Image from "next/image";

interface NavbarProps {
  onToggleSidebar: () => void;
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* Left: Logo + Title + Mobile Hamburger */}
      <div className="flex items-center space-x-4">
        {/* Mobile Hamburger Button */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
        >
          <span className="text-xl">☰</span> {/* Hamburger icon */}
        </button>

        <Image
          src="/images/logo.png" // Small logo
          alt="Pak-Al-Shifa"
          width={32}
          height={32}
          className="rounded"
        />
        <div>
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-md mx-8 hidden md:block">
        <div className="relative">
          <input
            type="text"
            placeholder="Search patients, reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      {/* Right: User Profile */}
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
          <span>🔔</span> {/* Notification icon */}
        </button>
        <div className="flex items-center space-x-3 p-2 rounded-full hover:bg-gray-100 cursor-pointer group">
          <Image
            src="https://api.placeholder.com/40x40?text=DB" // Avatar
            alt="Danny Bates"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="hidden md:block text-sm font-medium text-gray-700">
            Danny Bates
          </span>
          <div className="hidden group-hover:block absolute right-4 top-full bg-white shadow-lg rounded-lg p-2 z-10">
            <p className="text-sm">Danny Bates</p>
            <p className="text-xs text-gray-500">Admin</p>
            <button className="block w-full text-left px-2 py-1 text-red-600 hover:bg-red-50 rounded">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
