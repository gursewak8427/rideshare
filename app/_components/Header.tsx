"use client";
import Link from "next/link";
import React from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { CiCirclePlus } from "react-icons/ci";
import { usePathname } from "next/navigation";

const Header = ({ nav, ishomepage }: any) => {
  const path = usePathname();

  // Check if the current path is "/" or "/newride"
  const isHomePage = path === "/";
  const isNewRidePage = path === "/newride";
  const isRideDetailsPage = path.startsWith("/ridedetails");
  const isAuthpage=path.startsWith("/authlogin")||path.startsWith("/authlogin")

  return (
    <header className="flex items-center justify-between px-4 py-2">
      {ishomepage ? (
        <>
          <div>logo</div>
          <div className="flex items-center">
            <span className="text-xl font-semibold">Ride Share</span>
          </div>
          {!isRideDetailsPage && (
            <button className="rounded-full">
              <CiCirclePlus className="w-10 h-10" />
            </button>
          )}
        </>
      ) : (
        <>
          <div>
            {!isHomePage && (
              <Link href={isRideDetailsPage ? "/rideslist" : "/"}>
                <BiLeftArrowAlt className="w-10 h-10" />
              </Link>
            )}
          </div>
          <div className="flex items-center">
            <span className="text-xl font-semibold">Ride Share</span>
          </div>
          {!isNewRidePage && !isRideDetailsPage && (
            <button className="rounded-full">
              <Link href="/newride">
                <CiCirclePlus className="w-10 h-10" />
              </Link>
            </button>
          )}
        </>
      )}
    </header>
  );
};

export default Header;
