"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { FileInput } from "../_components/FileInput";
import axios from "axios";
import { useRouter } from "next/navigation";

interface FormData {
  username: string;
  phoneNumber: string;
  address: string;
  city: string;
  province: string;
  vehicleModel: string;
  vehicleNumber: string;
  userImage?: File;
  vehicleImage?: File;
}

export default function VehicleForm() {
  const router=useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async(data) => {
    console.log("submitted")
    const response=await axios.post("/api/riders",data)
    if(response.data.success){
      router.replace("/login")
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="flex flex-col items-center mb-8">
        <FileInput
          watch={watch}
          setValue={setValue}
          name="userImage"
          
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("username", { required: "Username is required" })}
          placeholder="Username"
          className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        />
        {errors.username && <p className="text-red-600">{errors.username.message}</p>}

        <input
          {...register("phoneNumber", { required: "Phone Number is required" })}
          placeholder="Phone Number"
          className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        />
        {errors.phoneNumber && <p className="text-red-600">{errors.phoneNumber.message}</p>}

        <input
          {...register("address", { required: "Address is required" })}
          placeholder="Address"
          className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        />
        {errors.address && <p className="text-red-600">{errors.address.message}</p>}

        <div className="grid grid-cols-2 gap-4">
          <input
            {...register("city", { required: "City is required" })}
            placeholder="City"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          />
          <input
            {...register("province", { required: "Province is required" })}
            placeholder="Province"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          />
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-medium mb-4">Vehicle Details</h2>
          <div className="flex flex-col items-center mb-6">
            <FileInput
              watch={watch}
              setValue={setValue}
              name="vehicleImage"
             
            />
          </div>

          <input
            {...register("vehicleModel", { required: "Vehicle Model is required" })}
            placeholder="Vehicle Model"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          />
          {errors.vehicleModel && (
            <p className="text-red-600">{errors.vehicleModel.message}</p>
          )}

          <input
            {...register("vehicleNumber", { required: "Vehicle Number is required" })}
            placeholder="Vehicle Number"
            className="w-full px-4 py-3 mt-5 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          />
          {errors.vehicleNumber && (
            <p className="text-red-600">{errors.vehicleNumber.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors mt-6"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
