import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { CiCirclePlus } from "react-icons/ci";
import Header from "./Header";
import Link from "next/link";

export default function FirstScreen() {
  return (
    <div className="flex h-screen">
      {/* Status Bar */}

      {/* Header */}

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 space-y-4">
        <Link
          href={"/rideslist"}
          className="w-full flex justify-center items-center max-w-xs h-12 rounded-full bg-gray-100 hover:bg-gray-200 text-black"
        >
          <span>Go To Gurudwara Sahib</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>

        <Link
          href={"/rideslist"}
          className="w-full flex justify-center items-center max-w-xs h-12 rounded-full bg-gray-100 hover:bg-gray-200 text-black"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Go from Gurudwara Sahib</span>
        </Link>
      </main>
    </div>
  );
}
