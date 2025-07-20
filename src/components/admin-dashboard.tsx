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
import { formatIndianNumber, formatCurrency } from '@/lib/utils';
import { IPO } from '@/types';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Search, 
  Filter, 
  Download, 
  Upload,
  Settings,
  Database,
  TrendingUp,
  Users,
  Calendar,
  DollarSign
} from 'lucide-react';

const mockIPOData: IPO[] = [
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
    status: 'UPCOMING',
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
    openDate: new Date('2024-01-10'),
    closeDate: new Date('2024-01-12'),
    issueSize: 1200,
    gmp: 200,
    hasShareholderQuota: false,
    hasEmployeeQuota: false,
    status: 'CLOSED',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

interface AdminStats {
  totalIPOs: number;
  activeIPOs: number;
  upcomingIPOs: number;
  totalIssueSize: number;
  avgGMP: number;
  lastUpdated: Date;
}

export function AdminDashboard() {
  const [ipos, setIpos] = useState<IPO[]>(mockIPOData);
  const [editingIPO, setEditingIPO] = useState<IPO | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [stats, setStats] = useState<AdminStats>({
    totalIPOs: mockIPOData.length,
    activeIPOs: mockIPOData.filter(ipo => ipo.status === 'OPEN').length,
    upcomingIPOs: mockIPOData.filter(ipo => ipo.status === 'UPCOMING').length,
    totalIssueSize: mockIPOData.reduce((sum, ipo) => sum + ipo.issueSize, 0),
    avgGMP: mockIPOData.reduce((sum, ipo) => sum + (ipo.gmp || 0), 0) / mockIPOData.length,
    lastUpdated: new Date(),
  });

  const [newIPO, setNewIPO] = useState<Partial<IPO>>({
    companyName: '',
    symbol: '',
    series: 'EQ',
    exchange: 'NSE',
    lowerPriceBand: 0,
    upperPriceBand: 0,
    lotSize: 0,
    openDate: new Date(),
    closeDate: new Date(),
    issueSize: 0,
    gmp: 0,
    hasShareholderQuota: false,
    hasEmployeeQuota: false,
    shareholderDiscount: 0,
    employeeDiscount: 0,
    status: 'UPCOMING',
  });

  const filteredIPOs = ipos.filter(ipo => {
    const matchesSearch = ipo.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ipo.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || ipo.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateIPO = () => {
    const id = (ipos.length + 1).toString();
    const ipoToCreate: IPO = {
      ...newIPO,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as IPO;
    
    setIpos([...ipos, ipoToCreate]);
    setIsCreating(false);
    setNewIPO({
      companyName: '',
      symbol: '',
      series: 'EQ',
      exchange: 'NSE',
      lowerPriceBand: 0,
      upperPriceBand: 0,
      lotSize: 0,
      openDate: new Date(),
      closeDate: new Date(),
      issueSize: 0,
      gmp: 0,
      hasShareholderQuota: false,
      hasEmployeeQuota: false,
      shareholderDiscount: 0,
      employeeDiscount: 0,
      status: 'UPCOMING',
    });
    
    updateStats([...ipos, ipoToCreate]);
  };

  const handleUpdateIPO = () => {
    if (!editingIPO) return;
    
    const updatedIPOs = ipos.map(ipo => 
      ipo.id === editingIPO.id 
        ? { ...editingIPO, updatedAt: new Date() }
        : ipo
    );
    
    setIpos(updatedIPOs);
    setEditingIPO(null);
    updateStats(updatedIPOs);
  };

  const handleDeleteIPO = (id: string) => {
    const updatedIPOs = ipos.filter(ipo => ipo.id !== id);
    setIpos(updatedIPOs);
    updateStats(updatedIPOs);
  };

  const updateStats = (ipoList: IPO[]) => {
    setStats({
      totalIPOs: ipoList.length,
      activeIPOs: ipoList.filter(ipo => ipo.status === 'OPEN').length,
      upcomingIPOs: ipoList.filter(ipo => ipo.status === 'UPCOMING').length,
      totalIssueSize: ipoList.reduce((sum, ipo) => sum + ipo.issueSize, 0),
      avgGMP: ipoList.reduce((sum, ipo) => sum + (ipo.gmp || 0), 0) / ipoList.length,
      lastUpdated: new Date(),
    });
  };

  return (
    <div className="space-y-6">
      {/* Admin Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-blue-600" />
              <div className="text-2xl font-bold">{stats.totalIPOs}</div>
            </div>
            <p className="text-sm text-muted-foreground">Total IPOs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <div className="text-2xl font-bold">{stats.activeIPOs}</div>
            </div>
            <p className="text-sm text-muted-foreground">Active IPOs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-orange-600" />
              <div className="text-2xl font-bold">{stats.upcomingIPOs}</div>
            </div>
            <p className="text-sm text-muted-foreground">Upcoming IPOs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-purple-600" />
              <div className="text-2xl font-bold indian-currency">
                {formatIndianNumber(stats.totalIssueSize)}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Total Issue Size (₹Cr)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-indigo-600" />
              <div className="text-2xl font-bold">₹{stats.avgGMP.toFixed(0)}</div>
            </div>
            <p className="text-sm text-muted-foreground">Avg GMP</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="manage-ipos" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="manage-ipos">Manage IPOs</TabsTrigger>
          <TabsTrigger value="bulk-operations">Bulk Operations</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Manage IPOs Tab */}
        <TabsContent value="manage-ipos" className="space-y-4">
          {/* Search and Filter Controls */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search IPOs by company name or symbol..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Status</SelectItem>
                    <SelectItem value="UPCOMING">Upcoming</SelectItem>
                    <SelectItem value="OPEN">Open</SelectItem>
                    <SelectItem value="CLOSED">Closed</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => setIsCreating(true)} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add New IPO
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Create New IPO Form */}
          {isCreating && (
            <Card>
              <CardHeader>
                <CardTitle>Create New IPO</CardTitle>
                <CardDescription>Add a new IPO to the platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input
                      id="company-name"
                      value={newIPO.companyName}
                      onChange={(e) => setNewIPO({...newIPO, companyName: e.target.value})}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="symbol">Symbol</Label>
                    <Input
                      id="symbol"
                      value={newIPO.symbol}
                      onChange={(e) => setNewIPO({...newIPO, symbol: e.target.value.toUpperCase()})}
                      placeholder="SYMBOL"
                    />
                  </div>
                  <div>
                    <Label htmlFor="exchange">Exchange</Label>
                    <Select value={newIPO.exchange} onValueChange={(value) => setNewIPO({...newIPO, exchange: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NSE">NSE</SelectItem>
                        <SelectItem value="BSE">BSE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="lower-price">Lower Price Band (₹)</Label>
                    <Input
                      id="lower-price"
                      type="number"
                      value={newIPO.lowerPriceBand}
                      onChange={(e) => setNewIPO({...newIPO, lowerPriceBand: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="upper-price">Upper Price Band (₹)</Label>
                    <Input
                      id="upper-price"
                      type="number"
                      value={newIPO.upperPriceBand}
                      onChange={(e) => setNewIPO({...newIPO, upperPriceBand: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lot-size">Lot Size</Label>
                    <Input
                      id="lot-size"
                      type="number"
                      value={newIPO.lotSize}
                      onChange={(e) => setNewIPO({...newIPO, lotSize: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="issue-size">Issue Size (₹ Crores)</Label>
                    <Input
                      id="issue-size"
                      type="number"
                      value={newIPO.issueSize}
                      onChange={(e) => setNewIPO({...newIPO, issueSize: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="gmp">GMP (₹)</Label>
                    <Input
                      id="gmp"
                      type="number"
                      value={newIPO.gmp}
                      onChange={(e) => setNewIPO({...newIPO, gmp: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={newIPO.status} onValueChange={(value) => setNewIPO({...newIPO, status: value as IPO['status']})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UPCOMING">Upcoming</SelectItem>
                        <SelectItem value="OPEN">Open</SelectItem>
                        <SelectItem value="CLOSED">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={newIPO.hasEmployeeQuota}
                      onCheckedChange={(checked) => setNewIPO({...newIPO, hasEmployeeQuota: checked as boolean})}
                    />
                    <Label>Employee Quota</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={newIPO.hasShareholderQuota}
                      onCheckedChange={(checked) => setNewIPO({...newIPO, hasShareholderQuota: checked as boolean})}
                    />
                    <Label>Shareholder Quota</Label>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleCreateIPO} className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Create IPO
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreating(false)} className="flex items-center gap-2">
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* IPO List */}
          <Card>
            <CardHeader>
              <CardTitle>IPO Management</CardTitle>
              <CardDescription>
                Manage existing IPOs - {filteredIPOs.length} of {ipos.length} IPOs shown
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Company</th>
                      <th className="text-left p-2 font-medium">Symbol</th>
                      <th className="text-left p-2 font-medium">Price Band</th>
                      <th className="text-left p-2 font-medium">Issue Size</th>
                      <th className="text-left p-2 font-medium">GMP</th>
                      <th className="text-left p-2 font-medium">Status</th>
                      <th className="text-left p-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIPOs.map((ipo) => (
                      <tr key={ipo.id} className="border-b hover:bg-muted/50">
                        <td className="p-2 font-medium">{ipo.companyName}</td>
                        <td className="p-2">{ipo.symbol}</td>
                        <td className="p-2">₹{ipo.lowerPriceBand}-₹{ipo.upperPriceBand}</td>
                        <td className="p-2 indian-currency">{formatIndianNumber(ipo.issueSize)} Cr</td>
                        <td className="p-2">
                          {ipo.gmp ? (
                            <Badge variant="secondary" className="text-green-600">
                              +₹{ipo.gmp}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="p-2">
                          <Badge 
                            variant={
                              ipo.status === 'OPEN' ? 'default' : 
                              ipo.status === 'UPCOMING' ? 'secondary' : 
                              'outline'
                            }
                          >
                            {ipo.status}
                          </Badge>
                        </td>
                        <td className="p-2">
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingIPO(ipo)}
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteIPO(ipo.id)}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bulk Operations Tab */}
        <TabsContent value="bulk-operations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Import IPOs
                </CardTitle>
                <CardDescription>Upload CSV file to import multiple IPOs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop your CSV file here, or click to browse
                  </p>
                  <Button variant="outline">Choose File</Button>
                </div>
                <Button className="w-full">Import IPOs</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Export Data
                </CardTitle>
                <CardDescription>Download IPO data in various formats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Export All IPOs (CSV)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Export Active IPOs (Excel)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Export Performance Report (PDF)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Platform Settings
              </CardTitle>
              <CardDescription>Configure platform-wide settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="default-interest">Default Interest Rate (%)</Label>
                  <Input id="default-interest" type="number" defaultValue="10" />
                </div>
                <div>
                  <Label htmlFor="default-loan-period">Default Loan Period (days)</Label>
                  <Input id="default-loan-period" type="number" defaultValue="7" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox defaultChecked />
                  <Label>Enable automatic GMP updates</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox defaultChecked />
                  <Label>Send email notifications for new IPOs</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox />
                  <Label>Enable debug mode</Label>
                </div>
              </div>
              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
