"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { FileInput } from "../_components/FileInput";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

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
  const sp = useSearchParams();
  const url = sp.get("url");

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormData>();

  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/riders");
      if (response.data.success) {
        reset({
          ...response.data.details,
        });
      } else {
        // alert(response?.data?.message);
      }
    })();
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data: any) => {
    delete data?._id;

    const response = await axios.post("/api/riders", data);
    if (response.data.success) {
      alert("Profile Updated");
    } else {
      alert(response?.data?.message);
    }

    if (url) window.location.href = url;
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      {url && (
        <p className="w-full p-2 rounded-md text-center bg-orange-200 text-black italic">
          Complete your profile before publishing a ride
        </p>
      )}

      <div className="flex flex-col items-center">
        <FileInput
          isRound={true}
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
        {errors.username && (
          <p className="text-red-600">{errors.username.message}</p>
        )}

        <input
          {...register("phoneNumber", { required: "Phone Number is required" })}
          placeholder="Phone Number"
          className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        />
        {errors.phoneNumber && (
          <p className="text-red-600">{errors.phoneNumber.message}</p>
        )}

        <p className="italic border-b pb-2 font-semibold text-gray-700">
          Following details is required, if you want to publish your ride
        </p>

        <input
          {...register("address")}
          placeholder="Address"
          className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        />
        {errors.address && (
          <p className="text-red-600">{errors.address.message}</p>
        )}

        <div className="grid grid-cols-2 gap-4">
          <input
            {...register("city")}
            placeholder="City"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          />
          <input
            {...register("province")}
            placeholder="Province"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          />
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-medium mb-4">Vehicle Details</h2>
          <div className="flex flex-col items-center mb-6">
            <FileInput
              isRound={false}
              watch={watch}
              setValue={setValue}
              name="vechileImage"
            />
          </div>

          <input
            {...register("vehicleModel")}
            placeholder="Vehicle Model"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          />
          {errors.vehicleModel && (
            <p className="text-red-600">{errors.vehicleModel.message}</p>
          )}

          <input
            {...register("vehicleNumber")}
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
          Update
        </button>

        <button
          onClick={async () => {
            await axios.get("/api/users/logout");
            localStorage?.removeItem("rider-profile");
            window.location.href = "/";
          }}
          type="button"
          className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors mt-6"
        >
          Logout
        </button>
      </form>
    </div>
  );
}
