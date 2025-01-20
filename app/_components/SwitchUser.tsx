"use client";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { CiCirclePlus } from "react-icons/ci";
import Link from "next/link";
import { Button } from "@mui/material";
import ToolbarWithLocation from "@/app/_components/ToolbarWithLocation";
import { useEffect, useState } from "react";
import { getLocalStorage } from "@/lib/utils";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const SwitchUser = () => {
  const [role, setRole] = useState<any>("USER");
  let authToken = Cookies.get("rider-secret");
  let userProfile: any = getLocalStorage("rider-profile");
  const router = useRouter();

  useEffect(() => {
    let ridesewauser = localStorage.getItem("ridesewa_user");
    setRole(ridesewauser?.toString());

    let bodyEl = document.getElementById("body");

    if (ridesewauser == "DRIVER") {
      bodyEl?.classList.add("role-driver");
      bodyEl?.classList.remove("role-user");
    } else {
      bodyEl?.classList.add("role-user");
      bodyEl?.classList.remove("role-driver");
    }
  }, []);

  // Handler function for the switch toggle
  const handleChange = (value: string) => {
    setRole(value);
    localStorage.setItem("ridesewa_user", value);

    let bodyEl = document.getElementById("body");
    if (value == "DRIVER") {
      bodyEl?.classList.add("role-driver");
      bodyEl?.classList.remove("role-user");
    } else {
      bodyEl?.classList.add("role-user");
      bodyEl?.classList.remove("role-driver");
    }

    router.push("/");
  };

  return (
    <>
      {authToken && (
        <div className="w-full flex items-center justify-center">
          {role == "DRIVER" ? (
            <button
              className="p-2 bg-green-300 rounded-lg"
              onClick={() => handleChange("USER")}
            >
              Switch to User
            </button>
          ) : (
            <button
              className="p-2 bg-orange-300 rounded-lg"
              onClick={() => handleChange("DRIVER")}
            >
              Switch to Driver
            </button>
          )}
        </div>
      )}
    </>
  );
};
