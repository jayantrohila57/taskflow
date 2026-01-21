import {
  Building,
  CircleDollarSign,
  Factory,
  FileText,
  Info,
  LayoutGrid,
  School,
  ShieldCheck,
  Store,
  Users,
} from 'lucide-react'

// Status options with colors
export const statusOptions = [
  {
    value: 'status-1',
    label: 'Active',
    color: '#10b981', // green
    description: 'Organization is fully operational',
  },
  {
    value: 'status-2',
    label: 'Inactive',
    color: '#6b7280', // gray
    description: 'Organization is not currently active',
  },
  {
    value: 'status-3',
    label: 'Pending',
    color: '#f59e0b', // amber
    description: 'Organization is awaiting approval',
  },
  {
    value: 'status-4',
    label: 'Suspended',
    color: '#ef4444', // red
    description: 'Organization has been temporarily suspended',
  },
  {
    value: 'status-5',
    label: 'Under Review',
    color: '#3b82f6', // blue
    description: 'Organization is being reviewed',
  },
]

// Type options with icons
export const typeOptions = [
  {
    value: 'type-1',
    label: 'Business',
    icon: <Building className="text-muted-foreground mr-2 h-4 w-4" />,
    description: 'Commercial entity',
  },
  {
    value: 'type-2',
    label: 'Non-Profit',
    icon: <ShieldCheck className="text-muted-foreground mr-2 h-4 w-4" />,
    description: 'Non-profit organization',
  },
  {
    value: 'type-3',
    label: 'Government',
    icon: <FileText className="text-muted-foreground mr-2 h-4 w-4" />,
    description: 'Government entity',
  },
  {
    value: 'type-4',
    label: 'Educational',
    icon: <School className="text-muted-foreground mr-2 h-4 w-4" />,
    description: 'Educational institution',
  },
  {
    value: 'type-5',
    label: 'Healthcare',
    icon: <Info className="text-muted-foreground mr-2 h-4 w-4" />,
    description: 'Healthcare provider',
  },
]

// Category options with icons
export const categoryOptions = [
  {
    value: 'category-1',
    label: 'Technology',
    icon: <LayoutGrid className="text-muted-foreground mr-2 h-4 w-4" />,
    description: 'Technology and software',
  },
  {
    value: 'category-2',
    label: 'Finance',
    icon: <CircleDollarSign className="text-muted-foreground mr-2 h-4 w-4" />,
    description: 'Financial services',
  },
  {
    value: 'category-3',
    label: 'Retail',
    icon: <Store className="text-muted-foreground mr-2 h-4 w-4" />,
    description: 'Retail and e-commerce',
  },
  {
    value: 'category-4',
    label: 'Manufacturing',
    icon: <Factory className="text-muted-foreground mr-2 h-4 w-4" />,
    description: 'Manufacturing and production',
  },
  {
    value: 'category-5',
    label: 'Services',
    icon: <Users className="text-muted-foreground mr-2 h-4 w-4" />,
    description: 'Service providers',
  },
]

// Industry options with icons
export const industryOptions = [
  {
    value: 'industry-1',
    label: 'Software Development',
    icon: <LayoutGrid className="text-muted-foreground mr-2 h-4 w-4" />,
    description: 'Software and application development',
  },
  {
    value: 'industry-2',
    label: 'Banking',
    icon: <CircleDollarSign className="text-muted-foreground mr-2 h-4 w-4" />,
    description: 'Banking and financial institutions',
  },
  {
    value: 'industry-3',
    label: 'E-commerce',
    icon: <Store className="text-muted-foreground mr-2 h-4 w-4" />,
    description: 'Online retail and e-commerce',
  },
  {
    value: 'industry-4',
    label: 'Automotive',
    icon: <Factory className="text-muted-foreground mr-2 h-4 w-4" />,
    description: 'Automotive manufacturing and services',
  },
  {
    value: 'industry-5',
    label: 'Education',
    icon: <School className="text-muted-foreground mr-2 h-4 w-4" />,
    description: 'Educational services and institutions',
  },
]

// Organization size options
export const sizeOptions = [
  {
    value: 'size-1',
    label: '1-10 employees',
    description: 'Micro',
  },
  {
    value: 'size-2',
    label: '11-50 employees',
    description: 'Small',
  },
  {
    value: 'size-3',
    label: '51-200 employees',
    description: 'Medium',
  },
  {
    value: 'size-4',
    label: '201-1000 employees',
    description: 'Large',
  },
  {
    value: 'size-5',
    label: '1000+ employees',
    description: 'Enterprise',
  },
]

// Timezone options
export const timezoneOptions = [
  { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
  { value: 'Europe/Paris', label: 'Central European Time (CET)' },
  { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
  { value: 'Asia/Shanghai', label: 'China Standard Time (CST)' },
  { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)' },
]

// Language options
export const languageOptions = [
  { value: 'en-US', label: 'English (United States)' },
  { value: 'en-GB', label: 'English (United Kingdom)' },
  { value: 'es-ES', label: 'Spanish (Spain)' },
  { value: 'fr-FR', label: 'French (France)' },
  { value: 'de-DE', label: 'German (Germany)' },
  { value: 'it-IT', label: 'Italian (Italy)' },
  { value: 'ja-JP', label: 'Japanese (Japan)' },
  { value: 'zh-CN', label: 'Chinese (Simplified)' },
  { value: 'pt-BR', label: 'Portuguese (Brazil)' },
  { value: 'ru-RU', label: 'Russian (Russia)' },
]

// Currency options
export const currencyOptions = [
  { value: 'USD', label: 'US Dollar', symbol: '$' },
  { value: 'EUR', label: 'Euro', symbol: '€' },
  { value: 'GBP', label: 'British Pound', symbol: '£' },
  { value: 'JPY', label: 'Japanese Yen', symbol: '¥' },
  { value: 'CAD', label: 'Canadian Dollar', symbol: 'C$' },
  { value: 'AUD', label: 'Australian Dollar', symbol: 'A$' },
  { value: 'CNY', label: 'Chinese Yuan', symbol: '¥' },
  { value: 'INR', label: 'Indian Rupee', symbol: '₹' },
  { value: 'BRL', label: 'Brazilian Real', symbol: 'R$' },
  { value: 'CHF', label: 'Swiss Franc', symbol: 'CHF' },
]

// Date format options
export const dateFormatOptions = [
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD', example: '2023-05-15' },
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY', example: '05/15/2023' },
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY', example: '15/05/2023' },
  { value: 'YYYY.MM.DD', label: 'YYYY.MM.DD', example: '2023.05.15' },
  { value: 'DD.MM.YYYY', label: 'DD.MM.YYYY', example: '15.05.2023' },
  { value: 'DD-MMM-YYYY', label: 'DD-MMM-YYYY', example: '15-May-2023' },
]

// Time format options
export const timeFormatOptions = [
  { value: 'HH:mm', label: '24-hour', example: '14:30' },
  { value: 'hh:mm A', label: '12-hour', example: '02:30 PM' },
  { value: 'HH:mm:ss', label: '24-hour with seconds', example: '14:30:45' },
  { value: 'hh:mm:ss A', label: '12-hour with seconds', example: '02:30:45 PM' },
]
