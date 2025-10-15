import React from 'react';
import { Building2, MonitorCheck, Server, ShieldCheck } from 'lucide-react';

const Infrastructure = () => {
  const items = [
    { icon: Building2, title: 'Office Space', desc: 'Registered office with dedicated research and operations zones.' },
    { icon: MonitorCheck, title: 'Research Workstations', desc: 'Licensed charting tools, data feeds, and analyst workbenches.' },
    { icon: Server, title: 'Data & Storage', desc: 'Secure cloud storage, backups, and versioned research archives.' },
    { icon: ShieldCheck, title: 'Compliance Controls', desc: 'Access controls, audit logs, and policy-driven documentation.' },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">Infrastructure</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, idx) => {
            const Icon = it.icon;
            return (
              <div key={idx} className="bg-white rounded-xl shadow p-6">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{it.title}</h3>
                <p className="text-gray-600 text-sm">{it.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Infrastructure;


