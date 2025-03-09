"use client";
import { useEffect, useState } from "react";
import Sidebar from "./_components/Sidebar";
import axios from "axios";

export default function AdminLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function verifyAdmin() {
      try {
        const response = await axios.get("/api/verify-admin");
        if (response?.data?.success) {
          setIsAdmin(true);
        } else {
          // Handle error response
          console.error("Failed to verify admin");
        }
      } catch (error) {
        console.error("Error verifying admin:", error);
      } finally {
        setIsLoading(false);
      }
    }

    verifyAdmin();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow p-4">Admin Panel</header>

        {/* Page Content */}
        <main className="">{children}</main>
      </div>
    </div>
  );
}
