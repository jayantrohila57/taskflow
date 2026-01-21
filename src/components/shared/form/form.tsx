import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'
import type { FieldSchema } from './validation/form.validation'
import { createDefaultValues, createDynamicSchema } from './fields/fields'

type FieldConfig = z.infer<typeof FieldSchema>
interface DynamicFormProps {
  schemaList: FieldConfig[]
  onSubmit: (values: Record<string, unknown>) => void
}
export const DynamicForm: React.FC<DynamicFormProps> = ({ schemaList, onSubmit }) => {
  const form = useForm({
    resolver: zodResolver(createDynamicSchema(schemaList)),
    defaultValues: createDefaultValues(schemaList),
  })

  const watch = form.watch()

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {schemaList.map((f) => {
          const { name, label, placeholder, type, options, description } = f.config
          return (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    {type === 'select' && options ? (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={placeholder || 'Select option'} />
                        </SelectTrigger>
                        <SelectContent>
                          {options.map((opt) => (
                            <SelectItem
                              key={opt.value}
                              value={opt.value}
                            >
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        {...field}
                        placeholder={placeholder || ''}
                        type={type}
                      />
                    )}
                  </FormControl>
                  <FormDescription>{description}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        })}
        <Button type="submit">{'Submit'}</Button>
      </form>
      <div className="p-4">
        <pre className="text-sm break-words whitespace-pre-wrap">{JSON.stringify(watch, null, 2)}</pre>
      </div>
    </Form>
  )
}
