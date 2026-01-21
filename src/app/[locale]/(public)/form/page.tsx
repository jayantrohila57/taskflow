'use client'

import { type z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldSchema } from '@/components/shared/form/validation/form.validation'
import { debugLog } from '@/lib/utils'
import { DynamicForm } from '@/components/shared/form/form'

type FieldFormValues = z.infer<typeof FieldSchema>

export default function FieldForm() {
  const form = useForm<FieldFormValues>({
    resolver: zodResolver(FieldSchema),
    defaultValues: {
      config: {
        label: '',
        name: '',
        description: '',
        type: 'text',
        options: [
          {
            suffix: '',
            prefix: '',
            label: '',
            value: '',
          },
        ],
        placeholder: '',
      },
      ui: {},
      validation: {
        isRequired: false,
      },
    },
  })

  const values = form.watch()

  const onSubmit = (data: FieldFormValues) => {
    debugLog('Submitted', data)
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-10 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>{'Form'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="config.label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{'Label'}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="config.description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{'Description'}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="config.placeholder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{'Placeholder'}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">{'Submit'}</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{'Form JSON'}</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-sm break-words whitespace-pre-wrap">{JSON.stringify(values, null, 2)}</pre>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{'Field preview'}</CardTitle>
        </CardHeader>
        <CardContent>
          <DynamicForm
            schemaList={[values]}
            onSubmit={() => debugLog('Submitted', values)}
          />
        </CardContent>
      </Card>
    </div>
  )
}
