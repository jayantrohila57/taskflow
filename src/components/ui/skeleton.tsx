import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-muted relative overflow-hidden rounded-md', className)}
      {...props}
    >
      <div className="animate-shimmer via-secondary-foreground absolute inset-0 bg-gradient-to-r from-transparent to-transparent" />
    </div>
  )
}

export { Skeleton }
