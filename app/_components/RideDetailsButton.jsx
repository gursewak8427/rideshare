"use client"

import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export const RideDetailsButton = ({ id, data }) => {
    const [loading, setLoading] = useState(false)

    const updateBookingStatus = async (status) => {
        if (Boolean(loading)) return;

        setLoading(status)
        const response = await axios.patch("/api/rides", { id, data: { status } });
        alert(response?.data?.message)
        if (response?.data?.success) {
            window.location.reload()
        }
        // setLoading(false)
    }

    return (<>
        <div className="flex gap-2 fixed bottom-5">
            {
                data?.status == "CLOSE" ?
                    <button
                        // onClick={() => updateBookingStatus("ACTIVE")}
                        type="submit"
                        className="py-3 rounded-full cursor-not-allowed px-10 text-white bg-gray-700 italic text-md font-bold"
                    >
                        {
                            loading == "ACTIVE" ? <CircularProgress /> : "This Ride is closed"
                        }
                    </button> :
                    <>
                        {
                            data?.status == "STOPPED" ?
                                <button
                                    onClick={() => updateBookingStatus("ACTIVE")}
                                    type="submit"
                                    className="py-3 rounded-full px-10 text-white bg-orange-500 text-md font-bold"
                                >
                                    {
                                        loading == "ACTIVE" ? <CircularProgress /> : "Resume New Bookings"
                                    }
                                </button> :
                                <button
                                    onClick={() => updateBookingStatus("STOPPED")}
                                    type="submit"
                                    className="py-3 rounded-full px-10 text-white bg-orange-500 text-md font-bold"
                                >
                                    {
                                        loading == "STOPPEd" ? <CircularProgress /> : "Pause New Bookings"
                                    }
                                </button>
                        }
                        <button
                            onClick={() => updateBookingStatus("CLOSE")}
                            type="submit"
                            className="py-3 rounded-full px-10 text-white bg-red-500 text-md font-bold"
                        >
                            {
                                loading == "CLOSE" ? <CircularProgress /> : "Close"
                            }
                        </button>
                    </>
            }
        </div>
    </>)
}