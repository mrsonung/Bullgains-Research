import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome, {user?.name}!</h2>
          <p className="text-gray-600">Your personalized dashboard is coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

