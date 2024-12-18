import { getRideDetails } from "@/backend/services/rides";
import { PhoneCallIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import BookingButton from "./BookingButton";

const SingleRideDetails = async ({ id }: any) => {
  const data: any = await getRideDetails(id);
  console.log(data);
  return (
    <>
      <div className="h-full p-3 flex  flex-col justify-between items-center pb-[100px] relative">
        <div className="w-[100%]">
          <h1 className="text-xl text-black font-bold mt-5">
            {new Date(data?.datetime).toLocaleDateString("en-US", {
              weekday: "long",
              day: "2-digit",
              month: "long",
            })}
          </h1>
          <div className="flex mt-5 gap-2">
            <div className="text-xs font-bold">
              {new Date(data?.datetime)?.toLocaleTimeString()}
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="w-[10px] h-[10px] border-[1px] border-black rounded-full"></div>
              <div className="w-1 h-[50px] bg-black"></div>
              <div className="w-[10px] h-[10px] border-[1px] border-black rounded-full"></div>
            </div>
            {data?.status == "go" ? (
              <div className="flex flex-col justify-between ">
                <h1 className="font-bold">Gurudwara Sahib</h1>
                <h1 className="font-bold">{data?.location}</h1>
              </div>
            ) : (
              <div className="flex flex-col justify-between ">
                <h1 className="font-bold">{data?.location}</h1>
                <h1 className="font-bold">Gurudwara Sahib</h1>
              </div>
            )}
          </div>
          <h1 className=" mt-10 text-emerald-600 text-xl font-bold">
            {data?.seats} Seats available
          </h1>
          <h1 className="underline mt-5 text-xl mb-3">Rider Details</h1>

          <div className="space-y-3">
            <div className="w-[100%] flex items-center gap-2">
              <img
                className="rounded-full  w-16 h-16 object-cover"
                alt="..."
                src={
                  data?.userImage ||
                  "https://cdn-icons-png.flaticon.com/512/3607/3607444.png"
                }
              />
              <div>
                <h1 className="font-bold">{data?.username}</h1>
              </div>
            </div>
            <div className="w-[100%] flex items-center gap-2">
              <div className="w-16 h-16 rounded-full grid justify-center items-center bg-gray-400">
                <PhoneCallIcon />
              </div>

              <div>
                <h1 className="font-bold">{data?.phoneNumber}</h1>
              </div>
              <div className="ml-auto">
                <a
                  className="bg-emerald-400 rounded-full px-3 py-1"
                  href={`tel:+${data?.phoneNumber}`}
                >
                  Call
                </a>
              </div>
            </div>
            <div className="w-[100%] flex items-center gap-2">
              <img
                className="rounded-full  w-16 h-16 object-cover"
                alt="..."
                src={
                  data?.vechileImage ||
                  "https://img.freepik.com/premium-vector/gamer-steering-wheel-icon-cartoon-vector-esport-computer-cyber-digital_98402-58005.jpg"
                }
              />
              <div>
                <h1 className="font-bold">{data?.vehicleModel}</h1>
                <p className="text-xs">{data?.vehicleNumber}</p>
              </div>
            </div>
          </div>
        </div>
        
        <BookingButton datetime={data?.datetime} rideid={id} />
      </div>
    </>
  );
};

export default SingleRideDetails;
