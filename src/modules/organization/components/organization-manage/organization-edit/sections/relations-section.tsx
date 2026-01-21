'use client'

import type { UseFormReturn } from 'react-hook-form'
import type { OrganizationFormValues } from '../organization-edit.form'
import { Building2, Check, ChevronsUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList, CommandItem } from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { messages } from '@/lib/messages'
import type { ReactNode } from 'react' // Import ReactNode

// Define interfaces for the expected structure of select options.
interface StatusOption {
  value: string
  label: string
  color: string
}

interface CategorizationOption {
  value: string
  label: string
  icon?: ReactNode // Use ReactNode for icon type
}

interface SizeOption {
  value: string
  label: string
  description?: string
}

interface RelationsSectionProps {
  form: UseFormReturn<OrganizationFormValues>
  statusOptions: StatusOption[]
  typeOptions: CategorizationOption[]
  categoryOptions: CategorizationOption[]
  industryOptions: CategorizationOption[]
  sizeOptions: SizeOption[]
}

export function RelationsSection({
  form,
  statusOptions,
  typeOptions,
  categoryOptions,
  industryOptions,
  sizeOptions,
}: RelationsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{messages.FORM_SECTIONS.RELATIONS.TITLE}</CardTitle>
        <CardDescription>{messages.FORM_SECTIONS.RELATIONS.DESCRIPTION}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="statusId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{messages.FORM_SECTIONS.RELATIONS.STATUS}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
                      >
                        {field.value ? (
                          <>
                            <div
                              className="mr-2 h-4 w-4 rounded-full"
                              style={{
                                backgroundColor:
                                  statusOptions.find((status) => status.value === field.value)?.color || '#888',
                              }}
                            />
                            {statusOptions.find((status) => status.value === field.value)?.label}
                          </>
                        ) : (
                          messages.FORM_SECTIONS.RELATIONS.STATUS_PLACEHOLDER
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder={messages.SEARCH.SEARCH_STATUS} />
                      <CommandList>
                        <CommandEmpty>{messages.SEARCH.NO_STATUS}</CommandEmpty>
                        <CommandGroup>
                          {statusOptions.map((status) => (
                            <CommandItem
                              key={status.value}
                              value={status.value}
                              onSelect={() => {
                                form.setValue('statusId', status.value)
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  field.value === status.value ? 'opacity-100' : 'opacity-0',
                                )}
                              />
                              <div className="flex items-center">
                                <div
                                  className="mr-2 h-4 w-4 rounded-full"
                                  style={{ backgroundColor: status.color }}
                                />
                                <span>{status.label}</span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>{messages.FORM_SECTIONS.RELATIONS.STATUS_DESCRIPTION}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="typeId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{messages.FORM_SECTIONS.RELATIONS.TYPE}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
                      >
                        {field.value ? (
                          <>
                            {typeOptions.find((type) => type.value === field.value)?.icon}
                            {typeOptions.find((type) => type.value === field.value)?.label}
                          </>
                        ) : (
                          messages.FORM_SECTIONS.RELATIONS.TYPE_PLACEHOLDER
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder={messages.SEARCH.SEARCH_TYPE} />
                      <CommandList>
                        <CommandEmpty>{messages.SEARCH.NO_TYPE}</CommandEmpty>
                        <CommandGroup>
                          {typeOptions.map((type) => (
                            <CommandItem
                              key={type.value}
                              value={type.value}
                              onSelect={() => {
                                form.setValue('typeId', type.value)
                              }}
                            >
                              <Check
                                className={cn('mr-2 h-4 w-4', field.value === type.value ? 'opacity-100' : 'opacity-0')}
                              />
                              <div className="flex items-center">
                                {type.icon}
                                <span>{type.label}</span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>{messages.FORM_SECTIONS.RELATIONS.TYPE_DESCRIPTION}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{messages.FORM_SECTIONS.RELATIONS.CATEGORY}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
                      >
                        {field.value ? (
                          <>
                            {categoryOptions.find((category) => category.value === field.value)?.icon}
                            {categoryOptions.find((category) => category.value === field.value)?.label}
                          </>
                        ) : (
                          messages.FORM_SECTIONS.RELATIONS.CATEGORY_PLACEHOLDER
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder={messages.SEARCH.SEARCH_CATEGORY} />
                      <CommandList>
                        <CommandEmpty>{messages.SEARCH.NO_CATEGORY}</CommandEmpty>
                        <CommandGroup>
                          {categoryOptions.map((category) => (
                            <CommandItem
                              key={category.value}
                              value={category.value}
                              onSelect={() => {
                                form.setValue('categoryId', category.value)
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  field.value === category.value ? 'opacity-100' : 'opacity-0',
                                )}
                              />
                              <div className="flex items-center">
                                {category.icon}
                                <span>{category.label}</span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>{messages.FORM_SECTIONS.RELATIONS.CATEGORY_DESCRIPTION}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industryId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{messages.FORM_SECTIONS.RELATIONS.INDUSTRY}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
                      >
                        {field.value ? (
                          <>
                            {industryOptions.find((industry) => industry.value === field.value)?.icon}
                            {industryOptions.find((industry) => industry.value === field.value)?.label}
                          </>
                        ) : (
                          messages.FORM_SECTIONS.RELATIONS.INDUSTRY_PLACEHOLDER
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder={messages.SEARCH.SEARCH_INDUSTRY} />
                      <CommandList>
                        <CommandEmpty>{messages.SEARCH.NO_INDUSTRY}</CommandEmpty>
                        <CommandGroup>
                          {industryOptions.map((industry) => (
                            <CommandItem
                              key={industry.value}
                              value={industry.value}
                              onSelect={() => {
                                form.setValue('industryId', industry.value)
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  field.value === industry.value ? 'opacity-100' : 'opacity-0',
                                )}
                              />
                              <div className="flex items-center">
                                {industry.icon}
                                <span>{industry.label}</span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>{messages.FORM_SECTIONS.RELATIONS.INDUSTRY_DESCRIPTION}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="organizationSizeId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{messages.FORM_SECTIONS.RELATIONS.SIZE}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
                    >
                      {field.value ? (
                        <>
                          <Building2 className="text-muted-foreground mr-2 h-4 w-4" />
                          {sizeOptions.find((size) => size.value === field.value)?.label}
                        </>
                      ) : (
                        <>
                          <Building2 className="text-muted-foreground mr-2 h-4 w-4" />
                          {messages.FORM_SECTIONS.RELATIONS.SIZE_PLACEHOLDER}
                        </>
                      )}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder={messages.SEARCH.SEARCH_SIZE} />
                    <CommandList>
                      <CommandEmpty>{messages.SEARCH.NO_SIZE}</CommandEmpty>
                      <CommandGroup>
                        {sizeOptions.map((size) => (
                          <CommandItem
                            key={size.value}
                            value={size.value}
                            onSelect={() => {
                              form.setValue('organizationSizeId', size.value)
                            }}
                          >
                            <Check
                              className={cn('mr-2 h-4 w-4', field.value === size.value ? 'opacity-100' : 'opacity-0')}
                            />
                            <Building2 className="text-muted-foreground mr-2 h-4 w-4" />
                            {size.label}
                            <span className="text-muted-foreground ml-2">{size.description}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>{messages.FORM_SECTIONS.RELATIONS.SIZE_DESCRIPTION}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}
