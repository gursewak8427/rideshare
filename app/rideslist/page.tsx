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
import { useSearchParams } from "next/navigation";
import SingleRide from "../_components/SingleRide";

import { RideCardSkeleton } from "@/app/_components/RideCardSkelton";

import ToolbarWithLocation from "@/app/_components/ToolbarWithLocation";
import { getLocalStorage } from "@/lib/utils";

const page = () => {
  const [rides, setRides] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const sp = useSearchParams();
  const [loc, setLoc] = useState(null);

  const getMyRides = async () => {
    console.log("Fetching rides list...");
    setLoading(true);
    let userLocation: any = getLocalStorage("userLocation");
    userLocation = JSON.parse(userLocation);
    setLoc(userLocation);
    if (!userLocation) {
      setLoading(false);
    } else {
      let response = await axios.get(
        `/api/rides?lat=${userLocation.lat}&long=${
          userLocation.lng
        }&routetype=${sp.get("route")}`
      );

      console.log(response?.data?.details, "--myrides");
      setRides(response?.data?.details);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyRides();
  }, []);

  return (
    <>
      <div className="p-2 mt-4">
        <div className="p-2">
          <ToolbarWithLocation
            onLocationChange={({ lat, lng }: any) => getMyRides()}
          />
        </div>

        <h1 className="font-bold my-4 text-center w-full">
          -- Going {sp.get("route") == "go" ? "to" : "from"} Gurudwara Chupehra
          Sahib --
        </h1>

        {/* <div className="flex justify-center gap-2 items-center bg-gray-50 p-2 rounded-full border-2 border-gray-300">
          <Search className="text-gray-500" />
          <input
            className="w-[90%] bg-gray-50 outline-none "
            placeholder="Search location"
          />
        </div>
        <div className="p-2">
          <div className="flex justify-end">
            <p className="text-xs font-bold mr-2">Sort By:</p>
            <Select>
              <SelectTrigger className=" !text-xs items-start justify-start p-0 !border-0 focus:outline-none focus:ring-0 focus:ring-ring w-auto !shadow-0 !outline-none">
                <SelectValue
                  className="!text-xs !shadow-0 !outline-none!border "
                  placeholder="None"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="amore-seats">More seats</SelectItem>
                  <SelectItem value="bmore-seats">More seats</SelectItem>
                  <SelectItem value="cmore-seats">More seats</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div> */}
        <div className="mt-0">
          <div className="flex flex-col gap-2">
            {!loading && !loc && (
              <p className="text-center italic">
                Please select a location or turn on current location.
              </p>
            )}
            {loading && <RideCardSkeleton driverProfile={true} />}
            {!loading && rides?.length == 0 && (
              <div className="w-full flex flex-col gap-3 items-center justify-start">
                <p className="w-full text-center text-orange-800">
                  Sorry, There is no ride for this route, Try another location
                </p>
              </div>
            )}
            {rides?.map((ride: any, i: any) => (
              <SingleRide details={ride} key={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
