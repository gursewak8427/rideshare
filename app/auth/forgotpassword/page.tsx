"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

type FormData = {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
};

export default function PasswordResetPage() {
  const [step, setStep] = useState<"sendOTP" | "verifyOTP" | "resetPassword">("sendOTP");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>();

  const password = watch("password");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      if (step === "sendOTP") {
        const response = await axios.post("/api/reset/sendotp", { email: data.email });
        if (response.data.success) {
          setMessage("OTP sent successfully. Please check your email.");
          setStep("verifyOTP");
        } else {
          setMessage(response.data.message);
        }
      } else if (step === "verifyOTP") {
        const response = await axios.post("/api/reset/verifyotp", { email: data.email, otp: data.otp });
        if (response.data.success) {
          setMessage("OTP verified successfully. Please set your new password.");
          setStep("resetPassword");
        } else {
          setMessage("Invalid OTP. Please try again.");
        }
      } else if (step === "resetPassword") {
        const response = await axios.post("/api/reset/resetpassword", {
          email: data.email,
          password: data.password,
        });
        if (response.data.success) {
          setMessage("Password reset successfully. Redirecting to login...");
          setTimeout(() => router.push("/auth/login"), 3000);
        } else {
          setMessage("Error resetting password. Please try again.");
        }
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-2">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="w-full flex justify-center">
          <Image src="/logo.png" width={50} height={50} alt="Logo" />
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {step === "sendOTP" && "Reset your password"}
          {step === "verifyOTP" && "Verify OTP"}
          {step === "resetPassword" && "Set new password"}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {step === "sendOTP" && "Enter your email to receive a one-time password"}
          {step === "verifyOTP" && "Enter the OTP sent to your email"}
          {step === "resetPassword" && "Enter your new password"}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {step === "sendOTP" && (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>
            )}

            {step === "verifyOTP" && (
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  One-time password
                </label>
                <div className="mt-1">
                  <input
                    id="otp"
                    type="text"
                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                      errors.otp ? "border-red-500" : "border-gray-300"
                    }`}
                    {...register("otp", {
                      required: "OTP is required",
                      pattern: {
                        value: /^[0-9]{4}$/,
                        message: "OTP must be 4 digits",
                      },
                    })}
                  />
                  {errors.otp && (
                    <p className="mt-1 text-sm text-red-600">{errors.otp.message}</p>
                  )}
                </div>
              </div>
            )}

            {step === "resetPassword" && (
              <>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      type="password"
                      autoComplete="new-password"
                      className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      })}
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                        errors.confirmPassword ? "border-red-500" : "border-gray-300"
                      }`}
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === password || "The passwords do not match",
                      })}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>
              </>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading}
              >
                {loading ? "Processing..." : (
                  step === "sendOTP" ? "Send OTP" :
                  step === "verifyOTP" ? "Verify OTP" :
                  "Reset Password"
                )}
              </button>
            </div>
          </form>

          {message && (
            <div className="mt-4 text-sm text-center text-gray-700">
              {message}
            </div>
          )}

          {step === "verifyOTP" && (
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setStep("sendOTP");
                  setMessage("");
                }}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Didn't receive the code? Resend
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

    