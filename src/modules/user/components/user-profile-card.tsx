'use client'

import { format } from 'date-fns'
import { AlertTriangle, Calendar, CheckCircle, Clock, Mail, User as UserIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { UserTypes } from '../validation/user.validation'

interface UserProfileCardProps {
  user: UserTypes['UserWithFullDetails']
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  const t = useTranslations('USER_DETAIL')

  const getInitials = (name: string) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  const getVerificationStatus = () => {
    if (user.emailVerified) {
      return (
        <Badge
          variant="outline"
          className="flex items-center gap-1 bg-green-100 text-green-800"
        >
          <CheckCircle className="h-4 w-4" /> {t('VERIFIED')}
        </Badge>
      )
    }
    return (
      <Badge
        variant="destructive"
        className="flex items-center gap-1"
      >
        <AlertTriangle className="h-4 w-4" /> {t('NOT_VERIFIED')}
      </Badge>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{t('PROFILE_CARD.TITLE')}</CardTitle>
        <CardDescription className="text-muted-foreground">{t('PROFILE_CARD.DESCRIPTION')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-6">
          <Avatar className="h-24 w-24 rounded-2xl border-2">
            <AvatarImage
              src={user.image || ''}
              alt={user.name || 'User'}
            />
            <AvatarFallback className="text-2xl font-semibold">{getInitials(user.name || '')}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-foreground text-2xl font-bold">{user.name || 'Unknown User'}</h3>
            <p className="text-muted-foreground mt-1">{user.email || 'No email provided'}</p>
            <div className="mt-2">{getVerificationStatus()}</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="bg-muted/50 flex items-center rounded-lg p-3">
            <UserIcon className="text-primary mr-3 h-5 w-5" />
            <div>
              <span className="text-muted-foreground text-sm font-medium">{t('NAME')}</span>
              <p className="text-foreground font-medium">{user.name || t('NOT_PROVIDED')}</p>
            </div>
          </div>
          <div className="bg-muted/50 flex items-center rounded-lg p-3">
            <Mail className="text-primary mr-3 h-5 w-5" />
            <div>
              <span className="text-muted-foreground text-sm font-medium">{t('EMAIL')}</span>
              <p className="text-foreground font-medium">{user.email || t('NOT_PROVIDED')}</p>
            </div>
          </div>
          <div className="bg-muted/50 flex items-center rounded-lg p-3">
            <Calendar className="text-primary mr-3 h-5 w-5" />
            <div>
              <span className="text-muted-foreground text-sm font-medium">{t('CREATED')}</span>
              <p className="text-foreground font-medium">
                {user.createdAt ? format(new Date(user.createdAt), 'PPpp') : t('UNKNOWN')}
              </p>
            </div>
          </div>
          <div className="bg-muted/50 flex items-center rounded-lg p-3">
            <Clock className="text-primary mr-3 h-5 w-5" />
            <div>
              <span className="text-muted-foreground text-sm font-medium">{t('UPDATED')}</span>
              <p className="text-foreground font-medium">
                {user.updatedAt ? format(new Date(user.updatedAt), 'PPpp') : t('UNKNOWN')}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
