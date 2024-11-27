import Image from "next/image";
import React from "react";

const SingleRide = ({ details }: any) => {
  return (
    <>
      <div className="w-100 p-2 flex gap-3 rounded-xl bg-gray-200">
        <div className="w-[90%]">
          <h1 className="text-md font-bold">{details?.location}</h1>
          <p className="text-xs text-gray-600">
            {details?.date},{details?.time}
          </p>
          <p className="mt-8 text-xs font-bold text-gray-600">
            {details?.carModel}
            <span className="text-black">&#183;</span> {details?.seatsAvailable} seats available
          </p>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex justify-center items-center">
            <Image
              width={40}
              alt=".."
              src={details?.riderImage}
              height={40}
              className="rounded-full  w-10 h-10 translate-x-2"
            />
            <Image
              width={40}
              alt=".."
              src={details?.carImage}
              height={40}
              className="-translate-x-2 w-10 h-10 translate-y-4 rounded-full"
            />
          </div>
          <div>
            <p className="text-xs font-bold line-clamp-1">{details?.riderName}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleRide;
