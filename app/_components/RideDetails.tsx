import React from "react";

const RideDetails = () => {
  const data = {
    Date: "Monday,11 November",
    time: "12.43",
    goingFrom: "Forest Hill",
    goingTo: "Gurudwara Sahib",
    seatsAvailble: 3,
    bookings: [
      {
        userImage: "",
        userName: "",
        phoneNumber: 9914370682,
      },
    ],
  };
  return (
    <>
      <div className="h-[80vh] flex  flex-col justify-between items-center">
        <div className="w-[100%]">
            <h1 className="text-xl text-black">{data?.Date}</h1>


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
