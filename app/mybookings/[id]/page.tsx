"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PhoneCallIcon } from "lucide-react";
import RideDetailsLoading from "@/app/_components/RideDetailsLoading";
import { useParams } from "next/navigation";
import { FormattedDate, Time } from "@/app/_components/Time";

const SingleRideDetails = ({ }) => {
  const { id } = useParams();
  const [booking, setBooking] = useState<any>({});
  const [loading, setLoading] = useState<any>(true);
  const [loading1, setLoading1] = useState<any>(false);

  const getMyRides = async () => {
    let response = await axios.post("/api/rides/bookings/my", {
      bookingid: id,
    });
    console.log(response?.data?.details, "--myrides");
    setBooking(response?.data?.details);
    setLoading(false);
  };

  useEffect(() => {
    getMyRides();
  }, [id]);

  const cancelBooking = async () => {
    if (loading1) return;

    setLoading1(true);

    const response = await axios.patch("/api/rides/bookings", {
      bookingid: id,
      rideid: booking?.rideDetails?._id,
      status: "CANCEL",
    });
    alert(response?.data?.message);
    if (response?.data?.success) {
      window.location.reload();
    }
    setLoading1(false);
  };

  return (
    <>
      <div className="h-full p-3 flex  flex-col justify-between items-center pb-[100px] relative">
        {loading ? (
          <RideDetailsLoading />
        ) : (
          <div className="w-[100%]">
            <div className="flex justify-between items-center mt-5">
              <h1 className="text-xl text-black font-bold">
                <FormattedDate datetime={booking?.rideDetails?.datetime} />
              </h1>
              <h1>{booking?.status}</h1>
            </div>
            <div className="flex mt-5 gap-2">
              <div className="text-xs font-bold">
                <Time datetime={booking?.rideDetails?.datetime} />
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="w-[10px] h-[10px] border-[1px] border-black rounded-full"></div>
                <div className="w-1 h-[50px] bg-black"></div>
                <div className="w-[10px] h-[10px] border-[1px] border-black rounded-full"></div>
              </div>
              {booking?.rideDetails?.status == "go" ? (
                <div className="flex flex-col justify-between ">
                  <h1 className="font-bold">Gurudwara Sahib</h1>
                  <h1 className="font-bold">
                    {booking?.rideDetails?.location}
                  </h1>
                </div>
              ) : (
                <div className="flex flex-col justify-between ">
                  <h1 className="font-bold">
                    {booking?.rideDetails?.location}
                  </h1>
                  <h1 className="font-bold">Gurudwara Sahib</h1>
                </div>
              )}
            </div>
            <h1 className=" mt-10 text-emerald-600 text-xl font-bold">
              {booking?.rideDetails?.seats} Seats available
            </h1>
            <h1 className="underline mt-5 text-xl mb-3">Rider Details</h1>

            <div className="space-y-3">
              <div className="w-[100%] flex items-center gap-2">
                <img
                  className="rounded-full  w-16 h-16 object-cover"
                  alt="..."
                  src={
                    booking?.riderDetails?.userImage ||
                    "https://cdn-icons-png.flaticon.com/512/3607/3607444.png"
                  }
                />
                <div>
                  <h1 className="font-bold">
                    {booking?.riderDetails?.username}
                  </h1>
                </div>
              </div>
              <div className="w-[100%] flex items-center gap-2">
                <div className="w-16 h-16 rounded-full grid justify-center items-center bg-gray-400">
                  <PhoneCallIcon />
                </div>

                <div>
                  <h1 className="font-bold">
                    {booking?.riderDetails?.phoneNumber}
                  </h1>
                </div>
                <div className="ml-auto">
                  <a
                    className="bg-emerald-400 rounded-full px-3 py-1"
                    href={`tel:+${booking?.riderDetails?.phoneNumber}`}
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
                    booking?.riderDetails?.vechileImage ||
                    "https://img.freepik.com/premium-vector/gamer-steering-wheel-icon-cartoon-vector-esport-computer-cyber-digital_98402-58005.jpg"
                  }
                />
                <div>
                  <h1 className="font-bold">
                    {booking?.riderDetails?.vehicleModel}
                  </h1>
                  <p className="text-xs">
                    {booking?.riderDetails?.vehicleNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {booking?.status == "CANCEL" ? (
          <div className="flex fixed bottom-5 gap-2 italic">Ride Canceled</div>
        ) : (
          <div className="flex fixed bottom-5 gap-2">
            <button
              type="button"
              onClick={cancelBooking}
              disabled={loading1}
              className={`py-3 rounded-full px-10 text-white text-md font-bold ${loading1 ? "bg-gray-400 cursor-not-allowed" : "bg-green-500"
                }`}
            >
              {loading1 ? "Loading..." : "Cancel Bookings"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SingleRideDetails;
