"use client";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GurudwaraForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-between items-center p-3 h-[80vh]">
          <div className="flex flex-col w-[100%] mt-10 gap-5">
            
            {/* Radio buttons for status */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center">
                <input
                  {...register("status", { required: "Please select a status" })}
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
                  {...register("status", { required: "Please select a status" })}
                  value="back"
                  className="mr-2"
                  type="radio"
                  id="back"
                />
                <label className="text-sm font-bold" htmlFor="back">
                  Back from Gurudwara Sahib
                </label>
              </div>
            </div>

            {/* Location input field */}
            <div className="flex flex-col">
              <input
                type="text"
                {...register("location", { required: "Location is required" })}
                placeholder="Enter Location"
                className="p-2 outline-none bg-gray-200 rounded-md"
              />
             
            </div>

            {/* Select dropdown */}
            <div className="flex flex-col">
              <Select {...register("seats", { required: "Please select the number of seats" })}>
                <SelectTrigger className="w-full bg-gray-200">
                  <SelectValue placeholder="Number of Seats" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
              
            </div>

            {/* Date and Time Inputs */}
            <div className="flex gap-2">
              <input
                className="p-2 outline-none w-[50%] bg-gray-200 rounded-md"
                type="date"
                {...register("date", { required: "Please select a date" })}
              />
            
              <input
                className="p-2 outline-none w-[50%] bg-gray-200 rounded-md"
                type="time"
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
    </>
  );
};

export default GurudwaraForm;
