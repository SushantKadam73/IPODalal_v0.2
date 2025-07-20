"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { formatIndianNumber, formatCurrency, calculateFunding, calculateExpectedGains } from '@/lib/utils';
import { IPO, ApplicationDetail, FundingParameters } from '@/types';
import { Target, TrendingUp, BarChart3, Zap, Download, Settings } from 'lucide-react';

const mockAvailableIPOs: IPO[] = [
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
    status: 'OPEN',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    companyName: 'FinTech Startup Ltd',
    symbol: 'FINTECH',
    series: 'EQ',
    exchange: 'NSE',
    lowerPriceBand: 800,
    upperPriceBand: 900,
    lotSize: 15,
    openDate: new Date('2024-01-18'),
    closeDate: new Date('2024-01-20'),
    issueSize: 1200,
    gmp: 200,
    hasShareholderQuota: false,
    hasEmployeeQuota: false,
    status: 'OPEN',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

interface OptimizationStrategy {
  id: string;
  name: string;
  description: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  focusArea: 'SAFETY' | 'BALANCED' | 'AGGRESSIVE';
}

interface OptimizationResult {
  strategy: OptimizationStrategy;
  allocations: {
    ipoId: string;
    companyName: string;
    recommendedLots: number;
    category: ApplicationDetail['category'];
    investment: number;
    expectedReturns: number;
    riskScore: number;
    allocationPercentage: number;
  }[];
  totalInvestment: number;
  totalExpectedReturns: number;
  riskScore: number;
  diversificationScore: number;
}

const optimizationStrategies: OptimizationStrategy[] = [
  {
    id: 'conservative',
    name: 'Conservative Growth',
    description: 'Focus on established companies with lower risk and steady returns',
    riskLevel: 'LOW',
    focusArea: 'SAFETY',
  },
  {
    id: 'balanced',
    name: 'Balanced Portfolio',
    description: 'Mix of growth and value IPOs for balanced risk-return profile',
    riskLevel: 'MEDIUM',
    focusArea: 'BALANCED',
  },
  {
    id: 'aggressive',
    name: 'High Growth',
    description: 'Target high-growth potential IPOs with higher risk tolerance',
    riskLevel: 'HIGH',
    focusArea: 'AGGRESSIVE',
  },
  {
    id: 'gmp_focused',
    name: 'GMP Maximizer',
    description: 'Prioritize IPOs with highest Grey Market Premium',
    riskLevel: 'MEDIUM',
    focusArea: 'AGGRESSIVE',
  },
];

export function AllocationOptimizer() {
  const [availableCapital, setAvailableCapital] = useState<number>(500000);
  const [selectedStrategy, setSelectedStrategy] = useState<string>('balanced');
  const [fundingParams, setFundingParams] = useState<FundingParameters>({
    interestRate: 10,
    loanPeriod: 7,
    applicationMethod: 'SINGLE',
    useLiveSubscription: false,
    shareholderEligible: false,
    employeeEligible: false,
    capitalReuse: false,
    fundingSource: 'OWN',
  });
  const [optimizationResults, setOptimizationResults] = useState<OptimizationResult[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const runOptimization = async () => {
    setIsOptimizing(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const results: OptimizationResult[] = optimizationStrategies.map(strategy => {
      const allocations = mockAvailableIPOs.map(ipo => {
        let recommendedLots = 1;
        let riskScore = 50;
        
        switch (strategy.id) {
          case 'conservative':
            recommendedLots = Math.floor(availableCapital * 0.2 / (ipo.upperPriceBand * ipo.lotSize));
            riskScore = 30;
            break;
          case 'balanced':
            recommendedLots = Math.floor(availableCapital * 0.3 / (ipo.upperPriceBand * ipo.lotSize));
            riskScore = 50;
            break;
          case 'aggressive':
            recommendedLots = Math.floor(availableCapital * 0.4 / (ipo.upperPriceBand * ipo.lotSize));
            riskScore = 70;
            break;
          case 'gmp_focused':
            recommendedLots = Math.floor(availableCapital * ((ipo.gmp || 0) / 200) * 0.3 / (ipo.upperPriceBand * ipo.lotSize));
            riskScore = 60;
            break;
        }
        
        recommendedLots = Math.max(1, Math.min(recommendedLots, 5));
        const investment = recommendedLots * ipo.upperPriceBand * ipo.lotSize;
        const expectedReturns = calculateExpectedGains(recommendedLots, 2.5, ipo.gmp || 0);
        
        return {
          ipoId: ipo.id,
          companyName: ipo.companyName,
          recommendedLots,
          category: 'RETAIL' as ApplicationDetail['category'],
          investment,
          expectedReturns,
          riskScore,
          allocationPercentage: (investment / availableCapital) * 100,
        };
      });
      
      const totalInvestment = allocations.reduce((sum, alloc) => sum + alloc.investment, 0);
      const totalExpectedReturns = allocations.reduce((sum, alloc) => sum + alloc.expectedReturns, 0);
      const avgRiskScore = allocations.reduce((sum, alloc) => sum + alloc.riskScore, 0) / allocations.length;
      
      return {
        strategy,
        allocations: allocations.filter(alloc => alloc.investment <= availableCapital),
        totalInvestment,
        totalExpectedReturns,
        riskScore: avgRiskScore,
        diversificationScore: allocations.length * 20,
      };
    });
    
    setOptimizationResults(results);
    setIsOptimizing(false);
  };

  return (
    <div className="space-y-6">
      {/* Optimization Parameters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Optimization Parameters
            </CardTitle>
            <CardDescription>Set your investment constraints and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="available-capital">Available Capital</Label>
              <Input
                id="available-capital"
                type="number"
                value={availableCapital}
                onChange={(e) => setAvailableCapital(parseInt(e.target.value) || 0)}
                placeholder="Enter amount in ₹"
              />
              <p className="text-sm text-muted-foreground mt-1">
                {formatIndianNumber(availableCapital)}
              </p>
            </div>
            
            <div>
              <Label htmlFor="strategy">Optimization Strategy</Label>
              <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {optimizationStrategies.map((strategy) => (
                    <SelectItem key={strategy.id} value={strategy.id}>
                      {strategy.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedStrategy && (
                <p className="text-sm text-muted-foreground mt-1">
                  {optimizationStrategies.find(s => s.id === selectedStrategy)?.description}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={fundingParams.capitalReuse}
                  onCheckedChange={(checked) => 
                    setFundingParams(prev => ({
                      ...prev,
                      capitalReuse: checked as boolean
                    }))
                  }
                />
                <Label>Enable Capital Reuse</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={fundingParams.useLiveSubscription}
                  onCheckedChange={(checked) => 
                    setFundingParams(prev => ({
                      ...prev,
                      useLiveSubscription: checked as boolean
                    }))
                  }
                />
                <Label>Use Live Subscription Data</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={fundingParams.shareholderEligible}
                  onCheckedChange={(checked) => 
                    setFundingParams(prev => ({
                      ...prev,
                      shareholderEligible: checked as boolean
                    }))
                  }
                />
                <Label>Shareholder Quota Eligible</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={fundingParams.employeeEligible}
                  onCheckedChange={(checked) => 
                    setFundingParams(prev => ({
                      ...prev,
                      employeeEligible: checked as boolean
                    }))
                  }
                />
                <Label>Employee Quota Eligible</Label>
              </div>
            </div>

            <Button 
              onClick={runOptimization} 
              disabled={isOptimizing}
              className="w-full"
            >
              {isOptimizing ? (
                <>
                  <Settings className="h-4 w-4 mr-2 animate-spin" />
                  Optimizing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Run Optimization
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Available IPOs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Available IPOs
            </CardTitle>
            <CardDescription>Current IPOs available for optimization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAvailableIPOs.map((ipo) => (
                <div key={ipo.id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{ipo.companyName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {ipo.symbol} • ₹{ipo.lowerPriceBand}-₹{ipo.upperPriceBand} • Lot: {ipo.lotSize}
                      </p>
                    </div>
                    {ipo.gmp && (
                      <Badge variant="secondary" className="text-green-600">
                        GMP: +₹{ipo.gmp}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Optimization Results */}
      {optimizationResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Optimization Results
            </CardTitle>
            <CardDescription>Recommended allocations based on your parameters</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={optimizationResults[0]?.strategy.id} className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                {optimizationResults.map((result) => (
                  <TabsTrigger key={result.strategy.id} value={result.strategy.id}>
                    {result.strategy.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {optimizationResults.map((result) => (
                <TabsContent key={result.strategy.id} value={result.strategy.id} className="space-y-4">
                  {/* Strategy Overview */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold indian-currency">
                          {formatIndianNumber(result.totalInvestment)}
                        </div>
                        <p className="text-sm text-muted-foreground">Total Investment</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold indian-currency text-green-600">
                          {formatIndianNumber(result.totalExpectedReturns)}
                        </div>
                        <p className="text-sm text-muted-foreground">Expected Returns</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">
                          {result.riskScore.toFixed(0)}/100
                        </div>
                        <p className="text-sm text-muted-foreground">Risk Score</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">
                          {result.diversificationScore.toFixed(0)}/100
                        </div>
                        <p className="text-sm text-muted-foreground">Diversification</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Detailed Allocations */}
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2 font-medium">Company</th>
                          <th className="text-left p-2 font-medium">Lots</th>
                          <th className="text-left p-2 font-medium">Investment</th>
                          <th className="text-left p-2 font-medium">Expected Returns</th>
                          <th className="text-left p-2 font-medium">Allocation %</th>
                          <th className="text-left p-2 font-medium">Risk Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.allocations.map((allocation) => (
                          <tr key={allocation.ipoId} className="border-b hover:bg-muted/50">
                            <td className="p-2 font-medium">{allocation.companyName}</td>
                            <td className="p-2">{allocation.recommendedLots}</td>
                            <td className="p-2 indian-currency">{formatCurrency(allocation.investment)}</td>
                            <td className="p-2 indian-currency text-green-600">
                              {formatCurrency(allocation.expectedReturns)}
                            </td>
                            <td className="p-2">{allocation.allocationPercentage.toFixed(1)}%</td>
                            <td className="p-2">
                              <Badge 
                                variant={allocation.riskScore > 60 ? "destructive" : allocation.riskScore > 40 ? "secondary" : "default"}
                              >
                                {allocation.riskScore.toFixed(0)}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Export Strategy
                    </Button>
                    <Button className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Apply This Strategy
                    </Button>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
