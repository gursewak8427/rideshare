"use client";
import Link from "next/link";
import React from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { CiCirclePlus, CiUser } from "react-icons/ci";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const path = usePathname();

  const isHomePage = path === "/";
  const isNewRidePage = path === "/newride";
  const isRideDetailsPage = path.startsWith("/ridedetails");
  const isAuthPage = path.startsWith("/auth/login");

  const shouldShowBackButton = !isHomePage && !isAuthPage;

  if (isAuthPage) return <></>;

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
          {!isNewRidePage && !isRideDetailsPage && (
            <Link href="/newride">
              <CiCirclePlus className="w-8 h-8 text-gray-600 cursor-pointer" />
            </Link>
          )}
          <Link href="/riderprofile">
            <CiUser className="w-8 h-8 text-gray-600 cursor-pointer" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
