"use client"
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
import { RideCardSkeleton } from "@/app/_components/RideCardSkelton"
import Image from "next/image";


const page = () => {
  const [bookings, setBookings] = useState<any>([])
  const [loading, setLoading] = useState<any>(true)

  const getMyRides = async () => {
    let response = await axios.get('/api/rides/bookings/my')
    console.log(response?.data?.details, "--myrides")
    setBookings(response?.data?.details)
    setLoading(false)
  }

  useEffect(() => {
    getMyRides()
  }, [])

  return (
    <>
      <div className="p-4 mt-4">
        <div className="mt-0">
          {/* {JSON.stringify(bookings)} */}
          <div className="flex flex-col gap-2">
            {
              loading && <RideCardSkeleton driverProfile={false} />
            }
            {bookings?.map((booking: any, i: any) => (
              <Link href={`/mybookings/${booking?._id}`} key={i}>
                {/* {JSON.stringify(booking?.rideDetails)} */}
                <div className="w-100 p-2 flex gap-3 rounded-xl bg-gray-200">
                  <div className="w-[90%]">
                    <h1 className="font-semibold">
                      {booking?.rideDetails?.routetype === "go" ? `${booking?.rideDetails.location} to Gurudwara Sahib` : booking?.rideDetails?.routetype === "back" ? `Gurudwara Sahib to ${booking?.rideDetails?.location}` : "Invalid route type"}
                    </h1>
                    <p className="text-xs text-gray-600">
                      {new Date(booking?.rideDetails?.date)?.toLocaleDateString()},{booking?.rideDetails?.time}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-gray-600">
                        {booking?.rideDetails?.seats} seats
                        available
                      </p>
                      <p>
                        {booking?.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center pt-3">
                    <div className="flex justify-center items-center">
                      <Image
                        width={45}
                        alt=".."
                        src={booking?.riderDetails?.userImage || "https://cdn-icons-png.flaticon.com/512/3607/3607444.png"}
                        height={40}
                        className="rounded-full  w-10 h-10 translate-x-2 -translate-y-2"
                      />
                      <Image
                        width={45}
                        alt=".."
                        src={booking?.riderDetails?.vechileImage || "https://img.freepik.com/premium-vector/gamer-steering-wheel-icon-cartoon-vector-esport-computer-cyber-digital_98402-58005.jpg"}
                        height={40}
                        className="-translate-x-2 w-10 h-10 translate-y-4 rounded-full"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold line-clamp-1 mt-5">
                        {booking?.riderDetails?.username}
                      </p>
                    </div>
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
