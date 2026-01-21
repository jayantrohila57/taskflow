import { debugLog } from '@/lib/utils'

// Initialize analytics before the app starts
debugLog('Analytics initialized')

// Set up global error tracking
window.addEventListener('error', (event) => {
  // Send to your error tracking service
  reportError(event.error)
})
