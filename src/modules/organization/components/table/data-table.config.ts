import { Building2, CheckCircle, Circle, CircleOff, Clock, HelpCircle, Shield, Users } from 'lucide-react'

export const organizationTypes = [
  { value: 'business', label: 'Business', icon: Building2 },
  { value: 'non-profit', label: 'Non-Profit', icon: Users },
  { value: 'government', label: 'Government', icon: Shield },
]

export const organizationStatuses = [
  { value: 'pending', label: 'Pending', icon: HelpCircle },
  { value: 'active', label: 'Active', icon: Circle },
  { value: 'suspended', label: 'Suspended', icon: Clock },
  { value: 'verified', label: 'Verified', icon: CheckCircle },
  { value: 'closed', label: 'Closed', icon: CircleOff },
]
