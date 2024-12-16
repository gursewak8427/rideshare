"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const BookingButton = ({ rideid }: { rideid: string }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true); // Start loading state
    try {
      const response = await axios.get("/api/users/profile");

      if (response?.data?.success) {
        // User is authenticated
        const response2 = await axios.post("/api/rides/bookings", { rideid });

        if (!response2?.data?.success) {
          // Booking failed
          alert(response2?.data?.message || "Failed to book the ride.");
        } else {
          // Booking succeeded
          alert("Ride booked successfully!");
          router.push("/mybookings");
        }
      } else {
        // Profile retrieval failed
        alert(response?.data?.message || "Failed to fetch user profile.");
      }
    } catch (error: any) {
      console.error("Error occurred during booking:", {
        error: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
      });

      // Handle error based on status code
      if (error?.response?.status === 401) {
        // Redirect to login
        router.push(`/auth/login?url=/rideslist/${rideid}`);
      } else if (error?.response?.status === 404) {
        // Redirect to profile page
        router.push("/riderprofile");
      } else {
        // Generic error handling
        alert("Something went wrong. Please try again.");
      }
    } finally {
      // Always reset loading state
      setLoading(false);
    }
  };

  return (
    <div className="flex fixed bottom-5 gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={`py-3 rounded-full px-10 text-white text-md font-bold ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500"
          }`}
      >
        {loading ? "Loading..." : "Book"}
      </button>
    </div>
  );
};

export default BookingButton;
