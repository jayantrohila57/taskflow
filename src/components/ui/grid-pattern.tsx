import { useId } from 'react'

import { cn } from '@/lib/utils'

interface GridPatternProps {
  width?: number
  height?: number
  x?: number
  y?: number
  squares?: Array<[x: number, y: number]>
  strokeDasharray?: string
  className?: string
  [key: string]: unknown
}

function GridPattern({
  width = 80,
  height = 80,
  x = -1,
  y = -1,
  strokeDasharray = '0',
  squares,
  className,
  ...props
}: GridPatternProps) {
  const id = useId()

  return (
    <svg
      aria-hidden="true"
      className={cn('fill-primary/40 stroke-muted pointer-events-none absolute inset-0 z-0 h-full w-full', className)}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect
        key={Math.random().toString(36).substring(2, 9)}
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${id})`}
      />
      {squares && (
        <svg
          x={x}
          y={y}
          className="overflow-visible"
        >
          {squares.map(([x, y]) => (
            <rect
              strokeWidth="0"
              key={Math.random().toString(36).substring(2, 9)}
              width={width - 1}
              height={height - 1}
              x={x * width + 1}
              y={y * height + 1}
            />
          ))}
        </svg>
      )}
    </svg>
  )
}

export { GridPattern }
