import React, { useState, useEffect } from 'react';
import { Download, LogOut, Trash2, RefreshCw, CheckCircle2, Loader2 } from 'lucide-react';
import * as XLSX from 'xlsx';
import toast, { Toaster } from 'react-hot-toast';

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [queries, setQueries] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [error, setError] = useState('');
  const TOAST_DURATION = 3000;
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
      fetchQueries();
      fetchStats();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;  // prevent multiple submissions
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        setIsLoggedIn(true);
        await fetchQueries();
        await fetchStats();
        toast.dismiss(); // dismiss previous toasts
        toast.success('Logged in successfully!', { duration: TOAST_DURATION });
      } else {
        toast.dismiss();
        setError(data.message || 'Login failed');
        toast.error(data.message || 'Login failed.', { duration: TOAST_DURATION });
      }
    } catch (error) {
      toast.dismiss();
      setError('Login failed. Please check your connection.');
      toast.error('Login failed. Please check your connection.', { duration: TOAST_DURATION });
    } finally {
      setLoading(false);
    }
  };

  const fetchQueries = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/api/admin/queries?search=${search}&status=${filterStatus}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.success) {
        setQueries(data.data || []);
      } else {
        toast.error(data.message || 'Failed to fetch queries', { duration: TOAST_DURATION });
      }
    } catch {
      toast.error('Failed to load queries. Check console for details.', { duration: TOAST_DURATION });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;
    try {
      const response = await fetch(`${API_URL}/api/admin/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.success) setStats(data.stats);
    } catch {
      // silently ignore
    }
  };

  const handleExport = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token || loading) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/admin/queries/export`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.success) {
        const worksheet = XLSX.utils.json_to_sheet(data.data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Queries');
        XLSX.writeFile(workbook, `Bullgains_Queries_${new Date().toISOString().split('T')[0]}.xlsx`);
        toast.success('Excel file downloaded successfully!', { duration: TOAST_DURATION });
      } else {
        toast.error('Export failed: ' + data.message, { duration: TOAST_DURATION });
      }
    } catch {
      toast.error('Export failed. Check console for details.', { duration: TOAST_DURATION });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setQueries([]);
    setStats(null);
    toast.dismiss();
    toast.success('Logged out!', { duration: TOAST_DURATION });
  };

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    const token = localStorage.getItem('adminToken');

    const formData = {
      month: e.target.month.value,
      source: e.target.source.value,
      pendingLastMonth: Number(e.target.pendingLastMonth.value || 0),
      received: Number(e.target.received.value || 0),
      resolved: Number(e.target.resolved.value || 0),
      totalPending: Number(e.target.totalPending.value || 0),
      pendingOverMonths: Number(e.target.pendingOverMonths.value || 0),
      avgResolutionDays: Number(e.target.avgResolutionDays.value || 0),
    };

    try {
      const response = await fetch(`${API_URL}/api/complaints/stats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        toast.dismiss();
        toast.success('Complaint board updated!', { duration: TOAST_DURATION });
      } else {
        toast.dismiss();
        toast.error(data.message || 'Update failed', { duration: TOAST_DURATION });
      }
    } catch {
      toast.dismiss();
      toast.error('Error updating complaint board', { duration: TOAST_DURATION });
    }
  };

  const handleMarkStatus = async (id, targetStatus) => {
    const token = localStorage.getItem('adminToken');
    if (!token || loading) return;
    try {
      const response = await fetch(`${API_URL}/api/query/${id}/status`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: targetStatus }),
      });
      const data = await response.json();
      if (data.success) {
        toast.dismiss();
        toast.success(`Query marked as "${targetStatus.replace('-', ' ')}"!`, { duration: TOAST_DURATION });
        fetchQueries();
        fetchStats();
      } else {
        toast.dismiss();
        toast.error(data.message || 'Failed to update status', { duration: TOAST_DURATION });
      }
    } catch {
      toast.dismiss();
      toast.error('Update failed. Try again.', { duration: TOAST_DURATION });
    }
  };

  const handleDelete = async (id) => {
    let toastId;
    toastId = toast.custom(
      (t) => (
        <div
          className={`bg-white px-6 py-4 shadow-lg rounded-lg flex flex-col items-center ${
            t.visible ? 'animate-enter' : 'animate-leave'
          }`}
          style={{ minWidth: 260 }}
        >
          <span className="text-gray-700 mb-2">Are you sure you want to delete this query?</span>
          <div className="flex gap-3">
            <button
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={async () => {
                toast.dismiss(toastId);
                const token = localStorage.getItem('adminToken');
                if (!token) return;
                try {
                  const response = await fetch(`${API_URL}/api/admin/queries/${id}`, {
                    method: 'DELETE',
                    headers: {
                      Authorization: `Bearer ${token}`,
                      'Content-Type': 'application/json',
                    },
                  });
                  const data = await response.json();
                  if (data.success) {
                    fetchQueries();
                    fetchStats();
                    toast.dismiss();
                    toast.success('Query deleted successfully', { duration: TOAST_DURATION });
                  } else {
                    toast.dismiss();
                    toast.error('Delete failed: ' + data.message, { duration: TOAST_DURATION });
                  }
                } catch {
                  toast.dismiss();
                  toast.error('Delete failed', { duration: TOAST_DURATION });
                }
              }}
            >
              Yes
            </button>
            <button
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => toast.dismiss(toastId)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: TOAST_DURATION, position: 'top-center' }
    );
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0D4C3A] to-[#1A6A50] flex items-center justify-center px-3">
        <Toaster position="top-center" toastOptions={{ duration: TOAST_DURATION, style: { zIndex: 9999 } }} />
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
            <p className="text-gray-600">Bullgains Research</p>
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">{error}</div>
          )}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D4C3A] focus:border-transparent"
                placeholder="Admin Email"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D4C3A] focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0D4C3A] text-white py-3 rounded-lg font-semibold hover:bg-[#1A6A50] transition-colors disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Toaster position="top-center" toastOptions={{ duration: TOAST_DURATION, style: { zIndex: 9999 } }} />

      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex flex-wrap gap-2">
            <button onClick={fetchQueries} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
            <button onClick={handleExport} disabled={loading} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50">
              <Download className="w-4 h-4" /> Export Excel
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* STATS + COMPLAINT BOARD */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {['total', 'pending', 'inProgress', 'resolved', 'recent'].map((key, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm text-center">
                <p className="text-sm text-gray-600 capitalize">{key}</p>
                <p className="text-3xl font-bold text-gray-900">{stats[key]}</p>
              </div>
            ))}
          </div>
        )}

        {/* Complaint Board Update Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Monthly Complaint Stats</h2>
          <form onSubmit={handleComplaintSubmit} className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 gap-4">
            <input name="month" type="text" placeholder="Month (e.g. Oct 2025)" required className="border border-gray-300 px-4 py-2 rounded-lg" />
            <input name="source" placeholder="Received From (e.g. SEBI, Support)" required className="border border-gray-300 px-4 py-2 rounded-lg" />
            <input name="pendingLastMonth" placeholder="Pending at End of Last Month" type="number" className="border border-gray-300 px-4 py-2 rounded-lg" />
            <input name="received" placeholder="Received" type="number" className="border border-gray-300 px-4 py-2 rounded-lg" />
            <input name="resolved" placeholder="Resolved" type="number" className="border border-gray-300 px-4 py-2 rounded-lg" />
            <input name="totalPending" placeholder="Total Pending" type="number" className="border border-gray-300 px-4 py-2 rounded-lg" />
            <input name="pendingOverMonths" placeholder="Pending > Months" type="number" className="border border-gray-300 px-4 py-2 rounded-lg" />
            <input name="avgResolutionDays" placeholder="Avg Resolution Time (days)" type="number" className="border border-gray-300 px-4 py-2 rounded-lg" />
            <button type="submit" className="col-span-full bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
              Update Complaint Board
            </button>
          </form>
        </div>

        {/* QUERY TABLE */}
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          {loading && queries.length === 0 ? (
            <div className="p-8 text-center text-gray-500">Loading queries...</div>
          ) : queries.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No queries found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b text-[13px] md:text-base">
                  <tr>
                    {['Name', 'Email', 'Phone', 'Subject', 'Status', 'Date/Time', 'Actions'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-semibold text-gray-700 uppercase">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-[13px] md:text-base">
                  {queries.map((query) => (
                    <tr key={query._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">{query.name}</td>
                      <td className="px-4 py-3">{query.email}</td>
                      <td className="px-4 py-3">{query.phone}</td>
                      <td className="px-4 py-3">{query.subject}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          query.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          query.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {query.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {new Date(query.submittedAt || query.createdAt).toLocaleDateString()} <br />
                        <span className="text-xs">{new Date(query.submittedAt || query.createdAt).toLocaleTimeString()}</span>
                      </td>
                      <td className="px-4 py-3 flex gap-2 items-center">
                        {query.status === 'pending' && (
                          <>
                            <button onClick={() => handleMarkStatus(query._id, 'in-progress')} className="bg-blue-600 text-white px-2 py-1 rounded-sm text-xs">In Progress</button>
                            <button onClick={() => handleMarkStatus(query._id, 'resolved')} className="bg-green-600 text-white px-2 py-1 rounded-sm text-xs">Resolve</button>
                          </>
                        )}
                        {query.status === 'in-progress' && (
                          <button onClick={() => handleMarkStatus(query._id, 'resolved')} className="bg-green-600 text-white px-2 py-1 rounded-sm text-xs">Resolve</button>
                        )}
                        <button onClick={() => handleDelete(query._id)} className="text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="mt-4 text-sm text-gray-600 text-center">
          Showing {queries.length} {queries.length === 1 ? 'query' : 'queries'}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
