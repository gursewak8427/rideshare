"use client";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import Link from "next/link";
import { CircularProgress } from "@mui/material";
import { RideCardSkeleton } from "@/app/_components/RideCardSkelton";

const page = () => {
  const [rides, setRides] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);

  const getMyRides = async () => {
    let response = await axios.get("/api/rides/my");
    console.log(response?.data?.details, "--myrides");
    setRides(response?.data?.details);
    setLoading(false);
  };

  useEffect(() => {
    getMyRides();
  }, []);

  return (
    <>
      <div className="p-4 mt-4">
        <div className="mt-0">
          <h1 className="font-bold mb-4 text-center w-full">-- My Rides --</h1>
          <div className="flex flex-col gap-2">
            {loading && <RideCardSkeleton driverProfile={false} />}
            {rides?.map((ride: any, i: any) => (
              <Link href={`/myrides/${ride?._id}`} key={i}>
                <div className="w-100 p-2 flex gap-3 rounded-xl bg-gray-200">
                  <div className="w-[90%]">
                    <h1 className="font-semibold">
                      {ride?.routetype === "go"
                        ? `${ride.location} to Gurudwara Sahib`
                        : ride?.routetype === "back"
                        ? `Gurudwara Sahib to ${ride?.location}`
                        : "Invalid route type"}
                    </h1>
                    <p className="text-xs text-gray-600">
                      {new Date(ride?.date)?.toLocaleDateString()},{ride?.time}
                    </p>
                    <p className="mt-4 text-xs font-bold text-gray-600">
                      {ride?.seats} seats available
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
