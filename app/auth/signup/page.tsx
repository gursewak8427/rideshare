"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const sp = useSearchParams();
  const url = sp.get("url");

  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState<any>({});

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    if (loading) return;

    setLoading(true);

    setUserData(data);
    const response = await axios.post("/api/otp", data);
    if (response.data.success) {
      setOpen(true);
    }
    // window.alert("OTP Sent on Email");
    setLoading(false);
  };

  const onFormSubmit = async (data: any) => {
    if (loading) return;

    setLoading(true);

    const otpInfo = { ...userData, otp: data?.otp };
    const response = await axios.post("/api/otp/verify", otpInfo);
    if (response.data.success) {
      window.alert("Register successfully");
      router.replace(url ? `/auth/login?url=${url}` : "/auth/login");
      setOpen(false);
    }
    window.alert(response?.data?.message);
    setLoading(false);
  };
  // Validate confirm password matches password
  const password = watch("password");

  return (
    <div className="min-h-screen relative flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register("email", { required: "Email is required" })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? "Please wait..." : "Sign up"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/auth/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Already have an account? Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          open ? "block bg-black/55" : "hidden"
        } absolute left-0 right-0 bottom-0 top-0 flex justify-center items-center`}
      >
        <div className={`bg-white rounded-xl p-4`}>
          <p className="text-sm w-full text-center mb-2">
            A 4 Digit OTP has been sent on you email <br />
            <b>
              <i>{watch("email")}</i>
            </b>
            <br />
            <span
              className="text-orange-500 italic mt-2"
              onClick={() => {
                setOpen(false);
                setLoading(false);
              }}
            >
              Change Email
            </span>
          </p>
          <br />
          <h2 className="font-semibold my-2">Enter the 4 digit OTP</h2>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="flex gap-2">
              <input
                placeholder="X X X X"
                className="rounded-lg border pe-4 px-3 py-2 outline-none bg-gray-100"
                type="number"
                {...register("otp")}
              />
              <button
                className="px-4 py-2 flex items-center justify-center rounded-lg bg-blue-700 text-white"
                type="submit"
              >
                {loading ? (
                  <CircularProgress size={20} color="white" />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
