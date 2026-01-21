import LoadingComponent from '@/components/shared/pages/loading-page'
import { HydrateClient } from '@/packages/trpc/server'

export default function LoadingPage() {
  return (
    <HydrateClient>
      <LoadingComponent />
    </HydrateClient>
  )
}
