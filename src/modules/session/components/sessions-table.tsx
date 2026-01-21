'use client'

import { format, formatDistanceToNow } from 'date-fns'
import { ArrowUpDown, Clock, Filter, MoreHorizontal, RefreshCw, Search, Shield, X } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useRouter } from '@/packages/next-intl/utils/navigation'
import { debugError } from '@/lib/utils'
// Mock data for the sessions table
// In a real application, this would come from Prisma
const LITERALS = {
  SEARCH_PLACEHOLDER: 'Search sessions...',
  STATUS_PLACEHOLDER: 'Status',
  STATUS_ALL: 'All',
  STATUS_ACTIVE: 'Active',
  STATUS_ENDED: 'Ended',
  STATUS_REVOKED: 'Revoked',
  REVOKE_SELECTED: 'Revoke {count} selected',
  SELECT_ALL_SESSIONS: 'Select all sessions',
  USER: 'User',
  DEVICE_LOCATION: 'Device / Location',
  CREATED: 'Created',
  LAST_ACTIVE: 'Last Active',
  STATUS: 'Status',
  NO_SESSIONS_FOUND: 'No sessions found.',
  UNKNOWN_DEVICE: 'Unknown device',
  UNKNOWN_IP: 'Unknown IP',
  REVOKED: 'Revoked',
  ENDED: 'Ended',
  ACTIVE: 'Active',
  OPEN_MENU: 'Open menu',
  REVOKE_SESSION: 'Revoke Session',
  REVOKE_DIALOG_TITLE: 'Revoke Session',
  REVOKE_DIALOG_DESCRIPTION:
    "This will immediately terminate the user's session and they will need to log in again. This action cannot be undone.",
  CANCEL: 'Cancel',
  REVOKING: 'Revoking...',
}
export const sessions = [
  {
    id: 'sess_1',
    userId: 'user_1',
    userEmail: 'john.doe@example.com',
    userName: 'John Doe',
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    lastActive: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    isRevoked: false,
    endedAt: null,
  },
  {
    id: 'sess_2',
    userId: 'user_2',
    userEmail: 'jane.smith@example.com',
    userName: 'Jane Smith',
    ipAddress: '192.168.1.2',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15',
    lastActive: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    isRevoked: false,
    endedAt: null,
  },
  {
    id: 'sess_3',
    userId: 'user_3',
    userEmail: 'robert.johnson@example.com',
    userName: 'Robert Johnson',
    ipAddress: '192.168.1.3',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    lastActive: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    isRevoked: true,
    endedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: 'sess_4',
    userId: 'user_4',
    userEmail: 'emily.davis@example.com',
    userName: 'Emily Davis',
    ipAddress: '192.168.1.4',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
    lastActive: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96), // 4 days ago
    isRevoked: false,
    endedAt: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hours ago
  },
  {
    id: 'sess_5',
    userId: 'user_5',
    userEmail: 'michael.wilson@example.com',
    userName: 'Michael Wilson',
    ipAddress: '192.168.1.5',
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15',
    lastActive: new Date(Date.now() - 1000 * 60 * 3), // 3 minutes ago
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    isRevoked: false,
    endedAt: null,
  },
  {
    id: 'sess_6',
    userId: 'user_1',
    userEmail: 'john.doe@example.com',
    userName: 'John Doe',
    ipAddress: '192.168.1.6',
    userAgent: 'Mozilla/5.0 (Android 10; Mobile) AppleWebKit/537.36',
    lastActive: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 days ago
    isRevoked: false,
    endedAt: null,
  },
]

export async function getSessionStats() {
  // This would be implemented with actual Prisma queries
  // For now, we'll return mock data
  return {
    activeSessions: 245,
    activeSessionsChange: 12,
    revokedSessions: 18,
    revokedSessionsChange: -5,
    avgSessionDuration: '3h 24m',
    avgSessionDurationChange: 8,
    sessionActivity: '1.2k',
    sessionActivityChange: 15,
  }
}

async function revokeSession(sessionId: string, reason: string) {
  try {
    return { success: true, sessionId, reason }
  } catch (error) {
    debugError('Failed to revoke session:', error)
    return { success: false, error: 'Failed to revoke session' }
  }
}

export function SessionsTable() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedSessions, setSelectedSessions] = useState<string[]>([])
  const [isRevokeDialogOpen, setIsRevokeDialogOpen] = useState(false)
  const [sessionToRevoke, setSessionToRevoke] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const filteredSessions = sessions.filter((session) => {
    // Apply search filter
    const matchesSearch =
      session.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.ipAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.id.toLowerCase().includes(searchTerm.toLowerCase())

    // Apply status filter
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && !session.isRevoked && !session.endedAt) ||
      (statusFilter === 'ended' && session.endedAt) ||
      (statusFilter === 'revoked' && session.isRevoked)

    return matchesSearch && matchesStatus
  })

  const handleSelectAll = () => {
    if (selectedSessions.length === filteredSessions.length) {
      setSelectedSessions([])
    } else {
      setSelectedSessions(filteredSessions.map((session) => session.id))
    }
  }

  const handleSelectSession = (sessionId: string) => {
    if (selectedSessions.includes(sessionId)) {
      setSelectedSessions(selectedSessions.filter((id) => id !== sessionId))
    } else {
      setSelectedSessions([...selectedSessions, sessionId])
    }
  }

  const openRevokeDialog = (sessionId: string) => {
    setSessionToRevoke(sessionId)
    setIsRevokeDialogOpen(true)
  }

  const handleRevokeSession = async () => {
    if (!sessionToRevoke) return

    setIsLoading(true)
    try {
      await revokeSession(sessionToRevoke, 'Manually revoked by administrator')
      router.refresh()
    } catch (error) {
      debugError('Failed to revoke session:', error)
    } finally {
      setIsLoading(false)
      setIsRevokeDialogOpen(false)
      setSessionToRevoke(null)
    }
  }

  const handleBulkRevoke = async () => {
    setIsLoading(true)
    try {
      // This would be implemented as a server action
      // await revokeSessions(selectedSessions, "Bulk revocation by administrator")
      router.refresh()
    } catch (error) {
      debugError('Failed to revoke sessions:', error)
    } finally {
      setIsLoading(false)
      setSelectedSessions([])
    }
  }

  const refreshData = () => {
    router.refresh()
  }
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
            <Input
              placeholder={LITERALS.SEARCH_PLACEHOLDER}
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-muted-foreground h-4 w-4" />
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder={LITERALS.STATUS_PLACEHOLDER} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{LITERALS.STATUS_ALL}</SelectItem>
                <SelectItem value="active">{LITERALS.STATUS_ACTIVE}</SelectItem>
                <SelectItem value="ended">{LITERALS.STATUS_ENDED}</SelectItem>
                <SelectItem value="revoked">{LITERALS.STATUS_REVOKED}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {selectedSessions.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleBulkRevoke}
              disabled={isLoading}
            >
              {LITERALS.REVOKE_SELECTED.replace('{count}', selectedSessions.length.toString())}
            </Button>
          )}
          <Button
            variant="outline"
            size="icon"
            onClick={refreshData}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <Checkbox
                    checked={selectedSessions.length === filteredSessions.length && filteredSessions.length > 0}
                    onCheckedChange={handleSelectAll}
                    aria-label={LITERALS.SELECT_ALL_SESSIONS}
                  />
                </TableHead>
                <TableHead className="w-[200px]">
                  <div className="flex items-center">
                    {LITERALS.USER}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-8 p-0"
                    >
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </div>
                </TableHead>
                <TableHead>{LITERALS.DEVICE_LOCATION}</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    {LITERALS.CREATED}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-8 p-0"
                    >
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    {LITERALS.LAST_ACTIVE}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-8 p-0"
                    >
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </div>
                </TableHead>
                <TableHead>{LITERALS.STATUS}</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSessions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-24 text-center"
                  >
                    {LITERALS.NO_SESSIONS_FOUND}
                  </TableCell>
                </TableRow>
              ) : (
                filteredSessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedSessions.includes(session.id)}
                        onCheckedChange={() => handleSelectSession(session.id)}
                        aria-label={`Select session ${session.id}`}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{session.userName}</div>
                      <div className="text-muted-foreground text-sm">{session.userEmail}</div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[300px] truncate text-sm">
                        {session.userAgent || LITERALS.UNKNOWN_DEVICE}
                      </div>
                      <div className="text-muted-foreground text-sm">{session.ipAddress || LITERALS.UNKNOWN_IP}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{format(session.createdAt, 'MMM d, yyyy')}</div>
                      <div className="text-muted-foreground text-xs">{format(session.createdAt, 'h:mm a')}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="text-muted-foreground h-3 w-3" />
                        {formatDistanceToNow(session.lastActive, {
                          addSuffix: true,
                        })}
                      </div>
                    </TableCell>
                    <TableCell>
                      {session.isRevoked ? (
                        <Badge
                          variant="destructive"
                          className="flex items-center gap-1"
                        >
                          <Shield className="h-3 w-3" /> {LITERALS.REVOKED}
                        </Badge>
                      ) : session.endedAt ? (
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <X className="h-3 w-3" /> {LITERALS.ENDED}
                        </Badge>
                      ) : (
                        <Badge className="flex items-center gap-1 bg-green-100 text-green-800">{LITERALS.ACTIVE}</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">{LITERALS.OPEN_MENU}</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => openRevokeDialog(session.id)}
                            disabled={session.isRevoked}
                            className={session.isRevoked ? 'text-muted-foreground' : 'text-destructive'}
                          >
                            {LITERALS.REVOKE_SESSION}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={isRevokeDialogOpen}
        onOpenChange={setIsRevokeDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{LITERALS.REVOKE_DIALOG_TITLE}</DialogTitle>
            <DialogDescription>{LITERALS.REVOKE_DIALOG_DESCRIPTION}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRevokeDialogOpen(false)}
            >
              {LITERALS.CANCEL}
            </Button>
            <Button
              variant="destructive"
              onClick={handleRevokeSession}
              disabled={isLoading}
            >
              {isLoading ? LITERALS.REVOKING : LITERALS.REVOKE_SESSION}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
