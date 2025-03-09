"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Car,
  Menu,
  ChevronLeft,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const [isLoading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/users/logout", {
        method: "GET",
      });
      if (response.ok) {
        // Handle successful logout, e.g., redirect to login page
        window.location.href = "/";
      } else {
        // Handle error
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside
      className={`${
        isSidebarOpen ? "w-64" : "w-20"
      } bg-white h-full transition-all border-r p-4 flex flex-col items-center shadow-md`}
    >
      {/* Sidebar Toggle */}
      <div className="w-full flex justify-between items-center">
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md hover:bg-gray-100 transition"
        >
          {isSidebarOpen ? <ChevronLeft size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 w-full mt-6">
        <ul className="space-y-2">
          <NavItem
            href="/admin"
            icon={<LayoutDashboard size={22} />}
            isOpen={isSidebarOpen}
          >
            Dashboard
          </NavItem>
          <NavItem
            href="/admin/users"
            icon={<Users size={22} />}
            isOpen={isSidebarOpen}
          >
            Users
          </NavItem>
          <NavItem
            href="/admin/rides"
            icon={<Car size={22} />}
            isOpen={isSidebarOpen}
          >
            Rides
          </NavItem>
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="w-full mt-auto">
        <ul className="space-y-2">
          {/* <NavItem
            href="/admin/settings"
            icon={<Settings size={22} />}
            isOpen={isSidebarOpen}
          >
            Settings
          </NavItem> */}
          <li>
            <button
              onClick={handleLogout}
              className={`flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition w-full text-red-500 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              <LogOut size={22} />
              {isSidebarOpen && (
                <span className="text-sm font-medium">Logout</span>
              )}
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

// Reusable Navigation Item Component
const NavItem = ({ href, icon, children, isOpen, className = "" }) => (
  <li>
    <Link
      href={href}
      className={`flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition w-full text-gray-700 ${className}`}
    >
      {icon}
      {isOpen && <span className="text-sm font-medium">{children}</span>}
    </Link>
  </li>
);

export default Sidebar;
