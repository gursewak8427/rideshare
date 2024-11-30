import { getRideDetails } from "@/backend/services/rides";
import Image from "next/image";
import React from "react";

const RideDetails = async({id}:any) => {
  const data=await getRideDetails(id)
 
  const bookings= [
    {
      userImage: "/img/_J5wMgdW_400x400.jpg",
      userName: "rattan",
      phoneNumber: 9914370682,
    },
    {
      userImage: "/img/_J5wMgdW_400x400.jpg",
      userName: "jagga",
      phoneNumber: 9914370682,
    },
  ]
  return (
    <>
      <div className="h-[80vh] p-3 flex  flex-col justify-between items-center">
        <div className="w-[100%]">
          <h1 className="text-xl text-black font-bold mt-5">{data?.date.toLocaleDateString('en-US',{ weekday: 'long', day: '2-digit', month: 'long' })}</h1>
          <div className="flex mt-5 gap-2">
            <div className="text-xs font-bold">{data?.time}</div>
            <div className="flex flex-col justify-center items-center">
              <div className="w-[10px] h-[10px] border-[1px] border-black rounded-full"></div>
              <div className="w-1 h-[50px] bg-black"></div>
              <div className="w-[10px] h-[10px] border-[1px] border-black rounded-full"></div>
            </div>
            {data?.status=="go"? <div className="flex flex-col justify-between ">
              <h1 className="font-bold">Gurudwara Sahib</h1>
              <h1 className="font-bold">{data?.location}</h1>
            </div>:""}
           
          </div>
          <h1 className=" mt-10 text-emerald-600 text-xl font-bold">
            {data?.seats} Seats available
          </h1>
          <h1 className="underline mt-5 text-xl mb-3">Bookings</h1>
          <div className="flex mt-8 flex-col gap-3">
            {bookings?.map((e, i) => (
              <>
                <div key={i} className="w-[100%] flex items-center gap-2">
                  <Image height={50} width={50} className="rounded-full" alt="..." src={e.userImage} />
                  <div> 
                    <h1 className="font-bold">{e?.userName}</h1>
                    <p className="text-xs">{e?.phoneNumber}</p>
                  </div>
                  <div className="ml-auto">
                    <a
                      className="bg-emerald-400 rounded-full px-3 py-1"
                      href={`tel:+${e?.phoneNumber}`}
                    >
                      Call
                    </a>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="py-3 rounded-full px-10 text-white bg-orange-500 text-md font-bold"
          >
            Stop
          </button>
          <button
            type="submit"
            className="py-3 rounded-full px-10 text-white bg-red-500 text-md font-bold"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default RideDetails;
