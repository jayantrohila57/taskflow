import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const BILLING_HISTORY_ITEMS = [
  { id: 1, invoice: '1234', date: '2023-05-15', amount: '29.00' },
  { id: 2, invoice: '1233', date: '2023-04-15', amount: '29.00' },
]

export const BILLING_TEXT = {
  TITLE: 'BILLING_HISTORY',
  DESCRIPTION: 'YOUR_RECENT_INVOICES',
  INVOICE: 'INVOICE',
  DATE: 'DATE',
  AMOUNT: 'AMOUNT',
  VIEW_ALL: 'VIEW_ALL_INVOICES',
}
export const BillingHistoryCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{BILLING_TEXT.TITLE}</CardTitle>
        <CardDescription>{BILLING_TEXT.DESCRIPTION}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {BILLING_HISTORY_ITEMS.map(({ id, invoice, date, amount }) => (
            <div key={id}>
              <p>
                <strong>{`${BILLING_TEXT.INVOICE} #${invoice}`}</strong>
              </p>
              <p>{`${BILLING_TEXT.DATE}: ${date}`}</p>
              <p>{`${BILLING_TEXT.AMOUNT}: $${amount}`}</p>
            </div>
          ))}
          <Button variant="outline">{BILLING_TEXT.VIEW_ALL}</Button>
        </div>
      </CardContent>
    </Card>
  )
}
