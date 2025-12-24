"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import toggle from "../../../public/images/toggle.png";
import { FaSearch } from "react-icons/fa";

interface NavbarProps {
  onToggleSidebar: () => void;
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Read user data from localStorage
  const userFullName =
    typeof window !== "undefined"
      ? localStorage.getItem("user_fullName") || "User"
      : "User";

  const userRole =
    typeof window !== "undefined"
      ? localStorage.getItem("user_role") || "Role"
      : "Role";

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

  const handleLogout = () => {
    localStorage.clear(); // Ya sirf token/role remove karein
    window.location.href = "/login"; // Hard redirect for clean logout
  };

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
        {/* <div className="relative w-64 hidden sm:block">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none text-black"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div> */}

        {/* User Dropdown */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100"
          >
            <span className="block text-sm font-medium text-gray-700">
              {userFullName}
            </span>
            <span className="block text-gray-500">▼</span>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-4 z-50 min-w-[180px] border">
              <div className="text-center mb-3">
                {/* <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-xl">
                  {userFullName.charAt(0).toUpperCase()}
                </div> */}
                <p className="text-sm font-semibold text-gray-800">
                  {userFullName}
                </p>
                <p className="text-xs text-gray-500">Role: {userRole}</p>
              </div>
              <hr className="my-2" />
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded text-sm font-medium"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
