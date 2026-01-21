import { ArrowLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export function ThankYou() {
  return (
    <div>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        <CardTitle className="text-2xl">{'Account setup complete!'}</CardTitle>
        <CardDescription className="mt-2">
          {' Thanks for completing the signup process. Your account is now ready to use.'}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Button className="w-full">{'Continue to dashboard'}</Button>
      </CardContent>

      <CardFooter className="flex justify-start">
        <Button variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {' Back to start'}
        </Button>
      </CardFooter>
    </div>
  )
}
