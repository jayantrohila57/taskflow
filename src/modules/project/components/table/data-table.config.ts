import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Calendar,
  CheckCircle,
  Circle,
  CircleOff,
  ClipboardList,
  Code,
  FileText,
  Folder,
  HelpCircle,
  LayoutDashboard,
  PieChart,
  Shield,
  Timer,
  Zap,
} from 'lucide-react'

export const categories = [
  {
    value: 'development',
    label: 'Development',
    icon: Code,
  },
  {
    value: 'design',
    label: 'Design',
    icon: FileText,
  },
  {
    value: 'marketing',
    label: 'Marketing',
    icon: PieChart,
  },
  {
    value: 'operations',
    label: 'Operations',
    icon: LayoutDashboard,
  },
  {
    value: 'other',
    label: 'Other',
    icon: Folder,
  },
]

export const statuses = [
  {
    value: 'active',
    label: 'Active',
    icon: Circle,
  },
  {
    value: 'completed',
    label: 'Completed',
    icon: CheckCircle,
  },
  {
    value: 'on_hold',
    label: 'On Hold',
    icon: Timer,
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: CircleOff,
  },
  {
    value: 'pending',
    label: 'Pending',
    icon: HelpCircle,
  },
]

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDown,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRight,
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUp,
  },
  {
    label: 'Urgent',
    value: 'urgent',
    icon: Zap,
  },
]

export const timeframes = [
  {
    value: 'current',
    label: 'Current',
    icon: Calendar,
  },
  {
    value: 'upcoming',
    label: 'Upcoming',
    icon: ClipboardList,
  },
  {
    value: 'overdue',
    label: 'Overdue',
    icon: Shield,
  },
]

// Project Sizes
export const projectSizes = [
  {
    value: 'small',
    label: 'Small',
    icon: Circle,
  },
  {
    value: 'medium',
    label: 'Medium',
    icon: Circle,
  },
  {
    value: 'large',
    label: 'Large',
    icon: Circle,
  },
]

// Project Types
export const projectTypes = [
  {
    value: 'internal',
    label: 'Internal',
    icon: Shield,
  },
  {
    value: 'client',
    label: 'Client',
    icon: HelpCircle,
  },
  {
    value: 'product',
    label: 'Product',
    icon: Folder,
  },
]

// Access Levels
export const accessLevels = [
  {
    value: 'public',
    label: 'Public',
    icon: Circle,
  },
  {
    value: 'private',
    label: 'Private',
    icon: Shield,
  },
  {
    value: 'restricted',
    label: 'Restricted',
    icon: CircleOff,
  },
]
