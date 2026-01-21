import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckCircle2,
  Clock,
  Users,
  ArrowRight,
  Briefcase,
  Activity,
  ThumbsUp,
  Calendar,
  Lock,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Link } from '@/packages/next-intl/utils/navigation'
import { PATH } from '@/resources/config/routes.config' // Assuming you have PATH defined

export const ACCOUNT_TEXT = {
  TITLE: 'Account Overview',
  SUBTITLE: 'Summary and quick actions for your account.',
  QUICK_ACTIONS_TITLE: 'Quick Actions',
  QUICK_ACTIONS_DESCRIPTION: 'Get started with these common tasks.',
  PROFILE_CARD_TITLE: 'Profile Settings',
  PROFILE_CARD_DESCRIPTION: 'Update your personal information and social profiles.',
  SECURITY_CARD_TITLE: 'Security Settings',
  SECURITY_CARD_DESCRIPTION: 'Manage your password, two-factor authentication, and login history.',
  NOTIFICATIONS_CARD_TITLE: 'Notification Settings',
  NOTIFICATIONS_CARD_DESCRIPTION: 'Configure your email and push notification preferences.',
  BILLING_CARD_TITLE: 'Billing Information',
  BILLING_CARD_DESCRIPTION: 'View your current plan, payment methods, and billing history.',
  SESSIONS_CARD_TITLE: 'Active Sessions',
  SESSIONS_CARD_DESCRIPTION: 'Manage your active login sessions.',
  PREFERENCES_CARD_TITLE: 'Preferences',
  PREFERENCES_CARD_DESCRIPTION: 'Customize language, region, and accessibility settings.',
  INTEGRATIONS_CARD_TITLE: 'Integrations',
  INTEGRATIONS_CARD_DESCRIPTION: 'Manage connections to third-party services.',
  VIEW_DETAILS: 'View Details',
  FROM_LAST_MONTH: 'from last month',
}

export const ACCOUNT_CONSTANTS = {
  TAB_OVERVIEW: 'overview',
  FROM_LAST_MONTH: 'from last month',
  TAB_ACTIVITY: 'activity',
  TAB_CONTRIBUTIONS: 'contributions', // Example of an account-specific tab
  BUTTON_DOWNLOAD: 'Download',
  BUTTON_FILTER: 'Filter',
  CARD_TITLE_TOTAL_TASKS_COMPLETED: 'Total Tasks Completed',
  CARD_TITLE_TOTAL_CONTRIBUTIONS: 'Total Contributions',
  CARD_TITLE_REPUTATION_SCORE: 'Reputation Score',
  CARD_TITLE_LOGIN_ACTIVITY: 'Recent Login Activity',
  CARD_TITLE_ACCOUNT_AGE: 'Account Age',
  CARD_TITLE_PROJECTS_INVOLVED: 'Projects Involved',
  CARD_TITLE_LAST_ACTIVITY: 'Last Activity',
  CARD_DESCRIPTION_OVERVIEW: 'View a summary of your account.',
  CARD_DESCRIPTION_ACTIVITY: 'Track your account activity.',
  CARD_DESCRIPTION_CONTRIBUTIONS: 'View your contributions.',
}

export default async function AccountOverviewPage() {
  const accountMetrics = [
    {
      label: ACCOUNT_CONSTANTS.CARD_TITLE_TOTAL_TASKS_COMPLETED,
      value: '128',
      change: 15,
      trend: 'up',
    },
    {
      label: ACCOUNT_CONSTANTS.CARD_TITLE_TOTAL_CONTRIBUTIONS,
      value: '2.5K',
      change: 10,
      trend: 'up',
    },
    {
      label: ACCOUNT_CONSTANTS.CARD_TITLE_REPUTATION_SCORE,
      value: '850',
      change: 2,
      trend: 'up',
    },
    {
      label: ACCOUNT_CONSTANTS.CARD_TITLE_LOGIN_ACTIVITY,
      value: '5', // Number of recent logins
      change: -1,
      trend: 'down', // Fewer recent logins might be 'down' depending on interpretation
    },
    {
      label: ACCOUNT_CONSTANTS.CARD_TITLE_ACCOUNT_AGE,
      value: '2 years',
      change: 0,
      trend: 'neutral',
    },
    {
      label: ACCOUNT_CONSTANTS.CARD_TITLE_PROJECTS_INVOLVED,
      value: '10',
      change: 1,
      trend: 'up',
    },
    {
      label: ACCOUNT_CONSTANTS.CARD_TITLE_LAST_ACTIVITY,
      value: '2 hours ago',
      change: undefined, // No change for a single timestamp
      trend: 'neutral',
    },
  ]

  const getMetricIcon = (label: string) => {
    switch (label) {
      case ACCOUNT_CONSTANTS.CARD_TITLE_TOTAL_TASKS_COMPLETED:
        return <CheckCircle2 className="text-muted-foreground h-4 w-4" />
      case ACCOUNT_CONSTANTS.CARD_TITLE_TOTAL_CONTRIBUTIONS:
        return <Users className="text-muted-foreground h-4 w-4" />
      case ACCOUNT_CONSTANTS.CARD_TITLE_REPUTATION_SCORE:
        return <ThumbsUp className="text-muted-foreground h-4 w-4" />
      case ACCOUNT_CONSTANTS.CARD_TITLE_LOGIN_ACTIVITY:
        return <Lock className="text-muted-foreground h-4 w-4" />
      case ACCOUNT_CONSTANTS.CARD_TITLE_ACCOUNT_AGE:
        return <Calendar className="text-muted-foreground h-4 w-4" />
      case ACCOUNT_CONSTANTS.CARD_TITLE_PROJECTS_INVOLVED:
        return <Briefcase className="text-muted-foreground h-4 w-4" />
      case ACCOUNT_CONSTANTS.CARD_TITLE_LAST_ACTIVITY:
        return <Clock className="text-muted-foreground h-4 w-4" />
      default:
        return <Activity className="text-muted-foreground h-4 w-4" />
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Tabs
        defaultValue={ACCOUNT_CONSTANTS.TAB_OVERVIEW}
        className="space-y-2 md:col-span-2 lg:col-span-4"
      >
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value={ACCOUNT_CONSTANTS.TAB_OVERVIEW}>
              {ACCOUNT_CONSTANTS.TAB_OVERVIEW.charAt(0).toUpperCase() + ACCOUNT_CONSTANTS.TAB_OVERVIEW.slice(1)}
            </TabsTrigger>
            <TabsTrigger value={ACCOUNT_CONSTANTS.TAB_ACTIVITY}>
              {ACCOUNT_CONSTANTS.TAB_ACTIVITY.charAt(0).toUpperCase() + ACCOUNT_CONSTANTS.TAB_ACTIVITY.slice(1)}
            </TabsTrigger>
            <TabsTrigger value={ACCOUNT_CONSTANTS.TAB_CONTRIBUTIONS}>
              {ACCOUNT_CONSTANTS.TAB_CONTRIBUTIONS.charAt(0).toUpperCase() +
                ACCOUNT_CONSTANTS.TAB_CONTRIBUTIONS.slice(1)}
            </TabsTrigger>
            {/* Add other relevant account tabs here */}
          </TabsList>
          {/* Optional: Add Filter/Download buttons if relevant for overview metrics */}
          {/* <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
            >
              <Download className="mr-2 h-4 w-4" />
              {ACCOUNT_CONSTANTS.BUTTON_DOWNLOAD}
            </Button>
            <Button
              variant="outline"
              size="sm"
            >
              <Filter className="mr-2 h-4 w-4" />
              {ACCOUNT_CONSTANTS.BUTTON_FILTER}
            </Button>
          </div> */}
        </div>
        <TabsContent value={ACCOUNT_CONSTANTS.TAB_OVERVIEW}>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {accountMetrics.map((metric) => (
              <Card key={metric.label}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                  {getMetricIcon(metric.label)}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  {metric.change !== undefined && metric.trend !== 'neutral' && (
                    <p className="text-muted-foreground flex items-center text-xs">
                      <span
                        className={`flex items-center ${metric.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}
                      >
                        {metric.trend === 'up' ? (
                          <ArrowUpIcon className="mr-1 h-3 w-3" />
                        ) : (
                          <ArrowDownIcon className="mr-1 h-3 w-3" />
                        )}
                        {metric.change}
                        {metric.label !== ACCOUNT_CONSTANTS.CARD_TITLE_REPUTATION_SCORE ? '%' : ''}{' '}
                        {/* Add % for non-score metrics */}
                      </span>{' '}
                      {ACCOUNT_CONSTANTS.FROM_LAST_MONTH}
                    </p>
                  )}
                  {metric.trend === 'neutral' && metric.label === ACCOUNT_CONSTANTS.CARD_TITLE_ACCOUNT_AGE && (
                    <p className="text-muted-foreground text-xs">{'Static'}</p>
                  )}
                  {metric.trend === 'neutral' && metric.label === ACCOUNT_CONSTANTS.CARD_TITLE_LAST_ACTIVITY && (
                    <p className="text-muted-foreground text-xs">{'Recent'}</p>
                  )}
                </CardContent>
              </Card>
            ))}
            <div className="h-full w-full md:col-span-2 lg:col-span-4">
              <Card>
                <CardHeader>
                  <CardTitle>{ACCOUNT_TEXT.QUICK_ACTIONS_TITLE}</CardTitle>
                  <CardDescription>{ACCOUNT_TEXT.QUICK_ACTIONS_DESCRIPTION}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <QuickActionCard
                      title={ACCOUNT_TEXT.PROFILE_CARD_TITLE}
                      description={ACCOUNT_TEXT.PROFILE_CARD_DESCRIPTION}
                      href={`${PATH.HANDLER.ACCOUNT.ROOT}/profile`} // Link to profile settings page
                    />
                    <QuickActionCard
                      title={ACCOUNT_TEXT.SECURITY_CARD_TITLE}
                      description={ACCOUNT_TEXT.SECURITY_CARD_DESCRIPTION}
                      href={`${PATH.HANDLER.ACCOUNT.ROOT}/security`} // Link to security settings page
                    />
                    <QuickActionCard
                      title={ACCOUNT_TEXT.NOTIFICATIONS_CARD_TITLE}
                      description={ACCOUNT_TEXT.NOTIFICATIONS_CARD_DESCRIPTION}
                      href={`${PATH.HANDLER.ACCOUNT.ROOT}/notifications`} // Link to notifications settings page
                    />
                    <QuickActionCard
                      title={ACCOUNT_TEXT.BILLING_CARD_TITLE}
                      description={ACCOUNT_TEXT.BILLING_CARD_DESCRIPTION}
                      href={`${PATH.HANDLER.ACCOUNT.ROOT}/billing`} // Link to billing settings page
                    />
                    <QuickActionCard
                      title={ACCOUNT_TEXT.SESSIONS_CARD_TITLE}
                      description={ACCOUNT_TEXT.SESSIONS_CARD_DESCRIPTION}
                      href={`${PATH.HANDLER.ACCOUNT.ROOT}/sessions`} // Link to sessions settings page
                    />
                    <QuickActionCard
                      title={ACCOUNT_TEXT.PREFERENCES_CARD_TITLE}
                      description={ACCOUNT_TEXT.PREFERENCES_CARD_DESCRIPTION}
                      href={`${PATH.HANDLER.ACCOUNT.ROOT}/preferences`} // Link to preferences settings page
                    />
                    {/* Add quick actions for other account sections like roles, integrations, etc. */}
                    {/* Example: */}
                    {/* <QuickActionCard
                      title={ACCOUNT_TEXT.INTEGRATIONS_CARD_TITLE}
                      description={ACCOUNT_TEXT.INTEGRATIONS_CARD_DESCRIPTION}
                      href={`${PATH.HANDLER.ACCOUNT.ROOT}/integrations`}
                    /> */}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        {/* Account Activity Tab Content (Example) */}
        <TabsContent
          value={ACCOUNT_CONSTANTS.TAB_ACTIVITY}
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>
                {ACCOUNT_CONSTANTS.TAB_ACTIVITY.charAt(0).toUpperCase() + ACCOUNT_CONSTANTS.TAB_ACTIVITY.slice(1)}
              </CardTitle>
              <CardDescription>{ACCOUNT_CONSTANTS.CARD_DESCRIPTION_ACTIVITY}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Content related to account activity feed would go here */}
              <p>{'This is where your recent account activity will be displayed.'}</p>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Account Contributions Tab Content (Example) */}
        <TabsContent
          value={ACCOUNT_CONSTANTS.TAB_CONTRIBUTIONS}
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>
                {ACCOUNT_CONSTANTS.TAB_CONTRIBUTIONS.charAt(0).toUpperCase() +
                  ACCOUNT_CONSTANTS.TAB_CONTRIBUTIONS.slice(1)}
              </CardTitle>
              <CardDescription>{ACCOUNT_CONSTANTS.CARD_DESCRIPTION_CONTRIBUTIONS}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Content related to account contributions would go here */}
              <p>{'This section will show your contributions (e.g., tasks completed, code commits, etc.).'}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function QuickActionCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Card className="hover:bg-muted/50 transition-colors">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          asChild
          variant="ghost"
          className="w-full justify-between"
        >
          <Link href={href}>
            {ACCOUNT_TEXT.VIEW_DETAILS}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
