import Shell from '@/components/shared/shell/shell'
import LoadingComponent from '@/components/shared/pages/loading-page'

export default async function OrganizationLoadingPage() {
  return (
    <Shell>
      <Shell.Section variant="center">
        <LoadingComponent />
      </Shell.Section>
    </Shell>
  )
}
