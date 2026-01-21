'use client'

import type { UseFormReturn } from 'react-hook-form'
import type { OrganizationFormValues } from '../organization-edit.form'
import { useFieldArray } from 'react-hook-form'
import { Check, ChevronsUpDown, Plus, Trash2 } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { messages } from '@/lib/messages'

interface Address {
  id: string
  title: string
  addressLine1: string
  addressLine2?: string | null
  city: string
  state?: string | null
  postalCode: string
  country: string
  isPrimary: boolean
  typeId: string
}

interface AddressTypeOption {
  value: string
  label: string
  icon?: React.ReactNode
}

interface AddressesSectionProps {
  form: UseFormReturn<OrganizationFormValues>
  typeOptions: AddressTypeOption[]
}

export function AddressesSection({ form, typeOptions }: AddressesSectionProps) {
  const {
    fields: addresses,
    append: appendAddress,
    remove: removeAddress,
  } = useFieldArray({
    control: form.control,
    name: 'addresses',
  })

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{messages.FORM_SECTIONS.ADDRESSES.TITLE}</CardTitle>
        <CardDescription>{messages.FORM_SECTIONS.ADDRESSES.DESCRIPTION}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {addresses && addresses.length > 0 ? (
          <div className="space-y-6">
            {addresses.map((address, index) => (
              <div
                key={address.id}
                className="rounded-md border p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="font-medium">
                    {messages.FORM_SECTIONS.ADDRESSES.ADDRESS_TITLE} {index + 1}
                  </h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeAddress(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">{messages.COMMON.REMOVE}</span>
                  </Button>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name={`addresses.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{messages.FORM_SECTIONS.ADDRESSES.TITLE_LABEL}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={messages.FORM_SECTIONS.ADDRESSES.TITLE_PLACEHOLDER}
                              {...field}
                              value={field.value || ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`addresses.${index}.typeId`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>{messages.FORM_SECTIONS.ADDRESSES.TYPE}</FormLabel>
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
                                    messages.FORM_SECTIONS.ADDRESSES.TYPE_PLACEHOLDER
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
                                          form.setValue(`addresses.${index}.typeId`, type.value)
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            'mr-2 h-4 w-4',
                                            field.value === type.value ? 'opacity-100' : 'opacity-0',
                                          )}
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name={`addresses.${index}.addressLine1`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{messages.FORM_SECTIONS.ADDRESSES.ADDRESS_LINE_1}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={messages.FORM_SECTIONS.ADDRESSES.ADDRESS_LINE_1_PLACEHOLDER}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`addresses.${index}.addressLine2`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{messages.FORM_SECTIONS.ADDRESSES.ADDRESS_LINE_2}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={messages.FORM_SECTIONS.ADDRESSES.ADDRESS_LINE_2_PLACEHOLDER}
                            {...field}
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name={`addresses.${index}.city`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{messages.FORM_SECTIONS.ADDRESSES.CITY}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={messages.FORM_SECTIONS.ADDRESSES.CITY_PLACEHOLDER}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`addresses.${index}.state`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{messages.FORM_SECTIONS.ADDRESSES.STATE}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={messages.FORM_SECTIONS.ADDRESSES.STATE_PLACEHOLDER}
                              {...field}
                              value={field.value || ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name={`addresses.${index}.postalCode`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{messages.FORM_SECTIONS.ADDRESSES.POSTAL_CODE}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={messages.FORM_SECTIONS.ADDRESSES.POSTAL_CODE_PLACEHOLDER}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`addresses.${index}.country`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{messages.FORM_SECTIONS.ADDRESSES.COUNTRY}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={messages.FORM_SECTIONS.ADDRESSES.COUNTRY_PLACEHOLDER}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name={`addresses.${index}.isPrimary`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>{messages.FORM_SECTIONS.ADDRESSES.PRIMARY}</FormLabel>
                          <FormDescription>{messages.FORM_SECTIONS.ADDRESSES.PRIMARY_DESCRIPTION}</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-[100px] items-center justify-center rounded-md border border-dashed">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">{messages.FORM_SECTIONS.ADDRESSES.NO_ADDRESSES}</p>
            </div>
          </div>
        )}

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() =>
            appendAddress({
              id: `temp-${Date.now()}`, // Assign a temporary unique ID
              title: '',
              addressLine1: '',
              addressLine2: '',
              city: '',
              state: '',
              postalCode: '',
              country: '',
              isPrimary: false,
              typeId: '',
            })
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          {messages.FORM_SECTIONS.ADDRESSES.ADD}
        </Button>
      </CardContent>
    </Card>
  )
}
