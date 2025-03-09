"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const path = usePathname();

  if (path.startsWith("/admin")) {
    return <></>;
  }

  return (
    <footer className="text-center mt-8 mb-[100px]">
      <p>
        &copy; {new Date().getFullYear()} Baba Deep Singh Ji Sanstar Sewa Dal.
        All Rights Reserved.
      </p>
      <p className="text-gray-700">
        Visit us at <Link href="https://www.ridesewa.ca">ridesewa.ca</Link>
      </p>
      <div className="mt-4">
        <Link href="/privacy" className="mx-2 text-gray-700">
          Privacy Policy
        </Link>
        <Link href="/terms" className="mx-2 text-gray-700">
          Terms of Service
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
