"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import user from "../../../public/images/user.png";
import { FaSearch, FaBell } from "react-icons/fa";
import toggle from "../../../public/images/toggle.png";

interface NavbarProps {
  onToggleSidebar: () => void;
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-1 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-md hover:bg-gray-100 flex items-center justify-center"
        >
          <Image
            src={toggle}
            alt="Toggle Sidebar"
            width={24}
            height={24}
            className="object-contain"
          />
        </button>

        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
      </div>

      {/* Right */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative w-64 hidden sm:block">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Bell */}
        <button className="p-2 rounded-lg bg-gray-100 text-gray-500 hover:text-gray-700">
          <FaBell size={20} />
        </button>

        {/* User Dropdown */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100"
          >
            <Image
              src={user}
              alt="Danny Bates"
              width={30}
              height={30}
              className="rounded-full"
            />
            <span className="hidden md:block text-sm font-medium text-gray-700">
              Danny Bates
            </span>
            <span className="hidden md:block text-gray-500">▼</span>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-3 z-50 min-w-[160px]">
              <p className="text-sm font-medium text-gray-700">Danny Bates</p>
              <p className="text-xs text-gray-500 mb-2">Admin</p>
              <button className="block w-full text-left px-3 py-1 text-red-600 hover:bg-red-50 rounded text-sm">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
