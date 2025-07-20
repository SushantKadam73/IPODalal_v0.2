# IPO Dalal Platform - Product Requirements Document (Phase 1)

## Executive Summary

IPO Dalal is a comprehensive IPO tracking and analysis platform designed to be a one-stop shop for all information related to Initial Public Offerings (IPOs) in the Indian market. The platform aims to help investors use their money efficiently, make better investment decisions, and provide superior data for research.

**Vision**: To become the definitive platform for IPO analysis and investment decision-making in India.

**Mission**: Empower investors with comprehensive IPO data, intelligent calculators, and actionable insights to maximize their investment returns.

## Phase 1 Overview

Phase 1 focuses on building the core foundation with manual data entry through an admin dashboard. This approach allows for rapid development and testing of core features before implementing automated data collection in Phase 2.

### Tech Stack
- **Frontend**: Next.js with TypeScript
- **Backend**: Appwrite
- **Database**: Appwrite Database
- **Authentication**: Appwrite Auth
- **Storage**: Appwrite Storage (for documents/PDFs)

### Core Philosophy
- **Aesthetic & Minimalistic Design**: Clean, modern interface with focus on usability
- **Dual Theme Support**: Light and dark mode throughout the application
- **Indian Localization**: Use of Indian numbering system (units, tens, hundreds, thousands, lakhs, crores) and ₹ symbol
- **Visual Hierarchy**: Clear information architecture and intuitive navigation

## Phase 1 Pages & Features

### 1. IPO Dashboard (Home Page)

**Purpose**: Central hub displaying all IPO information across different stages

#### 1.1 Current/Ongoing IPOs Table
**Columns**:
- Company Name (with company link)
- Price Range (₹ format)
- GMP (Grey Market Premium in ₹)
- Subscription Rate (by category: Retail, sNII, bNII, QIB)
- Issue Size (in ₹ crores)
- Close Date
- BoA Date (Basis of Allotment)
- Listing Date
- Status (with visual indicators for "Closing Today", "Opening Today", "Listing Today")

#### 1.2 Upcoming IPOs Table
**Columns**:
- Company Name (with company link)
- Price Range (₹ format)
- GMP (₹)
- Issue Size (₹ crores)
- Open Date
- Close Date
- BoA Date
- Listing Date

#### 1.3 Past/Closed IPOs Table
**Columns**:
- Company Name
- Symbol/Ticker
- Price Range (₹)
- Issue Size (₹ crores)
- Listing Date
- Listing Price (₹)
- Current Price (₹)
- Returns (% and absolute ₹)

#### 1.4 Special Indicators
- **Event Badges**: "Opening Today", "Closing Today", "Listing Today" prominently displayed
- **Status Colors**: Green (Open), Orange (Closing Soon), Red (Closed), Blue (Listed)
- **Quick Stats**: Total IPOs this year, total money raised, average returns

#### 1.5 Market Overview Widget
Display at top of dashboard:
- Nifty 50 value and change
- Bank Nifty value and change
- USD/INR rate
- Bitcoin price
- Gold price (₹/10g)
- Nasdaq value
- Market Mood Index/Fear & Greed Index
- Nifty P/E ratio
- Total market capitalization of Indian equity market

### 2. Funding Calculator

**Purpose**: Calculate capital requirements for IPO applications with interest calculations

#### 2.1 IPO Selection Interface
- **Multi-select dropdown**: Choose from current/live IPOs
- **Custom IPO option**: Manual entry for unlisted IPOs
- **Bulk selection**: Select all current IPOs option

#### 2.2 Application Details Form (Per IPO)
**Categories Available**:
- Retail Individual Investor (RII)
- Small Non-Institutional Investor (sNII)
- Big Non-Institutional Investor (bNII)
- Shareholder Quota (if applicable)
- Employee Quota (if applicable)

**Input Fields per Category**:
- Number of lots to apply
- Auto-populated: Share price, lot size, category limits

#### 2.3 Funding Parameters
- **Interest Rate**: Per annum (default: 10%)
- **Loan Period**: In days (default: 7 days)
- **Application Method**: Single account vs Multiple accounts
- **Live Subscription**: Yes/No toggle (default: No)
- **Quota Eligibility**: Shareholder/Employee checkboxes
- **Capital Reuse**: Option to rotate capital between IPOs
- **Funding Source**: Own money, Full loan, Partial loan

#### 2.4 Calculations & Formulas

**Basic Calculations**:
- Price per lot = Share price × Shares per lot
- Shareholder price = Share price - Shareholder discount
- Employee price = Share price - Employee discount

**Capital Required**:
```
Capital Required = Σ(Lots applied × Respective share price)
```

**Interest Calculation**:
```
Interest = Principal × (Interest rate/100) × (Days/365)
```

**Expected Gain**:
```
Expected Gain = Σ(Lots applied in category / Subscription rate × (GMP + Discount))
```

#### 2.5 Results Display
**Per IPO Results**:
- Total investment required (₹)
- Interest cost (₹)
- Total cost (₹)
- Shares applied (quantity)
- Lots applied (quantity)
- Breakeven price (₹)

**Consolidated Results**:
- Total investment across all IPOs (₹)
- Total interest cost (₹)
- Grand total cost (₹)
- Funding requirement timeline
- Expected returns (₹ and %)

#### 2.6 Export Options
- Excel export
- Shareable image format

### 3. Allocation Optimizer

**Purpose**: Optimize IPO applications based on available capital and strategy preferences

#### 3.1 Input Parameters
- **Available Capital**: Total amount available (₹)
- **Strategy Preference**:
  - GMP-based (highest GMP first)
  - Subscription-based (lowest subscription first)
  - Capital utilization (maximize number of applications)
  - Balanced approach
- **Category Preferences**: Preferred application categories
- **Risk Tolerance**: Conservative, Moderate, Aggressive
- **Capital Rotation**: Enable/disable capital reuse

#### 3.2 Optimization Engine
**Algorithm Considerations**:
- IPO subscription rates by category
- Historical allotment probabilities
- GMP trends and volatility
- Capital efficiency ratios
- Timeline optimization for capital rotation

#### 3.3 Recommendations Output
**Optimized Portfolio**:
- Recommended IPOs to apply
- Suggested lot quantities per category
- Capital allocation breakdown
- Expected allotment probability
- Projected returns (conservative/optimistic scenarios)

**Alternative Strategies**:
- Show 2-3 alternative allocation strategies
- Compare risk/return profiles
- Highlight trade-offs

### 4. Documentation Page

**Purpose**: User guidance and platform information

#### 4.1 Content Sections
- **Getting Started**: Platform navigation guide
- **Feature Documentation**: Detailed explanation of calculators
- **IPO Basics**: Educational content about IPO process
- **Allotment Rules**: Comprehensive guide to IPO allotment mechanisms
- **Formulas & Calculations**: Mathematical explanations
- **FAQ**: Common questions and answers
- **Changelog**: Version history and new features
- **Roadmap**: Upcoming features and improvements

#### 4.2 Interactive Elements
- **Search functionality**: Find specific topics
- **Bookmarking**: Save frequently accessed sections
- **Print/Export**: PDF generation for offline reading

## Data Models & Schema

### 5.1 IPO Entity
```typescript
interface IPO {
  id: string;
  companyName: string;
  symbol?: string;
  series: 'EQ' | 'SME';
  exchange: 'NSE' | 'BSE' | 'BOTH';

  // Pricing
  lowerPriceBand: number;
  upperPriceBand: number;
  cutoffPrice?: number;
  lotSize: number;

  // Dates
  openDate: Date;
  closeDate: Date;
  boaDate?: Date;
  listingDate?: Date;

  // Issue Details
  issueSize: number; // in crores
  freshIssue?: number;
  offerForSale?: number;

  // Market Data
  gmp?: number;
  gmpUpdated?: Date;
  subscriptionData?: SubscriptionData[];

  // Special Categories
  hasShareholderQuota: boolean;
  shareholderDiscount?: number;
  hasEmployeeQuota: boolean;
  employeeDiscount?: number;

  // Status
  status: 'UPCOMING' | 'OPEN' | 'CLOSED' | 'LISTED' | 'WITHDRAWN';

  // Documents
  drhpUrl?: string;
  rhpUrl?: string;
  prospectusUrl?: string;

  // Listing Performance
  listingPrice?: number;
  currentPrice?: number;

  createdAt: Date;
  updatedAt: Date;
}
```

### 5.2 Subscription Data
```typescript
interface SubscriptionData {
  ipoId: string;
  category: 'RETAIL' | 'sNII' | 'bNII' | 'QIB' | 'EMPLOYEE' | 'SHAREHOLDER';
  sharesOffered: number;
  sharesBid: number;
  subscriptionTimes: number;
  applicationsReceived?: number;
  timestamp: Date;
}
```

### 5.3 GMP Data
```typescript
interface GMPData {
  ipoId: string;
  source: 'IPO_PREMIUM' | 'IPO_CENTRAL' | 'IPO_WATCH' | 'INVESTOR_GAIN';
  gmp: number;
  kostakRate?: number;
  subjectToSauda?: number;
  timestamp: Date;
}
```

### 5.4 User Calculation
```typescript
interface UserCalculation {
  id: string;
  userId: string;
  type: 'FUNDING' | 'ALLOCATION';

  // Input Parameters
  selectedIPOs: string[];
  applicationDetails: ApplicationDetail[];
  fundingParameters: FundingParameters;

  // Results
  totalCapitalRequired: number;
  totalInterestCost: number;
  expectedReturns: number;

  createdAt: Date;
  name?: string; // User-defined name for saving
}
```

## Admin Dashboard Requirements

### 6.1 Authentication & Access Control
- **Admin Authentication**: Secure login system
- **Role-based Access**: Super Admin, Data Entry Admin, Read-only Admin
- **Session Management**: Secure session handling

### 6.2 IPO Management Interface

#### 6.2.1 IPO CRUD Operations
- **Create New IPO**: Form with all IPO fields
- **Edit Existing IPO**: Update any field with audit trail
- **Delete IPO**: Soft delete with confirmation
- **Bulk Operations**: Import from CSV/Excel

#### 6.2.2 Data Entry Forms
**Basic Information Form**:
- Company details (name, symbol, exchange)
- Pricing information (bands, lot size)
- Important dates (open, close, BoA, listing)
- Issue size and structure

**Market Data Form**:
- GMP entry and updates
- Subscription data entry (by category)
- Real-time subscription updates

**Document Management**:
- Upload DRHP, RHP, Prospectus
- Document versioning
- URL management for external documents

#### 6.2.3 Validation & Quality Control
- **Data Validation**: Ensure data consistency and accuracy
- **Duplicate Detection**: Prevent duplicate IPO entries
- **Audit Trail**: Track all changes with user and timestamp
- **Data Export**: Backup and reporting capabilities

### 6.3 Dashboard Analytics
- **Data Entry Statistics**: Number of IPOs added, updated
- **User Activity**: Calculator usage statistics
- **System Health**: Performance metrics
- **Data Quality Reports**: Missing or inconsistent data alerts

## Technical Specifications

### 7.1 Frontend Architecture (Next.js)

#### 7.1.1 Project Structure
```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── dashboard/         # IPO Dashboard
│   ├── calculator/        # Funding Calculator
│   ├── optimizer/         # Allocation Optimizer
│   ├── docs/             # Documentation
│   └── admin/            # Admin Dashboard
├── components/
│   ├── ui/               # Reusable UI components
│   ├── charts/           # Chart components
│   ├── tables/           # Data table components
│   └── forms/            # Form components
├── lib/
│   ├── appwrite/         # Appwrite configuration
│   ├── utils/            # Utility functions
│   └── constants/        # App constants
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
└── styles/               # Global styles and themes
```

#### 7.1.2 Key Dependencies
- **UI Framework**: Tailwind CSS + shadcn/ui
- **Charts**: Recharts or Chart.js
- **Tables**: TanStack Table
- **Forms**: React Hook Form + Zod validation
- **State Management**: Zustand or React Context
- **Date Handling**: date-fns
- **Icons**: Lucide React

#### 7.1.3 Theme Implementation
```typescript
// Theme configuration
const themes = {
  light: {
    primary: '#1f2937',
    secondary: '#6b7280',
    accent: '#3b82f6',
    background: '#ffffff',
    surface: '#f9fafb',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  dark: {
    primary: '#f9fafb',
    secondary: '#d1d5db',
    accent: '#60a5fa',
    background: '#111827',
    surface: '#1f2937',
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
  }
};
```

### 7.2 Backend Architecture (Appwrite)

#### 7.2.1 Database Collections
- **ipos**: Main IPO data
- **subscription_data**: Real-time subscription information
- **gmp_data**: Grey market premium data
- **user_calculations**: Saved user calculations
- **admin_logs**: Audit trail for admin actions

#### 7.2.2 Authentication Setup
- **Admin Users**: Email/password authentication
- **Regular Users**: Optional user accounts for saving calculations
- **Permissions**: Collection-level and document-level permissions

#### 7.2.3 Storage Buckets
- **documents**: IPO prospectuses, DRHP, RHP files
- **exports**: Generated reports and exports
- **images**: Company logos, charts

### 7.3 Responsive Design Requirements

#### 7.3.1 Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

#### 7.3.2 Mobile Optimizations
- **Touch-friendly**: Minimum 44px touch targets
- **Simplified Tables**: Horizontal scroll or card layout
- **Condensed Navigation**: Hamburger menu
- **Optimized Forms**: Single-column layout

## Indian Localization Specifications

### 8.1 Number Formatting
```typescript
// Indian numbering system implementation
const formatIndianNumber = (num: number): string => {
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
```

### 8.2 Currency Display Rules
- **Always use ₹ symbol**: Before all monetary values
- **Consistent formatting**: 2 decimal places for currency
- **Range display**: "₹500 - ₹600" format for price bands
- **Large numbers**: Use Cr (crores) and L (lakhs) abbreviations

### 8.3 Date Formatting
- **Standard format**: DD-MMM-YYYY (e.g., 15-Jan-2024)
- **Relative dates**: "Today", "Tomorrow", "2 days ago"
- **Time zones**: All times in IST

## Performance Requirements

### 9.1 Loading Performance
- **Initial page load**: < 3 seconds
- **Subsequent navigation**: < 1 second
- **Data updates**: Real-time or < 5 seconds
- **Large tables**: Pagination or virtualization

### 9.2 Data Management
- **Caching strategy**: Client-side caching for static data
- **Offline support**: Basic offline functionality
- **Data synchronization**: Conflict resolution for concurrent edits

## Security Requirements

### 10.1 Data Protection
- **Input validation**: All user inputs validated and sanitized
- **SQL injection prevention**: Parameterized queries
- **XSS protection**: Content Security Policy implementation
- **HTTPS enforcement**: All communications encrypted

### 10.2 Admin Security
- **Strong authentication**: Multi-factor authentication for admins
- **Session security**: Secure session management
- **Audit logging**: All admin actions logged
- **Access control**: Role-based permissions

## Testing Strategy

### 11.1 Unit Testing
- **Component testing**: React component unit tests
- **Utility testing**: Business logic and calculation functions
- **Coverage target**: 80%+ code coverage

### 11.2 Integration Testing
- **API testing**: Appwrite integration tests
- **End-to-end testing**: Critical user journeys
- **Cross-browser testing**: Chrome, Firefox, Safari, Edge

### 11.3 Performance Testing
- **Load testing**: Concurrent user scenarios
- **Stress testing**: Peak load conditions
- **Mobile testing**: Performance on mobile devices

## Deployment & DevOps

### 12.1 Environment Setup
- **Development**: Local development with Appwrite Cloud
- **Staging**: Pre-production testing environment
- **Production**: Live environment with monitoring

### 12.2 CI/CD Pipeline
- **Automated testing**: Run tests on every commit
- **Code quality**: ESLint, Prettier, TypeScript checks
- **Deployment**: Automated deployment to Vercel/Netlify

## Success Metrics

### 13.1 User Engagement
- **Daily Active Users**: Track user engagement
- **Calculator Usage**: Frequency of calculator usage
- **Session Duration**: Time spent on platform
- **Return Rate**: User retention metrics

### 13.2 Data Quality
- **Data Accuracy**: Percentage of accurate IPO data
- **Update Frequency**: Timeliness of data updates
- **Admin Efficiency**: Time to update IPO information

## Future Roadmap (Phase 2+)

### 14.1 Automation Features
- **API Integration**: NSE, BSE, SEBI data APIs
- **Web Scraping**: Automated data collection
- **Real-time Updates**: Live subscription data
- **ML Predictions**: Subscription and GMP predictions

### 14.2 Advanced Features
- **Portfolio Tracking**: User IPO portfolios
- **Alerts & Notifications**: Custom alerts for IPO events
- **Social Features**: Community discussions and forums
- **Mobile App**: Native mobile applications

## Conclusion

This PRD provides a comprehensive blueprint for Phase 1 of the IPO Dalal platform. The focus on manual data entry through an admin dashboard allows for rapid development and testing of core features while maintaining high data quality. The aesthetic, minimalistic design with Indian localization ensures the platform meets the specific needs of Indian investors.

The modular architecture and clear separation of concerns will facilitate easy expansion in Phase 2 when automated data collection and advanced features are implemented.

---

**Document Version**: 1.0
**Last Updated**: July 20, 2025
**Next Review**: Phase 1 Development Completion
