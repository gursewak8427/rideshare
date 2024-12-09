"use client"
import { IconButton } from "@mui/material";
import axios from "axios";
import { Check, X } from "lucide-react";
import Image from "next/image";

export default function BookingCard({ details }) {

    const updateBookingStatus = async (status) => {
        const response = await axios.patch("/api/rides/bookings", { bookingid: details?.bookingId, status });
        alert(response?.data?.message)
        if (response?.data?.success) {
            window.location.reload()
        }
    }

    return <div>
        <div className="w-[100%] flex items-center gap-2">
            <Image
                height={50}
                width={50}
                className="rounded-full"
                alt="..."
                src={details.userImage}
            />
            <div>
                <h1 className="font-bold">{details?.username}</h1>
                <p
                    className="text-xs flex gap-2 items-center"
                >
                    {details?.phoneNumber}
                    <a
                        className="bg-emerald-400 rounded-full px-3 py-1"
                        href={`tel:+${details?.phoneNumber}`}
                    >
                        Call
                    </a>
                </p>
            </div>
            <div className="ml-auto">
                {
                    details?.status == "PENDING" ? <div className="flex items-center gap-2">
                        <IconButton onClick={() => updateBookingStatus("ACCEPTED")}>
                            <Check className="text-green-500" />
                        </IconButton>
                        <IconButton onClick={() => updateBookingStatus("REJECTED")}>
                            <X className="text-red-400" />
                        </IconButton>
                    </div> : details?.status == "ACCEPTED" ? "Accepted" : details?.status == "REJECTED" ? "Rejected" : details?.status == "CANCEL" && "Cancel"
                }
            </div>
        </div>
    </div>
}