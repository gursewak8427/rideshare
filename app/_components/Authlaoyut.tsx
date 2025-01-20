"use client";
import React, { Suspense, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { setLocalStorage } from "@/lib/utils";

const Authlaoyut = ({ children }: any) => {
  const [role, setRole] = useState<String | null>(null);
  let authToken = Cookies.get("rider-secret");

  const getProfile = async () => {
    try {
      let res = await axios.get("/api/users/profile");
      if (res?.data?.success) {
        console.log(res?.data?.details);
        setLocalStorage("rider-profile", JSON.stringify(res?.data?.details));
      } else {
        setLocalStorage("rider-profile", JSON.stringify({}));
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    let ridesewauser = localStorage.getItem("ridesewa_user");
    if (ridesewauser == "DRIVER") {
      setRole("DRIVER");
    } else setRole("USER");

    // Get Logged in user profile
    if (authToken) getProfile();
  }, [authToken]);

  if (!role) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <img
          className="w-[300px]"
          src="https://www.icegif.com/wp-content/uploads/2023/07/icegif-1263.gif"
          alt=""
        />
      </div>
    );
  }

  return (
    <Suspense>
      <div
        id="body"
        className={`${role == "DRIVER" ? "role-driver" : "role-user"}`}
      >
        {children}
      </div>
    </Suspense>
  );
};

export default Authlaoyut;
