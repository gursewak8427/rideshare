import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { CiCirclePlus } from "react-icons/ci";
import Link from "next/link";
import { Button } from "@mui/material";
import ToolbarWithLocation from "@/app/_components/ToolbarWithLocation"

export default function page() {
  return (
    <div className="flex h-screen">
      {/* Status Bar */}

      {/* Header */}

      {/* Main Content */}
      {/* <main className="flex flex-1 flex-col items-center justify-center px-4 space-y-4">
        <Link
          href={"/rideslist?route=go"}
          className="w-full flex justify-center items-center max-w-xs h-12 rounded-full bg-gray-100 hover:bg-gray-200 text-black"
        >
          <span>Go To Gurudwara Sahib</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>

        <Link
          href={"/rideslist?route=back"}
          className="w-full flex justify-center items-center max-w-xs h-12 rounded-full bg-gray-100 hover:bg-gray-200 text-black"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Go from Gurudwara Sahib</span>
        </Link>


        <div className="flex gap-2 items-center fixed bottom-4">
          <Button><Link href={`/myrides`}>My Rides</Link></Button>
          <Button><Link href={`/mybookings`}>My Bookings</Link></Button>
        </div>
      </main> */}

      {/* Main Content */}

      <main className="w-full flex flex-col items-center justify-start pt-5 min-h-[calc(100vh-140px)] px-4 gap-4">

        <ToolbarWithLocation onLocationChange={()=>{}}/>
        <img
          className="h-[400px] max-h-[50vh]"
          src="https://rapidoride.com/wp-content/uploads/2024/04/rapido-ride-driver.png"
          alt=""
        />

        <Link
          href={"/rideslist?route=go"}
          className="w-full max-w-md py-4 px-6 bg-green-300 rounded-full flex items-center justify-between hover:bg-green-500 transition-colors"
        >
          <span className="text-lg">Go To Gurudwara Sahib</span>
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
          <span className="text-lg">Go from Gurudwara Sahib</span>
        </Link>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 border-t bg-white">
        <nav className="flex justify-around py-4">
          <Link href={`/myrides`} className="text-blue-500 font-medium">
            MY RIDES
          </Link>
          <Link href={`/mybookings`} className="text-blue-500 font-medium">
            MY BOOKINGS
          </Link>
        </nav>
      </footer>
    </div>
  );
}
