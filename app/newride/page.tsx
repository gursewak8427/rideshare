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

const page = () => {
  const nav = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>();
  const [loading, setLoading] = useState(false);

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
    // Enhance data with static fields before submitting
    data = {
      ...data,
    };

    try {
      await axios.post("/api/rides", data);
      nav.push("/rideslist");
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xl">
      <div className="flex flex-col justify-between items-center p-3 h-[80vh]">
        <div className="flex flex-col w-full mt-10 gap-5">
          {/* Radio buttons for status */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center">
              <input
                {...register("routetype", { required: "Please select a status" })}
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
                {...register("routetype", { required: "Please select a status" })}
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
            className="py-3 rounded-full px-14 text-white bg-emerald-400 text-md font-bold"
          >
            Publish
          </button>
        </div>
      </div>
    </form>
  );
};

export default page;
