import { getTranslations } from 'next-intl/server'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Building2,
  CheckCircle2,
  Clock,
  DollarSign,
  Download,
  Filter,
  Plus,
  Users,
  Handshake,
  ShieldQuestion,
  Bell,
  ArrowRight,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Link } from '@/packages/next-intl/utils/navigation'
import { PATH } from '@/resources/config/routes.config'
import { Separator } from '@/components/ui/separator'

export const DASHBOARD_TEXT = {
  TITLE: 'Organizations',
  SUBTITLE: 'Manage your organizations and teams.',
  JOIN_BUTTON: 'Join Organization',
  CREATE_BUTTON: 'Create Organization',
  ORGANIZATIONS_TITLE: 'Your Organizations',
  ORGANIZATIONS_DESCRIPTION: 'Organizations you are a member of.',
  QUICK_ACTIONS_TITLE: 'Quick Actions',
  QUICK_ACTIONS_DESCRIPTION: 'Get started with these common tasks.',
  CREATE_ORG_CARD_TITLE: 'Create Organization',
  CREATE_ORG_CARD_DESCRIPTION: 'Create a new organization for your team.',
  JOIN_ORG_CARD_TITLE: 'Join Organization',
  JOIN_ORG_CARD_DESCRIPTION: 'Join an existing organization with an invite code.',
  SETTINGS_CARD_TITLE: 'Settings',
  SETTINGS_CARD_DESCRIPTION: 'Manage your account settings and preferences.',
  VIEW_DETAILS: 'View Details',
}

export const ORG_DETAILS_TEXT = {
  BACK_TO_DASHBOARD: 'Back to Dashboard',
  OVERVIEW_TAB: 'Overview',
  MEMBERS_TAB: 'Members',
  ACTIVITY_TAB: 'Activity',

  OVERVIEW_TITLE: 'Organization Overview',
  OVERVIEW_DESCRIPTION: 'General information about this organization.',

  MEMBERS_TITLE: 'Team Members',
  MEMBERS_DESCRIPTION: 'Manage your team members and their roles.',

  ACTIVITY_TITLE: 'Activity Feed',
  ACTIVITY_DESCRIPTION: 'Recent activity in this organization.',

  QUICK_ACTIONS_TITLE: 'Quick Actions',
  QUICK_ACTIONS_DESCRIPTION: 'Common tasks for this organization.',

  SETTINGS_BUTTON: 'Organization Settings',
  INVITE_MEMBERS_BUTTON: 'Invite Members',

  ORGANIZATION_ID: 'Organization ID',
  SAMPLE_CONTENT: 'This is a sample organization. In a real application, this would display actual organization data.',
}
const ORGANIZATION_CONSTANTS = {
  TAB_OVERVIEW: 'overview',
  TAB_ORGANIZATIONS: 'organizations',
  TAB_ANALYTICS: 'analytics',
  TAB_REPORTS: 'reports',
  BUTTON_DOWNLOAD: 'Download',
  BUTTON_FILTER: 'Filter',
  BUTTON_ADD_ORGANIZATION: 'Add Organization',
  CARD_TITLE_TOTAL_ORGANIZATIONS: 'Total Organizations',
  CARD_TITLE_ACTIVE_USERS: 'Active Users Across Organizations',
  CARD_TITLE_TOTAL_REVENUE: 'Total Revenue from Organizations',
  CARD_TITLE_ACTIVE_RATE: 'Overall Active Rate',
  CARD_TITLE_AVG_USERS_PER_ORG: 'Average Users per Org',
  CARD_TITLE_ORGS_CREATED_MONTH: 'Organizations Created This Month',
  CARD_TITLE_ORGS_PENDING_APPROVAL: 'Organizations Pending Approval',
  CARD_TITLE_ORGS_HIGH_ENGAGEMENT: 'Organizations with High Engagement',
  CARD_TITLE_AVG_ORG_AGE: 'Average Organization Age',
  CARD_TITLE_ORGS_PAID_SUBS: 'Organizations with Paid Subscriptions',
  CARD_TITLE_ORGS_FREE_PLANS: 'Organizations with Free Plans',
  CARD_TITLE_CHURN_RATE: 'Churn Rate (Last Month)',
  CARD_TITLE_NEW_SIGN_UP: 'New Sign ups (Last Week)',
  CARD_TITLE_ORGS_RECENT_ACTIVITY: 'Organizations with Recent Activity (Last 24h)',
  CARD_TITLE_ORGS_INTEGRATIONS: 'Organizations with Integrations',
  CARD_TITLE_AVG_SESSION_DURATION: 'Average Session Duration (Minutes)',
  CARD_DESCRIPTION_ALL_ORGS: 'Manage and view details of all organizations.',
  CARD_DESCRIPTION_ANALYTICS: 'Analyze key metrics and trends across organizations.',
  CARD_DESCRIPTION_REPORTS: 'Generate and download reports related to organizations.',
  FROM_LAST_MONTH: 'from last month',
}

export default async function OrganizationOverview() {
  const t = await getTranslations()

  const organizationMetrics = [
    {
      label: ORGANIZATION_CONSTANTS.CARD_TITLE_TOTAL_ORGANIZATIONS,
      value: '1,284',
      change: 12.5,
      trend: 'up',
    },
    {
      label: ORGANIZATION_CONSTANTS.CARD_TITLE_ACTIVE_USERS,
      value: '24.3K',
      change: 18.2,
      trend: 'up',
    },
    {
      label: ORGANIZATION_CONSTANTS.CARD_TITLE_TOTAL_REVENUE,
      value: '$452.9K',
      change: 9.3,
      trend: 'up',
    },
    {
      label: ORGANIZATION_CONSTANTS.CARD_TITLE_ACTIVE_RATE,
      value: '92.4%',
      change: 1.2,
      trend: 'down',
    },
    {
      label: ORGANIZATION_CONSTANTS.CARD_TITLE_AVG_USERS_PER_ORG,
      value: '85',
      change: 5.2,
      trend: 'up',
    },
    {
      label: ORGANIZATION_CONSTANTS.CARD_TITLE_ORGS_CREATED_MONTH,
      value: '18',
      change: 20,
      trend: 'up',
    },
    {
      label: ORGANIZATION_CONSTANTS.CARD_TITLE_ORGS_PENDING_APPROVAL,
      value: '7',
      change: 3,
      trend: 'down',
    },
    {
      label: ORGANIZATION_CONSTANTS.CARD_TITLE_ORGS_HIGH_ENGAGEMENT,
      value: '980',
      change: 8.1,
      trend: 'up',
    },
  ]

  const getMetricIcon = (label: string) => {
    switch (label) {
      case ORGANIZATION_CONSTANTS.CARD_TITLE_TOTAL_ORGANIZATIONS:
        return <Building2 className="text-muted-foreground h-4 w-4" />
      case ORGANIZATION_CONSTANTS.CARD_TITLE_ACTIVE_USERS:
        return <Users className="text-muted-foreground h-4 w-4" />
      case ORGANIZATION_CONSTANTS.CARD_TITLE_TOTAL_REVENUE:
        return <DollarSign className="text-muted-foreground h-4 w-4" />
      case ORGANIZATION_CONSTANTS.CARD_TITLE_ACTIVE_RATE:
        return <CheckCircle2 className="text-muted-foreground h-4 w-4" />
      case ORGANIZATION_CONSTANTS.CARD_TITLE_AVG_USERS_PER_ORG:
        return <Users className="text-muted-foreground h-4 w-4" />
      case ORGANIZATION_CONSTANTS.CARD_TITLE_ORGS_CREATED_MONTH:
        return <Clock className="text-muted-foreground h-4 w-4" />
      case ORGANIZATION_CONSTANTS.CARD_TITLE_ORGS_PENDING_APPROVAL:
        return <ShieldQuestion className="text-muted-foreground h-4 w-4" />
      case ORGANIZATION_CONSTANTS.CARD_TITLE_ORGS_HIGH_ENGAGEMENT:
        return <Bell className="text-muted-foreground h-4 w-4" />
      case ORGANIZATION_CONSTANTS.CARD_TITLE_AVG_ORG_AGE:
        return <Clock className="text-muted-foreground h-4 w-4" />
      case ORGANIZATION_CONSTANTS.CARD_TITLE_ORGS_PAID_SUBS:
        return <DollarSign className="text-muted-foreground h-4 w-4" />
      case ORGANIZATION_CONSTANTS.CARD_TITLE_ORGS_FREE_PLANS:
        return <Building2 className="text-muted-foreground h-4 w-4" />
      case ORGANIZATION_CONSTANTS.CARD_TITLE_CHURN_RATE:
        return <ArrowDownIcon className="text-muted-foreground h-4 w-4" />
      case ORGANIZATION_CONSTANTS.CARD_TITLE_NEW_SIGN_UP:
        return <Plus className="text-muted-foreground h-4 w-4" />
      case ORGANIZATION_CONSTANTS.CARD_TITLE_ORGS_RECENT_ACTIVITY:
        return <Clock className="text-muted-foreground h-4 w-4" />
      case ORGANIZATION_CONSTANTS.CARD_TITLE_ORGS_INTEGRATIONS:
        return <Handshake className="text-muted-foreground h-4 w-4" />
      case ORGANIZATION_CONSTANTS.CARD_TITLE_AVG_SESSION_DURATION:
        return <Clock className="text-muted-foreground h-4 w-4" />
      default:
        return <Building2 className="text-muted-foreground h-4 w-4" />
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Tabs
        defaultValue={ORGANIZATION_CONSTANTS.TAB_OVERVIEW}
        className="space-y-2 md:col-span-2 lg:col-span-4"
      >
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value={ORGANIZATION_CONSTANTS.TAB_OVERVIEW}>
              {ORGANIZATION_CONSTANTS.TAB_OVERVIEW.charAt(0).toUpperCase() +
                ORGANIZATION_CONSTANTS.TAB_OVERVIEW.slice(1)}
            </TabsTrigger>
            <TabsTrigger value={ORGANIZATION_CONSTANTS.TAB_ORGANIZATIONS}>
              {ORGANIZATION_CONSTANTS.TAB_ORGANIZATIONS.charAt(0).toUpperCase() +
                ORGANIZATION_CONSTANTS.TAB_ORGANIZATIONS.slice(1)}
            </TabsTrigger>
            <TabsTrigger value={ORGANIZATION_CONSTANTS.TAB_ANALYTICS}>
              {ORGANIZATION_CONSTANTS.TAB_ANALYTICS.charAt(0).toUpperCase() +
                ORGANIZATION_CONSTANTS.TAB_ANALYTICS.slice(1)}
            </TabsTrigger>
            <TabsTrigger value={ORGANIZATION_CONSTANTS.TAB_REPORTS}>
              {ORGANIZATION_CONSTANTS.TAB_REPORTS.charAt(0).toUpperCase() + ORGANIZATION_CONSTANTS.TAB_REPORTS.slice(1)}
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
            >
              <Download className="mr-2 h-4 w-4" />
              {ORGANIZATION_CONSTANTS.BUTTON_DOWNLOAD}
            </Button>
            <Button
              variant="outline"
              size="sm"
            >
              <Filter className="mr-2 h-4 w-4" />
              {ORGANIZATION_CONSTANTS.BUTTON_FILTER}
            </Button>
            <Button
              size="sm"
              variant="outline"
            >
              <Plus className="mr-2 h-4 w-4" />
              {ORGANIZATION_CONSTANTS.BUTTON_ADD_ORGANIZATION}
            </Button>
          </div>
        </div>
        <TabsContent value={ORGANIZATION_CONSTANTS.TAB_OVERVIEW}>
          <Card className="bg-transparent">
            <CardHeader>
              <CardTitle>{DASHBOARD_TEXT.QUICK_ACTIONS_TITLE}</CardTitle>
              <CardDescription>{DASHBOARD_TEXT.QUICK_ACTIONS_DESCRIPTION}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {organizationMetrics.map((metric) => (
                <Card key={metric.label}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                    {getMetricIcon(metric.label)}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <p className="text-muted-foreground text-xs">
                      {metric.change !== undefined && (
                        <span
                          className={`flex items-center ${metric.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}
                        >
                          {metric.trend === 'up' ? (
                            <ArrowUpIcon className="mr-1 h-3 w-3" />
                          ) : (
                            <ArrowDownIcon className="mr-1 h-3 w-3" />
                          )}
                          {metric.change}
                          {'%'}
                        </span>
                      )}{' '}
                      {ORGANIZATION_CONSTANTS.FROM_LAST_MONTH}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
            <Separator />
            <CardHeader>
              <CardTitle>{DASHBOARD_TEXT.QUICK_ACTIONS_TITLE}</CardTitle>
              <CardDescription>{DASHBOARD_TEXT.QUICK_ACTIONS_DESCRIPTION}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                <QuickActionCard
                  title="Manage Organizations"
                  description="Manage settings and members of your existing organizations."
                  href={PATH.PROTECTED.ORGANIZATION.CREATE}
                />
                <QuickActionCard
                  title={DASHBOARD_TEXT.CREATE_ORG_CARD_TITLE}
                  description={DASHBOARD_TEXT.CREATE_ORG_CARD_DESCRIPTION}
                  href={PATH.PROTECTED.ORGANIZATION.CREATE}
                />
                <QuickActionCard
                  title={DASHBOARD_TEXT.JOIN_ORG_CARD_TITLE}
                  description={DASHBOARD_TEXT.JOIN_ORG_CARD_DESCRIPTION}
                  href={PATH.PROTECTED.ORGANIZATION.CREATE}
                />
                <QuickActionCard
                  title="Organization Invites"
                  description="View and manage your pending organization invitations."
                  href={PATH.PROTECTED.ORGANIZATION.CREATE}
                />
                <QuickActionCard
                  title="Join Requests"
                  description="Review and manage incoming requests to join your organizations."
                  href={PATH.PROTECTED.ORGANIZATION.CREATE}
                />
                <QuickActionCard
                  title={DASHBOARD_TEXT.SETTINGS_CARD_TITLE}
                  description={DASHBOARD_TEXT.SETTINGS_CARD_DESCRIPTION}
                  href={PATH.PROTECTED.ORGANIZATION.CREATE}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Organizations Tab Content (Example) */}
        <TabsContent
          value={ORGANIZATION_CONSTANTS.TAB_ORGANIZATIONS}
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>
                {ORGANIZATION_CONSTANTS.TAB_ORGANIZATIONS.charAt(0).toUpperCase() +
                  ORGANIZATION_CONSTANTS.TAB_ORGANIZATIONS.slice(1)}
              </CardTitle>
              <CardDescription>{ORGANIZATION_CONSTANTS.CARD_DESCRIPTION_ALL_ORGS}</CardDescription>
            </CardHeader>
            <CardContent>{/* Table or list of all organizations would go here */}</CardContent>
          </Card>
        </TabsContent>
        {/* Analytics Tab Content (Example) */}
        <TabsContent
          value={ORGANIZATION_CONSTANTS.TAB_ANALYTICS}
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>
                {ORGANIZATION_CONSTANTS.TAB_ANALYTICS.charAt(0).toUpperCase() +
                  ORGANIZATION_CONSTANTS.TAB_ANALYTICS.slice(1)}
              </CardTitle>
              <CardDescription>{ORGANIZATION_CONSTANTS.CARD_DESCRIPTION_ANALYTICS}</CardDescription>
            </CardHeader>
            <CardContent>{/* Charts and graphs related to organizations would go here */}</CardContent>
          </Card>
        </TabsContent>
        {/* Reports Tab Content (Example) */}
        <TabsContent
          value={ORGANIZATION_CONSTANTS.TAB_REPORTS}
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>
                {ORGANIZATION_CONSTANTS.TAB_REPORTS.charAt(0).toUpperCase() +
                  ORGANIZATION_CONSTANTS.TAB_REPORTS.slice(1)}
              </CardTitle>
              <CardDescription>{ORGANIZATION_CONSTANTS.CARD_DESCRIPTION_REPORTS}</CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function QuickActionCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex w-full flex-row items-end justify-end">
        <Link href={href}>
          <Button
            variant="ghost"
            className="justify-end"
          >
            {DASHBOARD_TEXT.VIEW_DETAILS}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
