'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

const TEXT = {
  TITLE: 'WORKSPACE_SETTINGS',
  NAME_LABEL: 'WORKSPACE_NAME',
  NAME_PLACEHOLDER: 'MY_WORKSPACE',
  URL_LABEL: 'WORKSPACE_URL',
  URL_PLACEHOLDER: 'my-workspace',
  PUBLIC_LABEL: 'MAKE_WORKSPACE_PUBLIC',
  SAVE: 'SAVE_SETTINGS',
}

const WorkspaceSettingsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{TEXT.TITLE}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="workspaceName">{TEXT.NAME_LABEL}</Label>
            <Input
              id="workspaceName"
              placeholder={TEXT.NAME_PLACEHOLDER}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="workspaceUrl">{TEXT.URL_LABEL}</Label>
            <Input
              id="workspaceUrl"
              placeholder={TEXT.URL_PLACEHOLDER}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="publicWorkspace" />
            <Label htmlFor="publicWorkspace">{TEXT.PUBLIC_LABEL}</Label>
          </div>
          <Button type="submit">{TEXT.SAVE}</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default WorkspaceSettingsCard
