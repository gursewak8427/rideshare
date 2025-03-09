"use client";

import { useEffect, useState } from "react";
import { Loader2, Ban, Check } from "lucide-react";
import axios from "axios";
import { getTimestampFromObjectId } from "@/lib/utils";

export default function UsersList({ heading = "Users List", options = {} }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingUserId, setLoadingUserId] = useState(null); // Track loading for a specific user
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const getUsers = async () => {
    try {
      let response = await axios.post("/api/admin/users/list", {
        sort: {
          createdAt: -1,
          _id: -1,
        },
        ...options,
      });
      let _users = response?.data?.data?.list || [];
      setUsers(_users);
      setLoading(false);
    } catch (error) {
      console.log({ error });
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const toggleUserStatus = async (id, status) => {
    setLoadingUserId(id);

    try {
      let response = await axios.post(`/api/admin/users/update/${id}`, {
        status: !status,
      });

      if (response.data.success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === id ? { ...user, status: !status } : user
          )
        );
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setLoadingUserId(null);
      setShowModal(false);
    }
  };

  const handleButtonClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleConfirm = () => {
    if (selectedUser) {
      toggleUserStatus(selectedUser._id, selectedUser.status);
    }
  };

  return (
    <div className="p-6 space-y-6 max-h-[94vh] overflow-auto">
      {/* Loading Animation */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin text-gray-600 w-10 h-10" />
        </div>
      ) : (
        <div className="bg-white">
          <h2 className="text-lg font-semibold mb-4">{heading}</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 text-sm font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="p-3 text-sm font-semibold text-gray-700">
                    Created At
                  </th>
                  <th className="p-3 text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="p-3 text-sm font-semibold text-gray-700 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t">
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">
                      {user?.createdAt
                        ? new Date(user?.createdAt)?.toLocaleString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : new Date(
                            getTimestampFromObjectId(user?._id)
                          )?.toLocaleString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                    </td>
                    <td
                      className={`p-3 font-semibold ${
                        !user.status ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {user.status ? "Active" : "Blocked"}
                    </td>
                    <td className="p-3 text-center flex items-center justify-center">
                      <button
                        className={`w-[110px] flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white text-sm transition-all ${
                          user.status
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                        onClick={() => handleButtonClick(user)}
                        disabled={loadingUserId === user._id}
                      >
                        {loadingUserId === user._id ? (
                          <Loader2 className="animate-spin w-4 h-4" />
                        ) : user.status ? (
                          <>
                            <Ban className="w-4 h-4" /> Block
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4" /> Unblock
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to{" "}
              {selectedUser?.status ? "block" : "unblock"} this user?
            </h3>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleConfirm}
                disabled={loadingUserId}
              >
                {loadingUserId ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
