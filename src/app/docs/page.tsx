import React from 'react';
import { Documentation } from '@/components/documentation';

export default function DocsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
          <p className="text-muted-foreground">
            Complete guide to IPO investing, platform features, and mathematical formulas
          </p>
        </div>
      </div>
      <Documentation />
    </div>
  );
}
