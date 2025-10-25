import React, { useState, useEffect } from 'react';
import { Download, LogOut, Search, Trash2, RefreshCw } from 'lucide-react';
import * as XLSX from 'xlsx';

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
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        setIsLoggedIn(true);
        fetchQueries();
        fetchStats();
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const fetchQueries = async () => {
    const token = localStorage.getItem('adminToken');
    setLoading(true);
    setError('');

    try {
      const url = `${API_URL}/api/admin/queries?search=${search}&status=${filterStatus}`;
      console.log('Fetching queries from:', url);

      const response = await fetch(url, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (data.success) {
        setQueries(data.data || []);
      } else {
        setError(data.message || 'Failed to fetch queries');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to load queries. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${API_URL}/api/admin/stats`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      console.log('Stats data:', data);

      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Stats error:', error);
    }
  };

  const handleExport = async () => {
    const token = localStorage.getItem('adminToken');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/admin/queries/export`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();

      if (data.success) {
        const worksheet = XLSX.utils.json_to_sheet(data.data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Queries');
        XLSX.writeFile(workbook, `Bullgains_Queries_${new Date().toISOString().split('T')[0]}.xlsx`);
        alert('Excel file downloaded successfully!');
      } else {
        alert('Export failed: ' + data.message);
      }
    } catch (error) {
      console.error('Export error:', error);
      alert('Export failed. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setQueries([]);
    setStats(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this query?')) return;

    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${API_URL}/api/admin/queries/${id}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        fetchQueries();
        fetchStats();
        alert('Query deleted successfully');
      } else {
        alert('Delete failed: ' + data.message);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Delete failed');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0D4C3A] to-[#1A6A50] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
            <p className="text-gray-600">Bullgains Research</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
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
                placeholder="admin@bullgains.in"
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex gap-3">
            <button
              onClick={fetchQueries}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={handleExport}
              disabled={loading}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              Export Excel
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-sm text-gray-600">Total Queries</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-xl shadow-sm">
              <p className="text-sm text-yellow-800">Pending</p>
              <p className="text-3xl font-bold text-yellow-900">{stats.pending}</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
              <p className="text-sm text-blue-800">In Progress</p>
              <p className="text-3xl font-bold text-blue-900">{stats.inProgress}</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl shadow-sm">
              <p className="text-sm text-green-800">Resolved</p>
              <p className="text-3xl font-bold text-green-900">{stats.resolved}</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl shadow-sm">
              <p className="text-sm text-purple-800">Last 7 Days</p>
              <p className="text-3xl font-bold text-purple-900">{stats.recent}</p>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <button
            onClick={fetchQueries}
            disabled={loading}
            className="bg-[#0D4C3A] text-white px-6 py-2 rounded-lg hover:bg-[#1A6A50] disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>

        {/* Queries Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading && queries.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Loading queries...
            </div>
          ) : queries.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No queries found. Try adjusting your filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {queries.map((query) => (
                    <tr key={query._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{query.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{query.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{query.phone}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{query.subject}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          query.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          query.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {query.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(query.submittedAt || query.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(query._id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete query"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
