"use client";
import { usePathname } from "next/navigation";
import React from "react";

const UserLayout = ({ children }) => {
  const pathname = usePathname();

  return (
    <div
      className={`${
        pathname.startsWith("/admin")
          ? ""
          : "max-w-3xl pb-[100px] min-h-[90vh] relative mx-auto"
      }`}
    >
      {children}
    </div>
  );
};

export default UserLayout;
