"use client";
import { useState } from "react";
import Image from "next/image";
import avatar from "../../../public/images/avatar.png";
import { FaSearch, FaBell } from "react-icons/fa";

interface NavbarProps {
  onToggleSidebar: () => void;
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-1 flex items-center justify-between">
      {/* Left: Logo + Title + Mobile Hamburger */}
      <div className="flex items-center space-x-4">
        {/* Mobile Hamburger Button */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
        >
          <span className="text-xl">☰</span> {/* Hamburger icon */}
        </button>

        <div>
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </div>

      {/* Center: Search */}
      {/* <div className="flex-1 max-w-md mx-auto">
        
      </div> */}

      {/* Right: Notification + User Profile */}
      <div className="flex items-center space-x-4">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-100 rounded-md text-sm bg-gray-100 placeholder:text-gray-500 placeholder:text-black focus:outline-none focus:ring-0 focus:border-gray-100 text-black"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors relative border-gray-100 bg-gray-100 ">
          <FaBell size={20} />
          {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            1
          </span> */}
        </button>
        <div className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 cursor-pointer group relative">
          <Image
            src={avatar}
            alt="Danny Bates"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="hidden md:block text-sm font-medium text-gray-700">
            Danny Bates
          </span>
          <span className="hidden md:block text-gray-500">▼</span>
          {/* Dropdown Menu */}
          <div className="hidden group-hover:block absolute right-0 top-full mt-2 bg-white shadow-lg rounded-lg p-2 z-10 min-w-[150px]">
            <p className="text-sm font-medium text-gray-700">Danny Bates</p>
            <p className="text-xs text-gray-500 mb-2">Admin</p>
            <button className="block w-full text-left px-2 py-1 text-red-600 hover:bg-red-50 rounded text-sm">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
