import React from 'react';
import { IPODashboard } from '@/components/ipo-dashboard';

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">IPO Dashboard</h1>
          <p className="text-muted-foreground">
            Track ongoing, upcoming, and past IPOs in the Indian market
          </p>
        </div>
      </div>
      <IPODashboard />
    </div>
  );
}
