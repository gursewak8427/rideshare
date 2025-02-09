"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import MapWithLocationPicker from "@/app/_components/MapLocationPicker";
import ToolbarWithLocation from "@/app/_components/ToolbarWithLocation";

const page = () => {
  const nav = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>();
  const [loading, setLoading] = useState(false);
  const [locationObj, setLocationObj] = useState<any>({ lat: -1, lng: -1 });

  const handleLocationChange = ({ lat, lng }: any) => { };
  // const findRide = async () => {
  //   let res = await axios.get("/api/rides");
  //   console.log({ data: res?.data });
  //   if (res?.data?.details?._id) {
  //     window.location.href = `/ridedetails/${res?.data?.details?._id}`;
  //   } else {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    // findRide();
  }, []);

  const onSubmit = async (data: any) => {
    // Prevent submission if loading is already in progress
    if (loading) return;

    // Set loading state to true while the request is being processed
    setLoading(true);

    // Ensure both date and time are provided
    if (!data?.date || !data?.time) {
      console.error("Date or Time is missing");
      setLoading(false);
      return;
    }

    try {
      // Construct a UTC datetime from the provided date and time
      const datetime = new Date(`${data?.date}T${data?.time}`).toISOString();

      // Enhance the data object with additional fields
      const enhancedData = {
        ...data,
        datetime,
        ...locationObj,
      };

      // Make the API call to submit the data
      await axios.post("/api/rides", enhancedData);

      // Navigate to the 'myrides' page on successful submission
      nav.push("/myrides");
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      // Reset the loading state whether the request succeeds or fails
      setLoading(false);
    }
  };

  const handleLocationSelect = ({ lat, lng }: any) => {
    console.log({ lat, lng });
    setLocationObj({
      latitude: lat,
      longitude: lng,
    });
  };

  // if (loading) {
  //   return (
  //     <div className="w-full h-screen flex items-center justify-center">
  //       <CircularProgress />
  //     </div>
  //   );
  // }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xl">
      <div className="flex flex-col justify-between items-center p-3 h-[80vh]">
        <div className="flex flex-col w-full mt-10 gap-5">
          {/* Radio buttons for status */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center">
              <input
                {...register("routetype", {
                  required: "Please select a status",
                })}
                value="go"
                className="mr-2"
                type="radio"
                id="go"
              />
              <label className="text-sm font-bold" htmlFor="go">
                Go to Gurudwara Sahib
              </label>
            </div>
            <div className="flex items-center">
              <input
                {...register("routetype", {
                  required: "Please select a status",
                })}
                value="back"
                className="mr-2"
                type="radio"
                id="back"
              />
              <label className="text-sm font-bold" htmlFor="back">
                Back from Gurudwara Sahib
              </label>
            </div>
            {/* {errors.status && (
              <span className="text-red-500 text-xs">
                {errors.status.message}
              </span>
            )} */}
          </div>

          {/* Location input field */}
          <div className="w-full space-y-3">
            <ToolbarWithLocation
              onLocationChange={handleLocationSelect}
              isSave={false}
            />
            {/* <MapWithLocationPicker onLocationChange={handleLocationChange} /> */}

            <div className="flex flex-col">
              <input
                type="text"
                {...register("location", { required: "Location is required" })}
                placeholder="Enter Location"
                className={`p-2 outline-none bg-gray-200 rounded-md`}
              />
              {/* {errors.location && (
              <span className="text-red-500 text-xs">
                {errors.location.message}
              </span>
            )} */}
            </div>
          </div>

          {/* Select dropdown for seats */}
          <div className="flex flex-col">
            <Controller
              name="seats"
              control={control}
              rules={{ required: "Please select the number of seats" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="w-full bg-gray-200">
                    <SelectValue placeholder="Number of Seats" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((seat) => (
                      <SelectItem key={seat} value={String(seat)}>
                        {seat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {/* {errors.seats && (
              <span className="text-red-500 text-xs">
                {errors.seats.message}
              </span>
            )} */}
          </div>

          {/* Date and Time Inputs */}
          <div className="flex gap-2">
            <input
              type="date"
              className={`p-2 outline-none w-[50%] bg-gray-200 rounded-md`}
              {...register("date", { required: "Please select a date" })}
            />
            <input
              type="time"
              className={`p-2 outline-none w-[50%] bg-gray-200 rounded-md`}
              {...register("time", { required: "Please select a time" })}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="fixed  left-[50%] transform translate-x-[-50%] bottom-10 py-3 rounded-full px-14 text-white bg-emerald-400 text-md font-bold"
          >
            {loading ? "Please wait..." : "Publish"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default page;
