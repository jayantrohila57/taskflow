'use client'

import { useEffect, useState } from 'react'

import { debugError } from '@/lib/utils'

import { sendNotification, subscribeUser, unsubscribeUser } from './pwa.actions'

const TEXT = {
  PUSH_NOTIFICATIONS: 'Push Notifications',
  NOT_SUPPORTED: 'Push notifications are not supported in this browser.',
  SUBSCRIBED: 'You are subscribed to push notifications.',
  UNSUBSCRIBE: 'Unsubscribe',
  ENTER_MESSAGE: 'Enter notification message',
  SEND_TEST: 'Send Test',
  NOT_SUBSCRIBED: 'You are not subscribed to push notifications.',
  SUBSCRIBE: 'Subscribe',
  INSTALL_APP: 'Install App',
  ADD_TO_HOME_SCREEN: 'Add to Home Screen',
  IOS_INSTRUCTIONS: 'To install this app on your iOS device, tap the share button',
  SHARE_ICON: '⎋',
  PLUS_ICON: '➕',
  PERIOD: '.',
}

export function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true)
      void registerServiceWorker()
    }
  }, [])

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      })
      const sub = await registration.pushManager.getSubscription()
      setSubscription(sub)
    } catch (error) {
      debugError('Service Worker registration failed:', error)
    }
  }

  async function subscribeToPush() {
    try {
      const registration = await navigator.serviceWorker.ready
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
      })

      // Extract keys from the PushSubscription
      const rawKey = sub.getKey('p256dh')
      const rawAuthSecret = sub.getKey('auth')

      const key = rawKey ? btoa(String.fromCharCode(...new Uint8Array(rawKey))) : null
      const authSecret = rawAuthSecret ? btoa(String.fromCharCode(...new Uint8Array(rawAuthSecret))) : null

      // Create a new object with the keys
      const subWithKeys = {
        endpoint: sub.endpoint,
        keys: {
          p256dh: key,
          auth: authSecret,
        },
      }
      setSubscription(sub)
      await subscribeUser({
        ...sub,
        keys: {
          p256dh: subWithKeys.keys.p256dh!,
          auth: subWithKeys.keys.auth!,
        },
      })
    } catch (error) {
      debugError('Failed to subscribe to push notifications:', error)
    }
  }

  async function unsubscribeFromPush() {
    try {
      if (subscription) {
        await subscription.unsubscribe()
      }
      setSubscription(null)
      await unsubscribeUser()
    } catch (error) {
      debugError('Failed to unsubscribe from push notifications:', error)
    }
  }

  async function sendTestNotification() {
    try {
      if (subscription) {
        await sendNotification(message)
        setMessage('')
      }
    } catch (error) {
      debugError('Failed to send test notification:', error)
    }
  }

  if (!isSupported) {
    return <p>{TEXT.NOT_SUPPORTED}</p>
  }

  return (
    <div>
      <h3>{TEXT.PUSH_NOTIFICATIONS}</h3>
      {subscription ? (
        <>
          <p>{TEXT.SUBSCRIBED}</p>
          <button onClick={unsubscribeFromPush}>{TEXT.UNSUBSCRIBE}</button>
          <input
            type="text"
            placeholder={TEXT.ENTER_MESSAGE}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendTestNotification}>{TEXT.SEND_TEST}</button>
        </>
      ) : (
        <>
          <p>{TEXT.NOT_SUBSCRIBED}</p>
          <button onClick={subscribeToPush}>{TEXT.SUBSCRIBE}</button>
        </>
      )}
    </div>
  )
}

function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as Window & { MSStream?: unknown }).MSStream)
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
  }, [])

  if (isStandalone) {
    return null
  }

  return (
    <div>
      <h3>{TEXT.INSTALL_APP}</h3>
      <button>{TEXT.ADD_TO_HOME_SCREEN}</button>
      {isIOS && (
        <p>
          {TEXT.IOS_INSTRUCTIONS}
          <span
            role="img"
            aria-label="share icon"
          >
            {TEXT.SHARE_ICON}
          </span>
          {' and then '}
          {TEXT.ADD_TO_HOME_SCREEN}
          <span
            role="img"
            aria-label="plus icon"
          >
            {TEXT.PLUS_ICON}
          </span>
          {TEXT.PERIOD}
        </p>
      )}
    </div>
  )
}

export default function Page() {
  return (
    <div>
      <PushNotificationManager />
      <InstallPrompt />
    </div>
  )
}
