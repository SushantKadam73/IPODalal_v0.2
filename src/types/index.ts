export interface IPO {
  id: string;
  companyName: string;
  symbol?: string;
  series: 'EQ' | 'SME';
  exchange: 'NSE' | 'BSE' | 'BOTH';
  
  lowerPriceBand: number;
  upperPriceBand: number;
  cutoffPrice?: number;
  lotSize: number;
  
  openDate: Date;
  closeDate: Date;
  boaDate?: Date;
  listingDate?: Date;
  
  issueSize: number; // in crores
  freshIssue?: number;
  offerForSale?: number;
  
  gmp?: number;
  gmpUpdated?: Date;
  subscriptionData?: SubscriptionData[];
  
  hasShareholderQuota: boolean;
  shareholderDiscount?: number;
  hasEmployeeQuota: boolean;
  employeeDiscount?: number;
  
  status: 'UPCOMING' | 'OPEN' | 'CLOSED' | 'LISTED' | 'WITHDRAWN';
  
  drhpUrl?: string;
  rhpUrl?: string;
  prospectusUrl?: string;
  
  listingPrice?: number;
  currentPrice?: number;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface SubscriptionData {
  ipoId: string;
  category: 'RETAIL' | 'sNII' | 'bNII' | 'QIB' | 'EMPLOYEE' | 'SHAREHOLDER';
  sharesOffered: number;
  sharesBid: number;
  subscriptionTimes: number;
  applicationsReceived?: number;
  timestamp: Date;
}

export interface GMPData {
  ipoId: string;
  source: 'IPO_PREMIUM' | 'IPO_CENTRAL' | 'IPO_WATCH' | 'INVESTOR_GAIN';
  gmp: number;
  kostakRate?: number;
  subjectToSauda?: number;
  timestamp: Date;
}

export interface UserCalculation {
  id: string;
  userId: string;
  type: 'FUNDING' | 'ALLOCATION';
  
  selectedIPOs: string[];
  applicationDetails: ApplicationDetail[];
  fundingParameters: FundingParameters;
  
  totalCapitalRequired: number;
  totalInterestCost: number;
  expectedReturns: number;
  
  createdAt: Date;
  name?: string;
}

export interface ApplicationDetail {
  ipoId: string;
  category: 'RETAIL' | 'sNII' | 'bNII' | 'EMPLOYEE' | 'SHAREHOLDER';
  lots: number;
}

export interface FundingParameters {
  interestRate: number; // per annum
  loanPeriod: number; // in days
  applicationMethod: 'SINGLE' | 'MULTIPLE';
  useLiveSubscription: boolean;
  shareholderEligible: boolean;
  employeeEligible: boolean;
  capitalReuse: boolean;
  fundingSource: 'OWN' | 'FULL_LOAN' | 'PARTIAL_LOAN';
}

export interface MarketData {
  nifty50: number;
  nifty50Change: number;
  bankNifty: number;
  bankNiftyChange: number;
  usdInr: number;
  bitcoin: number;
  gold: number;
  nasdaq: number;
  marketMood: number;
  niftyPE: number;
  totalMarketCap: number;
}
