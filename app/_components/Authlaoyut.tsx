"use client";
import React, { Suspense, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { setLocalStorage } from "@/lib/utils";

const Authlaoyut = ({ children }: any) => {
  let authToken = Cookies.get("rider-secret");

  const getProfile = async () => {
    let res = await axios.get("/api/users/profile");
    if (res?.data?.success) {
      console.log(res?.data?.details);
      setLocalStorage("rider-profile", JSON.stringify(res?.data?.details))
    } else {
      setLocalStorage("rider-profile", JSON.stringify({}))
    }
  };

  useEffect(() => {
    console.log({ authToken });

    // Get Logged in user profile
    if (authToken) getProfile();
  }, [authToken]);

  return <Suspense><div>{children}</div></Suspense>;
};

export default Authlaoyut;
