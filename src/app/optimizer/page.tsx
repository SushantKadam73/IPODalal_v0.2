import React from 'react';
import { AllocationOptimizer } from '@/components/allocation-optimizer';

export default function OptimizerPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Allocation Optimizer</h1>
          <p className="text-muted-foreground">
            Optimize your IPO allocations to maximize gains based on available capital and strategy
          </p>
        </div>
      </div>
      <AllocationOptimizer />
    </div>
  );
}
