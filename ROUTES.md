## Public

| Route Category | Subcategory          | Route                                     |
| -------------- | -------------------- | ----------------------------------------- |
| Root           |                      | `/[locale]/`                              |
| Catch-all      |                      | `/[locale]/[...rest]`                     |
| Auth           | Sign Up              | `/[locale]/auth/sign-up`                  |
|                | Sign In              | `/[locale]/auth/sign-in`                  |
|                | Passkey              | `/[locale]/auth/passkey`                  |
|                | Forgot Password      | `/[locale]/auth/forgot`                   |
|                | Error                | `/[locale]/auth/error`                    |
|                | Verify               | `/[locale]/auth/verify`                   |
| Site           | Home                 | `/[locale]/home`                          |
|                | About Us             | `/[locale]/home/about-us`                 |
|                | Contact Us           | `/[locale]/home/contact-us`               |
|                | Contact Us Sorry     | `/[locale]/home/contact-us/sorry`         |
|                | Contact Us Thank You | `/[locale]/home/contact-us/thankyou`      |
|                | FAQ                  | `/[locale]/home/frequently-ask-questions` |
|                | Feedback             | `/[locale]/feedback`                      |
|                | Support              | `/[locale]/support`                       |
|                | Legal                | `/[locale]/legal`                         |
|                | Cookies Settings     | `/[locale]/legal/cookies-settings`        |
|                | Privacy Policy       | `/[locale]/legal/privacy-policy`          |
|                | Terms & Conditions   | `/[locale]/legal/terms-conditions`        |

## Protected

| Route Category | Subcategory          | Route                                              |
| -------------- | -------------------- | -------------------------------------------------- |
| Organization   | Overview             | `/[locale]/organization`                           |
|                | Onboarding           | `/[locale]/organization/[org]/onboarding`          |
|                | Basic Onboarding     | `/[locale]/organization/[org]/onboarding/basic`    |
|                | Team Onboarding      | `/[locale]/organization/[org]/onboarding/team`     |
|                | Branding Onboarding  | `/[locale]/organization/[org]/onboarding/branding` |
|                | Billing Onboarding   | `/[locale]/organization/[org]/onboarding/billing`  |
|                | Setting Onboarding   | `/[locale]/organization/[org]/onboarding/setting`  |
|                | Settings             | `/[locale]/organization/[org]/settings`            |
| Organizations  | Overview             | `/[locale]/organizations`                          |
|                | Create Organization  | `/[locale]/organizations/create`                   |
|                | My Organizations     | `/[locale]/organizations/list`                     |
|                | Join Organization    | `/[locale]/organizations/join`                     |
|                | Organization Invite  | `/[locale]/organizations/invites`                  |
|                | Organization Request | `/[locale]/organizations/requests`                 |
|                | Billing              | `/[locale]/organizations/billing`                  |
|                | Settings             | `/[locale]/organizations/settings`                 |
| Support        | Tickets              | `/[locale]/tickets`                                |
|                | Create Ticket        | `/[locale]/tickets/create`                         |
|                | Ticket Details       | `/[locale]/tickets/[ticketId]`                     |

## Handler

| Route Category | Subcategory         | Route                                                    |
| -------------- | ------------------- | -------------------------------------------------------- |
| Account        | Overview            | `/[locale]/handler/account`                              |
|                | Billing             | `/[locale]/handler/account/billing`                      |
|                | Profile             | `/[locale]/handler/account/profile`                      |
|                | Session             | `/[locale]/handler/account/session`                      |
|                | Preferences         | `/[locale]/handler/account/preferences`                  |
|                | Settings            | `/[locale]/handler/account/settings`                     |
| Admin          | Dashboard           | `/[locale]/handler/admin/dashboard`                      |
|                | Access Control      | `/[locale]/handler/admin/dashboard/Access-control`       |
|                | Organizations       | `/[locale]/handler/admin/dashboard/organizations`        |
|                | Create Organization | `/[locale]/handler/admin/dashboard/organizations/create` |
|                | Projects            | `/[locale]/handler/admin/dashboard/projects`             |
|                | Roles               | `/[locale]/handler/admin/dashboard/roles`                |
|                | Role Actions        | `/[locale]/handler/admin/dashboard/roles/actions`        |
|                | Role Identity       | `/[locale]/handler/admin/dashboard/roles/identity`       |
|                | Role Permissions    | `/[locale]/handler/admin/dashboard/roles/permissions`    |
|                | Session             | `/[locale]/handler/admin/dashboard/session`              |
|                | Support             | `/[locale]/handler/admin/dashboard/support`              |
|                | Team                | `/[locale]/handler/admin/dashboard/team`                 |
|                | Users               | `/[locale]/handler/admin/dashboard/users`                |
|                | User Details        | `/[locale]/handler/admin/dashboard/users/[id]`           |
|                | User Invite         | `/[locale]/handler/admin/dashboard/users/invite`         |
|                | User Requested      | `/[locale]/handler/admin/dashboard/users/requested`      |

| Route Category | Subcategory            | Route                                        |
| -------------- | ---------------------- | -------------------------------------------- |
| Panel          | Feedback               | `/[locale]/panel/feedback`                   |
|                | Feedback Details       | `/[locale]/panel/feedback/[feedbackId]`      |
|                | Support Tickets        | `/[locale]/panel/support/tickets`            |
|                | Create Support Ticket  | `/[locale]/panel/support/tickets/create`     |
|                | Support Ticket Details | `/[locale]/panel/support/tickets/[ticketId]` |
