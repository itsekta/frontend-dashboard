"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [liveData, setLiveData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/live-data");
        setLiveData(response.data);
      } catch (err) {
        console.error("Error fetching live data:", err);
        setError("Failed to fetch live data");
      }
    };

    const fetchHistoryData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/history-data"
        );
        setHistoryData(response.data);
      } catch (err) {
        console.error("Error fetching history data:", err);
        setError("Failed to fetch history data");
      }
    };

    fetchLiveData();
    fetchHistoryData();

    const liveDataInterval = setInterval(fetchLiveData, 5000);
    const historyDataInterval = setInterval(fetchHistoryData, 10000);

    return () => {
      clearInterval(liveDataInterval);
      clearInterval(historyDataInterval);
    };
  }, []);

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white text-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
        Customer Dashboard
      </h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Live Data</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Store ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Customers In
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Customers Out
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-50 divide-y divide-gray-200">
              {liveData.length > 0 ? (
                liveData.map((data, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm">{data.store_id}</td>
                    <td className="px-6 py-4 text-sm">{data.customers_in}</td>
                    <td className="px-6 py-4 text-sm">{data.customers_out}</td>
                    <td className="px-6 py-4 text-sm">{data.time_stamp}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-sm text-gray-500 text-center"
                  >
                    Loading live data...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <hr className="my-6" />

      <div>
        <h2 className="text-xl font-semibold mb-2">
          History Data (Last 24 Hours)
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Hour
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Customers In
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Customers Out
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-50 divide-y divide-gray-200">
              {historyData.length > 0 ? (
                historyData.map((data, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm">{data.hour}</td>
                    <td className="px-6 py-4 text-sm">{data.customers_in}</td>
                    <td className="px-6 py-4 text-sm">{data.customers_out}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-4 text-sm text-gray-500 text-center"
                  >
                    Loading history data...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
