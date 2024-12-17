"use client";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { CircularProgress } from "@mui/material";
import { RideCardSkeleton } from "@/app/_components/RideCardSkelton";
import Link from "next/link";
import axios from "axios";

const Page: React.FC = () => {
  const [rides, setRides] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getMyRides = async () => {
    try {
      const response = await axios.get("/api/rides/my");
      console.log(response?.data?.details, "--myrides");
      setRides(response?.data?.details);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching rides:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyRides();
  }, []);

  if (loading) {
    return <RideCardSkeleton driverProfile={false} />;
  }

  return (
    <div className="p-4 mt-4">
      <div className="mt-0">
        <h1 className="font-bold mb-4 text-center w-full">-- My Rides --</h1>
        <div className="flex flex-col gap-2">
          {rides?.length === 0 ? (
            <p className="text-center text-gray-500">No rides available</p>
          ) : (
            rides.map((ride: any, i: number) => (
              <Link href={`/myrides/${ride?._id}`} key={i}>
                <div className="w-full p-2 flex gap-3 rounded-xl bg-gray-200">
                  <div className="w-[90%]">
                    <h1 className="font-semibold">
                      {ride?.routetype === "go"
                        ? `${ride.location} to Gurudwara Sahib`
                        : ride?.routetype === "back"
                        ? `Gurudwara Sahib to ${ride?.location}`
                        : "Invalid route type"}
                    </h1>
                    <p className="text-xs text-gray-600">
                      {new Date(ride?.datetime).toISOString().split("T")[0]},
                      {new Date(ride?.datetime)
                        .toISOString()
                        .split("T")[1]
                        .split(".")[0]}
                    </p>
                    <p className="mt-4 text-xs font-bold text-gray-600">
                      {ride?.seats} seats available
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
