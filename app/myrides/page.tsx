"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { RideCardSkeleton } from "@/app/_components/RideCardSkelton";

const Page = () => {
  const [rides, setRides] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getMyRides = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/rides/my");
      setRides(response?.data?.details || []);
    } catch (error) {
      console.error("Error fetching rides:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyRides();
  }, []);

  return (
    <div className="p-4 mt-4">
      <h1 className="font-bold mb-4 text-center w-full">-- My Rides --</h1>
      <div className="flex flex-col gap-2">
        {/* Show skeleton loader while fetching data */}
        {loading && <RideCardSkeleton driverProfile={false} />}
        {!loading && rides.length === 0 && (
          <p className="text-center text-gray-500">No rides available.</p>
        )}
        {rides.map((ride: any, i: number) => (
          <Link href={`/myrides/${ride._id}`} key={i}>
            <div className="w-100 p-2 flex gap-3 rounded-xl bg-gray-200">
              <div className="w-[90%]">
                <h1 className="font-semibold">
                  {ride.routetype === "go"
                    ? `${ride.location} to Gurudwara Sahib`
                    : ride.routetype === "back"
                    ? `Gurudwara Sahib to ${ride.location}`
                    : "Invalid route type"}
                </h1>
                <p className="text-xs text-gray-600">
                  {/* Safe client-side datetime formatting */}
                  {new Date(ride.datetime).toLocaleDateString()}{" "}
                  {new Date(ride.datetime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p className="mt-4 text-xs font-bold text-gray-600">
                  {ride.seats} seats available
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
