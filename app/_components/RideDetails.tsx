import { getRideDetails } from "@/backend/services/rides";
import BookingCard from "@/app/_components/BookingCard";
import React from "react";
import { RideDetailsButton } from "@/app/_components/RideDetailsButton";

const RideDetails = async ({ id }: any) => {
  const data: any = await getRideDetails(id);

  console.log({ data });

  return (
    <>
      <div className="h-full p-3 flex flex-col justify-between items-center pb-[100px] relative">
        <div className="w-[100%]">
          <h1 className="text-xl text-black font-bold mt-5">
            {data?.date.toLocaleDateString("en-US", {
              weekday: "long",
              day: "2-digit",
              month: "long",
            })}
          </h1>
          <div className="flex mt-5 gap-2">
            <div className="text-xs font-bold">{data?.time}</div>
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
          <h1 className="underline mt-5 text-xl mb-3">Bookings</h1>
          <div className="flex mt-8 flex-col gap-3">
            {
              data?.bookings?.length == 0 && <p>No Bookings</p>
            }
            {data?.bookings?.map((booking: any, i: any) => {
              return (
                <BookingCard
                  details={JSON.parse(JSON.stringify(booking))}
                  key={i}
                />
              );
            })}
          </div>
        </div>
        <RideDetailsButton data={JSON.parse(JSON.stringify(data))} id={id} />
      </div>
    </>
  );
};

export default RideDetails;
