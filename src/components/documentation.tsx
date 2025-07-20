"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Calculator, Target, TrendingUp, Search, Download, ExternalLink } from 'lucide-react';

export function Documentation() {
  const [searchQuery, setSearchQuery] = useState('');

  const documentationSections = [
    {
      id: 'ipo-basics',
      title: 'IPO Basics',
      icon: BookOpen,
      content: [
        {
          title: 'What is an IPO?',
          content: `An Initial Public Offering (IPO) is when a private company offers shares to the public for the first time. This allows the company to raise capital from public investors and become a publicly traded company.`,
        },
        {
          title: 'IPO Categories',
          content: `
• **Retail Individual Investors (RII)**: Investment up to ₹2 lakhs
• **Small Non-Institutional Investors (sNII)**: Investment between ₹2 lakhs to ₹10 lakhs  
• **Big Non-Institutional Investors (bNII)**: Investment above ₹10 lakhs
• **Qualified Institutional Buyers (QIB)**: Institutional investors like mutual funds, banks
• **Employee Quota**: Reserved for company employees (if applicable)
• **Shareholder Quota**: Reserved for existing shareholders (if applicable)`,
        },
        {
          title: 'IPO Process Timeline',
          content: `
1. **DRHP Filing**: Draft Red Herring Prospectus filed with SEBI
2. **Price Band Announcement**: Company announces price range
3. **IPO Opens**: Subscription period begins (usually 3 days)
4. **IPO Closes**: Last day of subscription
5. **Basis of Allotment (BoA)**: Allotment process completed
6. **Refund/Credit**: Shares credited or refund processed
7. **Listing**: Shares start trading on stock exchanges`,
        },
      ],
    },
    {
      id: 'platform-features',
      title: 'Platform Features',
      icon: Target,
      content: [
        {
          title: 'IPO Dashboard',
          content: `
**Current IPOs**: View all ongoing IPO subscriptions with real-time data
**Upcoming IPOs**: Track IPOs scheduled to open soon
**Past IPOs**: Analyze performance of recently listed IPOs
**Market Overview**: Real-time market indicators and sentiment

**Key Data Points**:
• Price band and lot size
• Grey Market Premium (GMP)
• Subscription rates by category
• Issue size and dates
• Exchange and series information`,
        },
        {
          title: 'Funding Calculator',
          content: `
**Capital Requirements**: Calculate exact funding needed for IPO applications
**Interest Calculations**: Factor in loan costs for borrowed capital
**Multi-IPO Support**: Plan funding across multiple simultaneous IPOs
**Category Optimization**: Compare costs across different investor categories

**Features**:
• Support for employee and shareholder discounts
• Multiple account application scenarios
• Live subscription rate integration
• Capital reuse optimization`,
        },
        {
          title: 'Allocation Optimizer',
          content: `
**Strategy-Based Allocation**: Choose from multiple investment strategies
**Risk Assessment**: Evaluate risk-return profiles
**Capital Optimization**: Maximize returns within available capital
**Diversification Analysis**: Optimize portfolio across multiple IPOs

**Optimization Strategies**:
• Conservative Growth: Low risk, steady returns
• Balanced Portfolio: Moderate risk-return balance
• High Growth: Aggressive growth targeting
• GMP Maximizer: Focus on highest grey market premiums`,
        },
      ],
    },
    {
      id: 'formulas',
      title: 'Mathematical Formulas',
      icon: Calculator,
      content: [
        {
          title: 'Basic Calculations',
          content: `
**Lot Value Calculation**:
\`Lot Value = Share Price × Shares per Lot\`

**Shareholder Price**:
\`Shareholder Price = Share Price - Shareholder Discount\`

**Employee Price**:
\`Employee Price = Share Price - Employee Discount\``,
        },
        {
          title: 'Funding Calculator Formulas',
          content: `
**Capital Required**:
\`Capital = Σ(Lots Applied × Effective Share Price)\`

Where Effective Share Price varies by category:
• Retail/sNII/bNII: Regular share price
• Shareholder: Share price - Shareholder discount
• Employee: Share price - Employee discount

**Interest Calculation**:
\`Interest = Principal × (Interest Rate/100) × (Days/365)\`

**Total Cost**:
\`Total Cost = Principal + Interest\``,
        },
        {
          title: 'Expected Gains Formula',
          content: `
**Expected Gain Calculation**:
\`Expected Gain = Σ(Probability of Outcome × Gain/Loss in Outcome)\`

**Simplified Formula**:
\`Expected Gain = (Lots Applied / Subscription Rate) × (GMP + Discount)\`

Where:
• For Retail/sNII/bNII: Gain = GMP only
• For Shareholder/Employee: Gain = GMP + Respective Discount

**Break-Even Price**:
\`Break-Even = Share Price + (Interest Cost / Total Shares)\``,
        },
      ],
    },
    {
      id: 'allotment-rules',
      title: 'IPO Allotment Rules',
      icon: TrendingUp,
      content: [
        {
          title: 'Retail Category (RII)',
          content: `
**Allocation**: 35% of total issue size reserved for retail investors
**Investment Limit**: Up to ₹2,00,000 per individual
**Allotment Process**: 
• If oversubscribed: Proportionate allotment
• Minimum 1 lot guaranteed if applied for 1 lot
• Maximum allotment capped based on subscription level`,
        },
        {
          title: 'Non-Institutional Investors (NII)',
          content: `
**Small NII (sNII)**: ₹2 lakhs to ₹10 lakhs
**Big NII (bNII)**: Above ₹10 lakhs
**Allocation**: 15% of total issue size
**Allotment**: Proportionate basis, no guaranteed allotment`,
        },
        {
          title: 'Special Quotas',
          content: `
**Employee Quota**:
• Usually 5% of issue size (if applicable)
• Available at discounted price
• Separate allotment process

**Shareholder Quota**:
• Usually 10% of issue size (if applicable)  
• Available at discounted price
• For existing shareholders of the company`,
        },
        {
          title: 'Allotment Priority',
          content: `
1. **Employee Quota**: Highest priority with discount
2. **Shareholder Quota**: Second priority with discount
3. **Retail (RII)**: Guaranteed minimum allotment
4. **QIB**: Institutional allocation (50% of issue)
5. **NII**: Remaining allocation on proportionate basis`,
        },
      ],
    },
  ];

  const filteredSections = documentationSections.map(section => ({
    ...section,
    content: section.content.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(section => section.content.length > 0);

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Documentation Content */}
      <Tabs defaultValue="ipo-basics" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          {documentationSections.map((section) => {
            const Icon = section.icon;
            return (
              <TabsTrigger key={section.id} value={section.id} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {section.title}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {documentationSections.map((section) => (
          <TabsContent key={section.id} value={section.id} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <section.icon className="h-5 w-5" />
                  {section.title}
                </CardTitle>
                <CardDescription>
                  {section.id === 'ipo-basics' && 'Fundamental concepts and processes of IPO investing'}
                  {section.id === 'platform-features' && 'Detailed guide to using IPO Dalal platform features'}
                  {section.id === 'formulas' && 'Mathematical formulas used in calculations'}
                  {section.id === 'allotment-rules' && 'IPO allotment rules and priority system'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {(searchQuery ? filteredSections.find(s => s.id === section.id)?.content || [] : section.content).map((item, index) => (
                  <div key={index} className="space-y-3">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <div className="whitespace-pre-line text-muted-foreground">
                        {item.content}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Links & Resources</CardTitle>
          <CardDescription>External resources for IPO research and analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <ExternalLink className="h-4 w-4" />
                <div className="text-left">
                  <div className="font-medium">NSE IPO Portal</div>
                  <div className="text-sm text-muted-foreground">Official NSE IPO information</div>
                </div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <ExternalLink className="h-4 w-4" />
                <div className="text-left">
                  <div className="font-medium">BSE IPO Center</div>
                  <div className="text-sm text-muted-foreground">BSE IPO listings and data</div>
                </div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <ExternalLink className="h-4 w-4" />
                <div className="text-left">
                  <div className="font-medium">SEBI Guidelines</div>
                  <div className="text-sm text-muted-foreground">Regulatory framework</div>
                </div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <Download className="h-4 w-4" />
                <div className="text-left">
                  <div className="font-medium">IPO Calendar</div>
                  <div className="text-sm text-muted-foreground">Download upcoming IPOs</div>
                </div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <Calculator className="h-4 w-4" />
                <div className="text-left">
                  <div className="font-medium">Formula Cheatsheet</div>
                  <div className="text-sm text-muted-foreground">Quick reference guide</div>
                </div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-4 w-4" />
                <div className="text-left">
                  <div className="font-medium">Market Analysis</div>
                  <div className="text-sm text-muted-foreground">IPO performance reports</div>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
