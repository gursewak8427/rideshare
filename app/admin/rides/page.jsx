"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowRight, ArrowLeft, User, Car } from "lucide-react";

export default function RideRequests() {
  const [rideRequests, setRideRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [loadingDriver, setLoadingDriver] = useState(false);

  // Fetch ride requests from API
  useEffect(() => {
    const fetchRideRequests = async () => {
      try {
        const response = await axios.post("/api/admin/rides/list", {
          sort: { createdAt: -1 },
          populate: "userid",
        });
        setRideRequests(response.data.data.list || []);
      } catch (error) {
        console.error("Error fetching ride requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRideRequests();
  }, []);

  // Fetch driver details
  const getRiderDetails = async (id) => {
    setLoadingDriver(true);
    try {
      const response = await axios.post("/api/admin/riders/list", {
        filter: [
          {
            userid: id,
          },
        ],
        perPage: 1,
      });
      if (response.data.success && response.data.data.list.length > 0) {
        setSelectedDriver(response.data.data.list[0]);
      }
    } catch (error) {
      console.error("Error fetching driver details:", error);
    } finally {
      setLoadingDriver(false);
    }
  };

  return (
    <div className="p-6 max-h-[94vh] overflow-auto">
      <h2 className="text-2xl font-bold mb-6">Ride Requests</h2>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">Loading ride requests...</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 border text-left">Location</th>
                <th className="p-3 border text-left">Driver</th>
                <th className="p-3 border">Route Type</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {rideRequests.map((request) => (
                <tr key={request._id} className="border">
                  <td className="p-3 border">{request.location}</td>
                  <td className="p-3 border">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => getRiderDetails(request.userid?._id)}
                    >
                      {request?.userid?.email || "Unknown"}
                    </button>
                  </td>
                  <td className="p-3 border capitalize">
                    <div className="flex items-center gap-4 w-full justify-center">
                      {request.routetype === "back" ? (
                        <>
                          <ArrowLeft className="w-5 h-5 text-red-500" />
                          <span>From Gurudwara Sahib</span>
                        </>
                      ) : (
                        <>
                          <span>To Gurudwara Sahib</span>
                          <ArrowRight className="w-5 h-5 text-green-500" />
                        </>
                      )}
                    </div>
                  </td>
                  <td className="p-3 border text-center">
                    {new Date(request.datetime).toLocaleString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td
                    className={`p-3 border font-semibold text-center ${
                      request.status === "ACTIVE"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {request.status}
                  </td>
                  <td className="p-3 border text-center">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                      onClick={() => setSelectedRequest(request)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Ride Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Ride Request Details</h3>
            <p className="mb-2">
              <span className="font-semibold">Location:</span>{" "}
              {selectedRequest.location}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Route Type:</span>{" "}
              {selectedRequest.routetype === "back"
                ? "From Gurudwara Sahib"
                : "To Gurudwara Sahib"}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Date:</span>{" "}
              {new Date(selectedRequest.datetime).toLocaleString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="mb-4">
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={
                  selectedRequest.status === "ACTIVE"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {selectedRequest.status}
              </span>
            </p>
            <button
              className="mt-4 bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
              onClick={() => setSelectedRequest(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Driver Details Modal */}
      {selectedDriver && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Driver Details</h3>
            <div className="flex items-center justify-center mb-3">
              <img
                src={selectedDriver.userImage}
                alt="Driver"
                className="w-24 h-24 rounded-full border shadow"
              />
              <img
                src={selectedDriver.vechileImage}
                alt="Vehicle"
                className="w-32 h-20 ml-4 border shadow object-cover rounded-md"
              />
            </div>
            <p className="mb-2">
              <User className="inline w-4 h-4" />{" "}
              <span className="font-semibold">Name:</span>{" "}
              {selectedDriver.username}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Phone:</span>{" "}
              {selectedDriver.phoneNumber}
            </p>
            <p className="mb-2">
              <span className="font-semibold">City:</span> {selectedDriver.city}
            </p>
            <p className="mb-2">
              <Car className="inline w-4 h-4" />{" "}
              <span className="font-semibold">Vehicle:</span>{" "}
              {selectedDriver.vehicleModel} ({selectedDriver.vehicleNumber})
            </p>
            <button
              className="mt-4 bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
              onClick={() => setSelectedDriver(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
