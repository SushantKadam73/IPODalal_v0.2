import React from 'react';
import { FundingCalculator } from '@/components/funding-calculator';

export default function CalculatorPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Funding Calculator</h1>
          <p className="text-muted-foreground">
            Calculate capital requirements for IPO applications with interest calculations
          </p>
        </div>
      </div>
      <FundingCalculator />
    </div>
  );
}
