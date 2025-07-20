import React from 'react';
import { AdminDashboard } from '@/components/admin-dashboard';

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage IPO data, update company information, and configure platform settings
          </p>
        </div>
      </div>
      <AdminDashboard />
    </div>
  );
}
