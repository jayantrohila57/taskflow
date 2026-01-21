import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
// data/payment.ts
export const PAYMENT_METHOD = {
  currentMethod: 'Visa ending in 1234',
  expiration: '12/2025',
}

// literals/payment.ts
export const PAYMENT_TEXT = {
  TITLE: 'PAYMENT_METHOD',
  CURRENT_METHOD: 'CURRENT_METHOD',
  EXPIRATION: 'EXPIRATION',
  UPDATE_METHOD: 'UPDATE_PAYMENT_METHOD',
}

export const PaymentMethodCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{PAYMENT_TEXT.TITLE}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>
            <strong>
              {PAYMENT_TEXT.CURRENT_METHOD}
              {':'}
            </strong>{' '}
            {PAYMENT_METHOD.currentMethod}
          </p>
          <p>
            <strong>
              {PAYMENT_TEXT.EXPIRATION}
              {':'}
            </strong>{' '}
            {PAYMENT_METHOD.expiration}
          </p>
          <Button variant="outline">{PAYMENT_TEXT.UPDATE_METHOD}</Button>
        </div>
      </CardContent>
    </Card>
  )
}
