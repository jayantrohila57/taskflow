import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Bug,
  CheckCircle,
  Circle,
  CircleOff,
  FileText,
  HelpCircle,
  Mail,
  Package,
  Shield,
  Timer,
  UserCircle2,
  UserCog,
  User as UserIcon,
  Users,
} from 'lucide-react'

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
    icon: Bug,
  },
  {
    value: 'feature',
    label: 'Feature',
    icon: Package,
  },
  {
    value: 'documentation',
    label: 'Documentation',
    icon: FileText,
  },
]

export const statuses = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: HelpCircle,
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: Circle,
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: Timer,
  },
  {
    value: 'done',
    label: 'Done',
    icon: CheckCircle,
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: CircleOff,
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
]

export const roles = [
  {
    value: 'admin',
    label: 'Admin',
    icon: Shield,
  },
  {
    value: 'user',
    label: 'User',
    icon: UserIcon,
  },
  {
    value: 'manager',
    label: 'Manager',
    icon: UserCog,
  },
]

export const verificationStatus = [
  {
    value: 'verified',
    label: 'Verified',
    icon: UserCircle2,
  },
  {
    value: 'unverified',
    label: 'Unverified',
    icon: Users,
  },
]

export const emailStatus = [
  {
    value: 'active',
    label: 'Active',
    icon: Mail,
  },
  {
    value: 'inactive',
    label: 'Inactive',
    icon: Mail,
  },
]

// User Statuses for Filtering
export const userStatuses = [
  {
    value: 'active',
    label: 'Active',
    icon: CheckCircle, // Using CheckCircle for consistency with other configs
  },
  {
    value: 'inactive',
    label: 'Inactive',
    icon: CircleOff, // Using CircleOff
  },
  {
    value: 'pending',
    label: 'Pending',
    icon: Timer,
  },
  {
    value: 'suspended',
    label: 'Suspended',
    icon: HelpCircle, // Reusing HelpCircle, consider a more specific icon if available
  },
  {
    value: 'locked',
    label: 'Locked',
    icon: Shield, // Reusing Shield, consider Lock icon if preferred
  },
  // Add other statuses like Archived/Deleted if needed for filtering
]
