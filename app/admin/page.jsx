"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Users, UserX, Car, Calendar } from "lucide-react";
import UsersList from "./_components/UserList";
import Link from "next/link";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.post("/api/admin/dashboard");
        setStats(response.data.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 space-y-6 max-h-[94vh] overflow-auto">
      {/* Header */}
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              title="Total Users"
              count={stats?.stats.totalUsers}
              icon={<Users className="text-blue-500" />}
              href="/admin/users"
            />
            <StatCard
              title="Blocked Users"
              count={stats?.stats.blockedUsers}
              icon={<UserX className="text-red-500" />}
            />
            <StatCard
              title="Today's Rides"
              count={stats?.stats.todaysRides}
              icon={<Car className="text-yellow-500" />}
            />
            <StatCard
              title="This Week Rides"
              count={stats?.stats.thisWeekRides}
              icon={<Calendar className="text-purple-500" />}
            />
            <StatCard
              title="This Month Rides"
              count={stats?.stats.thisMonthRides}
              icon={<Calendar className="text-indigo-500" />}
            />
          </div>

          {/* Daily Ride Statistics Graph */}
          <div className="p-6 bg-white shadow-md rounded-xl">
            <h2 className="text-lg font-semibold mb-4">
              Daily Ride Statistics
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats?.dailyRideStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="rides" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Users Table */}
          <div className="p-6 bg-white shadow-md rounded-xl">
            <UsersList
              heading="Recent Users"
              options={{
                perPage: 5,
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

// Reusable Stat Card Component
const StatCard = ({ title, count, icon, href }) => (
  <Link
    href={href || "#"}
    className="p-4 bg-white shadow-lg rounded-lg flex items-center gap-4 border border-gray-200"
  >
    <div className="p-3 bg-gray-100 rounded-full">{icon}</div>
    <div>
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-xl font-semibold">
        {count !== undefined ? count : "N/A"}
      </p>
    </div>
  </Link>
);
