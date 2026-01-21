import { CircleAlertIcon } from 'lucide-react'

const ALERT_MESSAGES = {
  HEADING: 'Organization access issues detected:',
  TROUBLESHOOTING_ITEMS: [
    'Ensure you have the correct role and permissions set for your account in the organization settings. Check with your organization administrator if you need role adjustments.',
    "If you're experiencing data synchronization issues, try refreshing your browser session or logging out and back in to reset your connection.",
    "Make sure you're accessing the correct organization. You may be a member of multiple organizations - verify you're in the right one.",
    'When sending invites, ensure the email address is not already associated with another account or pending invitation in the system.',
    'If problems continue, please contact our support team with your organization ID and detailed description of the issue for further assistance.',
  ],
} as const

export default function OrgTroubleshootingAlert() {
  return (
    <div className="h-full w-full p-4">
      <div className="flex gap-4">
        <CircleAlertIcon
          className="mt-0.5 shrink-0"
          size={16}
          aria-hidden="true"
        />
        <div className="0 space-y-1 text-sm">
          <p className="font-medium">{ALERT_MESSAGES.HEADING}</p>
          <ul className="list-inside list-disc">
            {ALERT_MESSAGES.TROUBLESHOOTING_ITEMS.map((item, index) => (
              <li
                className="text-muted-foreground"
                key={index}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
