"use client";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Authlaoyut = ({ children }: any) => {
  let authToken = Cookies.get("rider-secret");

  const getProfile = async () => {
    let res = await axios.get("/api/users/profile");
    if (res?.data?.success) {
      console.log(res?.data?.details);
      window.localStorage.setItem(
        "rider-profile",
        JSON.stringify(res?.data?.details)
      );
    }
  };

  useEffect(() => {
    console.log({ authToken });

    // Get Logged in user profile
    if (authToken) getProfile();
  }, [authToken]);

  return <div>{children}</div>;
};

export default Authlaoyut;
