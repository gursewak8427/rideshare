"use client";
import Link from "next/link";
import ToolbarWithLocation from "@/app/_components/ToolbarWithLocation";
import Cookies from "js-cookie";

export default function page() {
  let authToken = Cookies.get("rider-secret");

  return (
    <div className="flex flex-col h-screen">
      {/* Main Content */}
      <main className="w-full flex flex-col items-center justify-start pt-5 min-h-[calc(100vh-140px)] px-4 gap-4">
        <ToolbarWithLocation onLocationChange={() => { }} />

        <h1 className="text-xl text-blue-500 font-black">
          ਧੰਨ ਧੰਨ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਸੰਸਾਰ ਸੇਵਾ ਦਲ (ਕੈਨੇਡਾ)
        </h1>
        <img
          className="h-[400px] max-h-[50vh]"
          src="/cover-image.jpg"
          alt=""
        />

        <Link
          href={"/rideslist?route=go"}
          className="w-full max-w-md py-4 px-6 bg-green-300 rounded-full flex items-center justify-between hover:bg-green-500 transition-colors"
        >
          <span className="text-md md:text-lg">
            Go To Gurudwara Chupehra Sahib
          </span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>

        <Link
          href={"/rideslist?route=back"}
          className="w-full max-w-md py-4 px-6 bg-blue-300 rounded-full flex items-center justify-between hover:bg-blue-500 transition-colors"
        >
          <svg
            className="w-5 h-5 rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="text-md md:text-lg">
            Start from Gurudwara Chupehra Sahib
          </span>
        </Link>
      </main>

      {authToken && (
        <footer className="fixed bg-gray-400 text-white bottom-0 left-0 right-0 border-t">
          <nav className="flex justify-around py-4">
            <Link
              href={`/myrides`}
              id="my-rides-button"
              className="font-medium"
            >
              MY RIDES
            </Link>
            <Link
              href={`/mybookings`}
              id="my-bookings-button"
              className="font-medium"
            >
              MY BOOKINGS
            </Link>
          </nav>
        </footer>
      )}
    </div>
  );
}
