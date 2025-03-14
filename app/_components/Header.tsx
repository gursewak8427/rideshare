"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { CiCirclePlus, CiUser } from "react-icons/ci";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";
import { getLocalStorage } from "@/lib/utils";
import { SwitchUser } from "./SwitchUser";

const Header = () => {
  const path = usePathname();

  const isHomePage = path === "/";
  const isNewRidePage = path === "/newride";
  const isRideDetailsPage = path.startsWith("/ridedetails");
  const isAuthPage = path.startsWith("/auth/login");

  const shouldShowBackButton = !isHomePage && !isAuthPage;

  if (isAuthPage) return <></>;

  let authToken = Cookies.get("rider-secret");
  let userProfile: any = getLocalStorage("rider-profile");
  userProfile = userProfile ? JSON.parse(userProfile) : null;

  console.log({ userProfile });

  let isDriverProfileComplete =
    Boolean(userProfile?.address) &&
    Boolean(userProfile?.city) &&
    Boolean(userProfile?.province) &&
    Boolean(userProfile?.userImage) &&
    Boolean(userProfile?.vehicleNumber) &&
    Boolean(userProfile?.vehicleModel) &&
    Boolean(userProfile?.vechileImage) &&
    Boolean(userProfile?.phoneNumber) &&
    Boolean(userProfile?.username);

  if(path.startsWith("/admin")){
    return <></>
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
      <div className="max-w-3xl flex items-center justify-between w-full mx-auto">
        {/* Left Section: Logo or Back Button */}
        <div className="flex items-center">
          {shouldShowBackButton ? (
            <Link href={isRideDetailsPage ? "/rideslist" : "/"}>
              <BiLeftArrowAlt className="w-8 h-8 cursor-pointer" />
            </Link>
          ) : (
            <Link href="/">
              <div className="text-2xl font-bold text-blue-600 cursor-pointer">
                <Image src="/logo.png" width={40} height={40} alt="Logo" />
              </div>
            </Link>
          )}
        </div>

        {/* Right Section: Profile or Add New Ride */}
        <div className="flex items-center space-x-4">
          <SwitchUser />
          {!isNewRidePage && !isRideDetailsPage && authToken && (
            <Link
              id="add-ride"
              href={`${
                userProfile && isDriverProfileComplete
                  ? "/newride"
                  : "/riderprofile?url=/newride"
              }`}
            >
              <CiCirclePlus className="w-8 h-8 text-gray-600 cursor-pointer" />
            </Link>
          )}
          {authToken && (
            <Link href="/riderprofile">
              <CiUser className="w-8 h-8 text-gray-600 cursor-pointer" />
            </Link>
          )}

          {!authToken && <Link href="/auth/login">Sign in</Link>}
        </div>
      </div>
    </header>
  );
};

export default Header;
