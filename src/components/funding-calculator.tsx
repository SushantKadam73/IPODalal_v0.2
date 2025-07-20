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
import { Calculator, TrendingUp, Download, Plus, Minus } from 'lucide-react';

const mockCurrentIPOs: IPO[] = [
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
];

interface CalculationResult {
  ipoId: string;
  companyName: string;
  totalInvestment: number;
  interestCost: number;
  totalCost: number;
  expectedGains: number;
  breakEvenPrice: number;
}

export function FundingCalculator() {
  const [selectedIPOs, setSelectedIPOs] = useState<string[]>([]);
  const [applicationDetails, setApplicationDetails] = useState<ApplicationDetail[]>([]);
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
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [totalResults, setTotalResults] = useState({
    totalInvestment: 0,
    totalInterest: 0,
    grandTotal: 0,
    expectedReturns: 0,
  });

  const handleIPOSelection = (ipoId: string, selected: boolean) => {
    if (selected) {
      setSelectedIPOs(prev => [...prev, ipoId]);
      setApplicationDetails(prev => [
        ...prev,
        { ipoId, category: 'RETAIL', lots: 1 }
      ]);
    } else {
      setSelectedIPOs(prev => prev.filter(id => id !== ipoId));
      setApplicationDetails(prev => prev.filter(detail => detail.ipoId !== ipoId));
    }
  };

  const updateApplicationDetail = (ipoId: string, category: ApplicationDetail['category'], lots: number) => {
    setApplicationDetails(prev => 
      prev.map(detail => 
        detail.ipoId === ipoId 
          ? { ...detail, category, lots }
          : detail
      )
    );
  };

  const calculateResults = () => {
    const calculationResults: CalculationResult[] = [];
    let totalInv = 0, totalInt = 0, totalExp = 0;

    selectedIPOs.forEach(ipoId => {
      const ipo = mockCurrentIPOs.find(i => i.id === ipoId);
      const appDetail = applicationDetails.find(d => d.ipoId === ipoId);
      
      if (!ipo || !appDetail) return;

      let sharePrice = ipo.upperPriceBand;
      let discount = 0;
      
      if (appDetail.category === 'EMPLOYEE' && ipo.hasEmployeeQuota) {
        discount = ipo.employeeDiscount || 0;
        sharePrice = ipo.upperPriceBand - discount;
      } else if (appDetail.category === 'SHAREHOLDER' && ipo.hasShareholderQuota) {
        discount = ipo.shareholderDiscount || 0;
        sharePrice = ipo.upperPriceBand - discount;
      }

      const funding = calculateFunding(
        sharePrice,
        appDetail.lots,
        ipo.lotSize,
        fundingParams.interestRate,
        fundingParams.loanPeriod
      );

      const subscriptionRate = 2.5; // This would come from real data
      const expectedGains = calculateExpectedGains(
        appDetail.lots,
        subscriptionRate,
        ipo.gmp || 0,
        discount
      );

      const breakEvenPrice = sharePrice + (funding.interest / (appDetail.lots * ipo.lotSize));

      calculationResults.push({
        ipoId,
        companyName: ipo.companyName,
        totalInvestment: funding.principal,
        interestCost: funding.interest,
        totalCost: funding.total,
        expectedGains,
        breakEvenPrice,
      });

      totalInv += funding.principal;
      totalInt += funding.interest;
      totalExp += expectedGains;
    });

    setResults(calculationResults);
    setTotalResults({
      totalInvestment: totalInv,
      totalInterest: totalInt,
      grandTotal: totalInv + totalInt,
      expectedReturns: totalExp,
    });
  };

  useEffect(() => {
    if (selectedIPOs.length > 0) {
      calculateResults();
    } else {
      setResults([]);
      setTotalResults({
        totalInvestment: 0,
        totalInterest: 0,
        grandTotal: 0,
        expectedReturns: 0,
      });
    }
  }, [selectedIPOs, applicationDetails, fundingParams]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* IPO Selection */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              IPO Selection
            </CardTitle>
            <CardDescription>Select IPOs to calculate funding requirements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockCurrentIPOs.map((ipo) => (
              <div key={ipo.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedIPOs.includes(ipo.id)}
                      onCheckedChange={(checked) => 
                        handleIPOSelection(ipo.id, checked as boolean)
                      }
                    />
                    <div>
                      <h4 className="font-medium">{ipo.companyName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {ipo.symbol} • ₹{ipo.lowerPriceBand}-₹{ipo.upperPriceBand} • Lot: {ipo.lotSize}
                      </p>
                    </div>
                  </div>
                  {ipo.gmp && (
                    <Badge variant="secondary" className="text-green-600">
                      GMP: +₹{ipo.gmp}
                    </Badge>
                  )}
                </div>

                {selectedIPOs.includes(ipo.id) && (
                  <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                    <div>
                      <Label htmlFor={`category-${ipo.id}`}>Category</Label>
                      <Select
                        value={applicationDetails.find(d => d.ipoId === ipo.id)?.category || 'RETAIL'}
                        onValueChange={(value) => 
                          updateApplicationDetail(
                            ipo.id, 
                            value as ApplicationDetail['category'],
                            applicationDetails.find(d => d.ipoId === ipo.id)?.lots || 1
                          )
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="RETAIL">Retail (RII)</SelectItem>
                          <SelectItem value="sNII">Small NII (sNII)</SelectItem>
                          <SelectItem value="bNII">Big NII (bNII)</SelectItem>
                          {ipo.hasEmployeeQuota && (
                            <SelectItem value="EMPLOYEE">Employee Quota</SelectItem>
                          )}
                          {ipo.hasShareholderQuota && (
                            <SelectItem value="SHAREHOLDER">Shareholder Quota</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor={`lots-${ipo.id}`}>Number of Lots</Label>
                      <Input
                        type="number"
                        min="1"
                        value={applicationDetails.find(d => d.ipoId === ipo.id)?.lots || 1}
                        onChange={(e) => 
                          updateApplicationDetail(
                            ipo.id,
                            applicationDetails.find(d => d.ipoId === ipo.id)?.category || 'RETAIL',
                            parseInt(e.target.value) || 1
                          )
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Funding Parameters */}
        <Card>
          <CardHeader>
            <CardTitle>Funding Parameters</CardTitle>
            <CardDescription>Configure calculation settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="interest-rate">Interest Rate (% per annum)</Label>
              <Input
                id="interest-rate"
                type="number"
                step="0.1"
                value={fundingParams.interestRate}
                onChange={(e) => 
                  setFundingParams(prev => ({
                    ...prev,
                    interestRate: parseFloat(e.target.value) || 10
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="loan-period">Loan Period (days)</Label>
              <Input
                id="loan-period"
                type="number"
                value={fundingParams.loanPeriod}
                onChange={(e) => 
                  setFundingParams(prev => ({
                    ...prev,
                    loanPeriod: parseInt(e.target.value) || 7
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="application-method">Application Method</Label>
              <Select
                value={fundingParams.applicationMethod}
                onValueChange={(value) => 
                  setFundingParams(prev => ({
                    ...prev,
                    applicationMethod: value as 'SINGLE' | 'MULTIPLE'
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SINGLE">Single Account</SelectItem>
                  <SelectItem value="MULTIPLE">Multiple Accounts</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="funding-source">Funding Source</Label>
              <Select
                value={fundingParams.fundingSource}
                onValueChange={(value) => 
                  setFundingParams(prev => ({
                    ...prev,
                    fundingSource: value as FundingParameters['fundingSource']
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OWN">Own Money</SelectItem>
                  <SelectItem value="FULL_LOAN">Full Loan</SelectItem>
                  <SelectItem value="PARTIAL_LOAN">Partial Loan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
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
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Calculation Results
            </CardTitle>
            <CardDescription>Funding requirements and expected returns</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="detailed" className="space-y-4">
              <TabsList>
                <TabsTrigger value="detailed">Detailed Results</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
              </TabsList>

              <TabsContent value="detailed" className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-medium">Company</th>
                        <th className="text-left p-2 font-medium">Investment</th>
                        <th className="text-left p-2 font-medium">Interest</th>
                        <th className="text-left p-2 font-medium">Total Cost</th>
                        <th className="text-left p-2 font-medium">Expected Gains</th>
                        <th className="text-left p-2 font-medium">Break Even</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result) => (
                        <tr key={result.ipoId} className="border-b hover:bg-muted/50">
                          <td className="p-2 font-medium">{result.companyName}</td>
                          <td className="p-2 indian-currency">{formatCurrency(result.totalInvestment)}</td>
                          <td className="p-2 indian-currency">{formatCurrency(result.interestCost)}</td>
                          <td className="p-2 indian-currency">{formatCurrency(result.totalCost)}</td>
                          <td className="p-2 indian-currency text-green-600">
                            {formatCurrency(result.expectedGains)}
                          </td>
                          <td className="p-2 indian-currency">₹{result.breakEvenPrice.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="summary" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold indian-currency">
                        {formatIndianNumber(totalResults.totalInvestment)}
                      </div>
                      <p className="text-sm text-muted-foreground">Total Investment</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold indian-currency">
                        {formatIndianNumber(totalResults.totalInterest)}
                      </div>
                      <p className="text-sm text-muted-foreground">Interest Cost</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold indian-currency">
                        {formatIndianNumber(totalResults.grandTotal)}
                      </div>
                      <p className="text-sm text-muted-foreground">Grand Total</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold indian-currency text-green-600">
                        {formatIndianNumber(totalResults.expectedReturns)}
                      </div>
                      <p className="text-sm text-muted-foreground">Expected Returns</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
