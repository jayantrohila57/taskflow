import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const CURRENT_PLAN = {
  plan: 'Pro',
  price: '29',
  billingCycle: 'Monthly',
  nextBillingDate: '2023-06-15',
}

export const PLAN_TEXT = {
  TITLE: 'CURRENT_PLAN',
  PLAN: 'PLAN',
  PRICE: 'PRICE',
  PER_MONTH: 'month',
  BILLING_CYCLE: 'BILLING_CYCLE',
  NEXT_BILLING_DATE: 'NEXT_BILLING_DATE',
  UPGRADE_PLAN: 'UPGRADE_PLAN',
}

export const CurrentPlanCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{PLAN_TEXT.TITLE}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>
            <strong>
              {PLAN_TEXT.PLAN}
              {':'}
            </strong>{' '}
            {CURRENT_PLAN.plan}
          </p>
          <p>
            <strong>
              {PLAN_TEXT.PRICE}
              {':'}
            </strong>{' '}
            {'$'}
            {CURRENT_PLAN.price}
            {'/'}
            {PLAN_TEXT.PER_MONTH}
          </p>
          <p>
            <strong>
              {PLAN_TEXT.BILLING_CYCLE}
              {':'}
            </strong>{' '}
            {CURRENT_PLAN.billingCycle}
          </p>
          <p>
            <strong>
              {PLAN_TEXT.NEXT_BILLING_DATE}
              {':'}
            </strong>{' '}
            {CURRENT_PLAN.nextBillingDate}
          </p>
          <Button variant="outline">{PLAN_TEXT.UPGRADE_PLAN}</Button>
        </div>
      </CardContent>
    </Card>
  )
}
