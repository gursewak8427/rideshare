import Image from "next/image";
import Link from "next/link";
import React from "react";

const SingleRide = ({ details }: any) => {
  return (
    <>
      <Link href={`/rideslist/${details?._id}`}>
        <div className="w-100 p-2 flex gap-3 rounded-xl bg-gray-200">
          <div className="w-[90%]">
            <h1 className="text-md font-bold">{details?.location}</h1>
            <p className="text-xs text-gray-600">
              {new Date(details?.datetime)?.toLocaleString()}
            </p>
            <p className="mt-8 text-xs font-bold text-gray-600">
              {details?.riderDetails?.vehicleModel}
              <span className="text-black">&#183;</span> {details?.seats} seats
              available
            </p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center">
              {details?.riderDetails?.userImage ? (
                <Image
                  width={45}
                  alt=".."
                  src={details?.riderDetails?.userImage}
                  height={40}
                  className="rounded-full  w-10 h-10 translate-x-2 -translate-y-2"
                />
              ) : (
                <Image
                  width={45}
                  alt=".."
                  src={
                    "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                  }
                  height={40}
                  className="rounded-full  w-10 h-10 translate-x-2 -translate-y-2"
                />
              )}
              {details?.riderDetails?.vechileImage ? (
                <Image
                  width={45}
                  alt=".."
                  src={details?.riderDetails?.vechileImage}
                  height={40}
                  className="-translate-x-2 w-10 h-10 translate-y-4 rounded-full"
                />
              ) : (
                <Image
                  width={45}
                  alt=".."
                  src={
                    "https://img.freepik.com/premium-vector/gamer-steering-wheel-icon-cartoon-vector-esport-computer-cyber-digital_98402-58005.jpg"
                  }
                  height={40}
                  className="-translate-x-2 w-10 h-10 translate-y-4 rounded-full"
                />
              )}
            </div>
            <div>
              <p className="text-xs font-bold line-clamp-1 mt-5">
                {details?.riderDetails?.username}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default SingleRide;
