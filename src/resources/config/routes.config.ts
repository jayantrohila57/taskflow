const HANDLER = {
  ROOT: '/handler',
  ACCOUNT: {
    ROOT: '/handler/account',
    SETTINGS: '/handler/account/settings',
  },
  ADMIN: {
    ROOT: '/handler/admin',
    DASHBOARD: '/handler/admin/dashboard',
    DASHBOARD_ACCESS_CONTROL: '/handler/admin/dashboard/Access-control',
    DASHBOARD_ORGANIZATIONS: '/handler/admin/dashboard/organizations',
    DASHBOARD_ORGANIZATIONS_CREATE: '/handler/admin/dashboard/organizations/create',
    DASHBOARD_PROJECTS: '/handler/admin/dashboard/projects',
    DASHBOARD_SESSION: '/handler/admin/dashboard/session',
    DASHBOARD_SUPPORT: '/handler/admin/dashboard/support',
    DASHBOARD_TEAM: '/handler/admin/dashboard/team',
    DASHBOARD_USERS: '/handler/admin/dashboard/users',
    DASHBOARD_USER_DETAIL: (id: string) => `/handler/admin/dashboard/users/${id}`,
  },
}

const PANEL = {
  ROOT: '/panel',
  DASHBOARD: '/panel/dashboard',
  FEEDBACK: '/panel/feedback',
  FEEDBACK_CREATE: '/panel/feedback/create',
  FEEDBACK_DETAIL: (id: string) => `/panel/feedback/${id}`,
  SUPPORT: {
    ROOT: '/panel/support',
    TICKETS: {
      ROOT: '/panel/support/tickets',
      CREATE: '/panel/support/tickets/create',
      DETAIL: (id: string) => `/panel/support/tickets/${id}`,
    },
  },
}

const PROTECTED = {
  ORGANIZATION: {
    ROOT: '/organizations',
    CREATE: '/organizations/create',
    JOIN: '/organizations/join',
    ONBOARDING: '/organizations/onboarding',
    LIST: '/organizations/list',
    DETAIL: (organization: string) => `/organizations/${organization}`,
    PROJECT: (organization: string) => `/organizations/${organization}/project`,
    ROLES: (organization: string) => `/organizations/${organization}/roles`,
    ROLES_PERMISSIONS: (organization: string) => `/organizations/${organization}/roles/permissions`,
    USERS: (organization: string) => `/organizations/${organization}/users`,
    USERS_REQUESTED: (organization: string) => `/organizations/${organization}/users/requested`,
  },
}

const PUBLIC = {
  AUTH: {
    ROOT: '/auth',
    ERROR: '/auth/error',
    FORGOT_PASSWORD: '/auth/forgot-password',
    PASSKEY: '/auth/passkey',
    SIGN_IN: '/auth/sign-in',
    SIGN_UP: '/auth/sign-up',
    VERIFY_REQUEST: '/auth/verify',
    VERIFY_OTP: '/auth/verify-otp',
    RESET_PASSWORD: '/auth/reset-password',
  },
  HOME: {
    ROOT: '/home',
    ABOUT_US: '/home/about-us',
    CONTACT_US: '/home/contact-us',
    CONTACT_US_SORRY: '/home/contact-us/sorry',
    CONTACT_US_THANKYOU: '/home/contact-us/thankyou',
    FREQUENTLY_ASKED_QUESTIONS: '/home/frequently-ask-questions',
  },
  LEGAL: {
    ROOT: '/legal',
    COOKIES_SETTINGS: '/legal/cookies-settings',
    PRIVACY_POLICY: '/legal/privacy-policy',
    TERMS_CONDITIONS: '/legal/terms-conditions',
  },
  SUPPORT: {
    ROOT: '/support',
    TICKETS: {
      ROOT: '/tickets',
      CREATE: '/tickets/create',
      DETAIL: (ticketId: string) => `/tickets/${ticketId}`,
    },
  },
}
const SOCIAL = {
  FACEBOOK: 'https://facebook.com',
  TWITTER: 'https://twitter.com',
  INSTAGRAM: 'https://instagram.com',
  LINKEDIN: 'https://linkedin.com',
  GITHUB: 'https://github.com',
}

export const PATH = {
  ROOT: '/',
  HANDLER,
  PANEL,
  PUBLIC,
  PROTECTED,
  SOCIAL,
} as const
