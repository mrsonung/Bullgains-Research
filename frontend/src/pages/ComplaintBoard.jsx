import React, { useEffect, useState } from "react";


const ComplaintBoard = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetch(`${API_URL}/api/complaints/stats`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStats(data.data);
        else setError("Failed to load complaint stats");
      })
      .catch(() => setError("Failed to load complaint stats"))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <p className="text-center py-8 text-gray-600">Loading Complaint Board...</p>;
  if (error)
    return <p className="text-center text-red-600 py-8">{error}</p>;

  return (
    <div className="page-section">
      {/* Banner */}
      <div className="page-banner">
        <img src="/4.png" alt="Complaint Board Banner" />
        <div className="page-banner-overlay">
          <h1>Complaint Board</h1>
          <p>
            Transparency and Accountability in Addressing Customer Complaints
          </p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
        <p className="text-sm text-gray-600 mb-6 text-center">
          We update our Complaint Board monthly during the first week. If you
          don’t see the latest data, please clear your browser cache or open in
          incognito mode.
        </p>

        <table className="global-table text-sm">
          <thead className="bg-gray-100 text-gray-900">
            <tr>
              <th>Sr. No.</th>
              <th>Received From</th>
              <th>Pending Last Month</th>
              <th>Received</th>
              <th>Resolved</th>
              <th>Total Pending</th>
              <th>Pending &gt; 3 Months</th>
              <th>Average Resolution Time (Days)</th>
            </tr>
          </thead>
          <tbody>
            {stats.length === 0 ? (
              <tr>
                <td
                  className="text-center p-4 text-gray-600"
                  colSpan="8"
                >
                  No complaint data found
                </td>
              </tr>
            ) : (
              stats.map((entry, index) => (
                <tr key={entry._id || index} className="hover:bg-gray-50">
                  <td>{index + 1}</td>
                  <td>{entry.source || "N/A"}</td>
                  <td className="text-center">{entry.pendingLastMonth || 0}</td>
                  <td className="text-center">{entry.received || 0}</td>
                  <td className="text-center text-green-700 font-semibold">
                    {entry.resolved || 0}
                  </td>
                  <td className="text-center text-red-700 font-semibold">
                    {entry.totalPending || 0}
                  </td>
                  <td className="text-center">
                    {entry.pendingOverMonths || 0}
                  </td>
                  <td className="text-center">
                    {entry.avgResolutionDays || "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplaintBoard;
