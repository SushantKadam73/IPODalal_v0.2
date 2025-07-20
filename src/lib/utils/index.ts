import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatIndianNumber = (num: number): string => {
  if (num >= 10000000) {
    return `₹${(num / 10000000).toFixed(2)} Cr`;
  } else if (num >= 100000) {
    return `₹${(num / 100000).toFixed(2)} L`;
  } else if (num >= 1000) {
    return `₹${(num / 1000).toFixed(2)} K`;
  } else {
    return `₹${num.toFixed(2)}`;
  }
};

export const formatCurrency = (num: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

export const formatPercentage = (num: number): string => {
  return `${num.toFixed(2)}%`;
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

export const calculateFunding = (
  sharePrice: number,
  lots: number,
  lotSize: number,
  interestRate: number,
  days: number
): { principal: number; interest: number; total: number } => {
  const principal = sharePrice * lots * lotSize;
  const interest = principal * (interestRate / 100) * (days / 365);
  const total = principal + interest;
  
  return { principal, interest, total };
};

export const calculateExpectedGains = (
  lots: number,
  subscriptionRate: number,
  gmp: number,
  discount: number = 0
): number => {
  if (subscriptionRate === 0) return 0;
  return (lots / subscriptionRate) * (gmp + discount);
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'OPEN':
      return 'text-green-600 bg-green-100';
    case 'CLOSING_TODAY':
      return 'text-orange-600 bg-orange-100';
    case 'CLOSED':
      return 'text-red-600 bg-red-100';
    case 'LISTED':
      return 'text-blue-600 bg-blue-100';
    case 'UPCOMING':
      return 'text-gray-600 bg-gray-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};
