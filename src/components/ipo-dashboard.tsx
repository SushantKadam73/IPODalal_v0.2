"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { formatIndianNumber, formatDate, getStatusColor } from '@/lib/utils';
import { IPO, MarketData } from '@/types';
import { TrendingUp, TrendingDown, Calendar, DollarSign } from 'lucide-react';

const mockIPOs: IPO[] = [
  {
    id: '1',
    companyName: 'Tech Innovations Ltd',
    symbol: 'TECH',
    series: 'EQ',
    exchange: 'NSE',
    lowerPriceBand: 500,
    upperPriceBand: 600,
    lotSize: 25,
    openDate: new Date('2024-01-15'),
    closeDate: new Date('2024-01-17'),
    boaDate: new Date('2024-01-20'),
    listingDate: new Date('2024-01-25'),
    issueSize: 2500,
    gmp: 150,
    hasShareholderQuota: false,
    hasEmployeeQuota: true,
    employeeDiscount: 50,
    status: 'OPEN',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    companyName: 'Green Energy Solutions',
    symbol: 'GREEN',
    series: 'EQ',
    exchange: 'BSE',
    lowerPriceBand: 300,
    upperPriceBand: 350,
    lotSize: 50,
    openDate: new Date('2024-01-20'),
    closeDate: new Date('2024-01-22'),
    issueSize: 1800,
    gmp: 75,
    hasShareholderQuota: true,
    shareholderDiscount: 25,
    hasEmployeeQuota: false,
    status: 'UPCOMING',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockMarketData: MarketData = {
  nifty50: 21850.50,
  nifty50Change: 1.25,
  bankNifty: 46750.30,
  bankNiftyChange: -0.85,
  usdInr: 83.25,
  bitcoin: 4250000,
  gold: 6250,
  nasdaq: 15750.80,
  marketMood: 65,
  niftyPE: 22.5,
  totalMarketCap: 35000000,
};

export function IPODashboard() {
  const [ipos, setIpos] = useState<IPO[]>(mockIPOs);
  const [marketData, setMarketData] = useState<MarketData>(mockMarketData);

  const currentIPOs = ipos.filter(ipo => ipo.status === 'OPEN');
  const upcomingIPOs = ipos.filter(ipo => ipo.status === 'UPCOMING');
  const pastIPOs = ipos.filter(ipo => ipo.status === 'LISTED' || ipo.status === 'CLOSED');

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Market Overview
          </CardTitle>
          <CardDescription>Real-time market indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Nifty 50</p>
              <p className="text-lg font-semibold">{marketData.nifty50.toLocaleString('en-IN')}</p>
              <p className={`text-sm ${marketData.nifty50Change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {marketData.nifty50Change >= 0 ? '+' : ''}{marketData.nifty50Change}%
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Bank Nifty</p>
              <p className="text-lg font-semibold">{marketData.bankNifty.toLocaleString('en-IN')}</p>
              <p className={`text-sm ${marketData.bankNiftyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {marketData.bankNiftyChange >= 0 ? '+' : ''}{marketData.bankNiftyChange}%
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">USD/INR</p>
              <p className="text-lg font-semibold">₹{marketData.usdInr}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Bitcoin</p>
              <p className="text-lg font-semibold">{formatIndianNumber(marketData.bitcoin)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Gold (10g)</p>
              <p className="text-lg font-semibold">₹{marketData.gold.toLocaleString('en-IN')}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Market Cap</p>
              <p className="text-lg font-semibold">{formatIndianNumber(marketData.totalMarketCap)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* IPO Tables */}
      <Tabs defaultValue="current" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current">Current IPOs ({currentIPOs.length})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming IPOs ({upcomingIPOs.length})</TabsTrigger>
          <TabsTrigger value="past">Past IPOs ({pastIPOs.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current/Ongoing IPOs</CardTitle>
              <CardDescription>IPOs currently open for subscription</CardDescription>
            </CardHeader>
            <CardContent>
              <IPOTable ipos={currentIPOs} type="current" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming IPOs</CardTitle>
              <CardDescription>IPOs scheduled to open soon</CardDescription>
            </CardHeader>
            <CardContent>
              <IPOTable ipos={upcomingIPOs} type="upcoming" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Past IPOs</CardTitle>
              <CardDescription>Recently closed and listed IPOs</CardDescription>
            </CardHeader>
            <CardContent>
              <IPOTable ipos={pastIPOs} type="past" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface IPOTableProps {
  ipos: IPO[];
  type: 'current' | 'upcoming' | 'past';
}

function IPOTable({ ipos, type }: IPOTableProps) {
  if (ipos.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No {type} IPOs available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2 font-medium">Company</th>
            <th className="text-left p-2 font-medium">Price Range</th>
            <th className="text-left p-2 font-medium">GMP</th>
            <th className="text-left p-2 font-medium">Issue Size</th>
            <th className="text-left p-2 font-medium">Dates</th>
            <th className="text-left p-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {ipos.map((ipo) => (
            <tr key={ipo.id} className="border-b hover:bg-muted/50">
              <td className="p-2">
                <div>
                  <p className="font-medium">{ipo.companyName}</p>
                  <p className="text-sm text-muted-foreground">
                    {ipo.symbol} • {ipo.exchange} • {ipo.series}
                  </p>
                </div>
              </td>
              <td className="p-2">
                <div className="indian-currency">
                  ₹{ipo.lowerPriceBand} - ₹{ipo.upperPriceBand}
                </div>
                <div className="text-sm text-muted-foreground">
                  Lot: {ipo.lotSize} shares
                </div>
              </td>
              <td className="p-2">
                {ipo.gmp ? (
                  <div className="indian-currency text-green-600">
                    +₹{ipo.gmp}
                  </div>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </td>
              <td className="p-2">
                <div className="indian-currency">
                  {formatIndianNumber(ipo.issueSize * 10000000)}
                </div>
              </td>
              <td className="p-2">
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Open: {formatDate(ipo.openDate)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Close: {formatDate(ipo.closeDate)}
                  </div>
                  {ipo.listingDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Listing: {formatDate(ipo.listingDate)}
                    </div>
                  )}
                </div>
              </td>
              <td className="p-2">
                <Badge className={getStatusColor(ipo.status)}>
                  {ipo.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
