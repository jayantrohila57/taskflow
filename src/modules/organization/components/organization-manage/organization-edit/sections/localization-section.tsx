'use client'

import type { UseFormReturn } from 'react-hook-form'
import type { OrganizationFormValues } from '../organization-edit.form'
import { Calendar, Check, ChevronsUpDown, Clock, Coins, Globe, Languages } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList, CommandItem } from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { messages } from '@/lib/messages'

// Define an interface for the expected structure of select options.
interface SelectOption {
  value: string
  label: string
  symbol?: string // For currency options
  example?: string // For date and time format options
}

interface LocalizationSectionProps {
  form: UseFormReturn<OrganizationFormValues>
  timezoneOptions: SelectOption[]
  languageOptions: SelectOption[]
  currencyOptions: SelectOption[]
  dateFormatOptions: SelectOption[]
  timeFormatOptions: SelectOption[]
}

export function LocalizationSection({
  form,
  timezoneOptions,
  languageOptions,
  currencyOptions,
  dateFormatOptions,
  timeFormatOptions,
}: LocalizationSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{messages.FORM_SECTIONS.LOCALIZATION.TITLE}</CardTitle>
        <CardDescription>{messages.FORM_SECTIONS.LOCALIZATION.DESCRIPTION}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="timezone"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{messages.FORM_SECTIONS.LOCALIZATION.TIMEZONE}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
                      >
                        <Globe className="text-muted-foreground mr-2 h-4 w-4" />
                        {field.value
                          ? timezoneOptions.find((timezone) => timezone.value === field.value)?.label
                          : messages.FORM_SECTIONS.LOCALIZATION.TIMEZONE_PLACEHOLDER}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder={messages.SEARCH.SEARCH_TIMEZONE} />
                      <CommandList>
                        <CommandEmpty>{messages.SEARCH.NO_TIMEZONE}</CommandEmpty>
                        <CommandGroup className="max-h-[300px] overflow-auto">
                          {timezoneOptions.map((timezone) => (
                            <CommandItem
                              key={timezone.value}
                              value={timezone.value}
                              onSelect={() => {
                                form.setValue('timezone', timezone.value)
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  field.value === timezone.value ? 'opacity-100' : 'opacity-0',
                                )}
                              />
                              <Globe className="text-muted-foreground mr-2 h-4 w-4" />
                              {timezone.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>{messages.FORM_SECTIONS.LOCALIZATION.TIMEZONE_DESCRIPTION}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{messages.FORM_SECTIONS.LOCALIZATION.LANGUAGE}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
                      >
                        <Languages className="text-muted-foreground mr-2 h-4 w-4" />
                        {field.value
                          ? languageOptions.find((language) => language.value === field.value)?.label
                          : messages.FORM_SECTIONS.LOCALIZATION.LANGUAGE_PLACEHOLDER}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder={messages.SEARCH.SEARCH_LANGUAGE} />
                      <CommandList>
                        <CommandEmpty>{messages.SEARCH.NO_LANGUAGE}</CommandEmpty>
                        <CommandGroup className="max-h-[300px] overflow-auto">
                          {languageOptions.map((language) => (
                            <CommandItem
                              key={language.value}
                              value={language.value}
                              onSelect={() => {
                                form.setValue('language', language.value)
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  field.value === language.value ? 'opacity-100' : 'opacity-0',
                                )}
                              />
                              <Languages className="text-muted-foreground mr-2 h-4 w-4" />
                              {language.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>{messages.FORM_SECTIONS.LOCALIZATION.LANGUAGE_DESCRIPTION}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{messages.FORM_SECTIONS.LOCALIZATION.CURRENCY}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
                    >
                      <Coins className="text-muted-foreground mr-2 h-4 w-4" />
                      {field.value
                        ? currencyOptions.find((currency) => currency.value === field.value)?.label
                        : messages.FORM_SECTIONS.LOCALIZATION.CURRENCY_PLACEHOLDER}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder={messages.SEARCH.SEARCH_CURRENCY} />
                    <CommandList>
                      <CommandEmpty>{messages.SEARCH.NO_CURRENCY}</CommandEmpty>
                      <CommandGroup className="max-h-[300px] overflow-auto">
                        {currencyOptions.map((currency) => (
                          <CommandItem
                            key={currency.value}
                            value={currency.value}
                            onSelect={() => {
                              form.setValue('currency', currency.value)
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                field.value === currency.value ? 'opacity-100' : 'opacity-0',
                              )}
                            />
                            <div className="flex items-center">
                              <Coins className="text-muted-foreground mr-2 h-4 w-4" />
                              <span>{currency.label}</span>
                              <span className="bg-muted ml-2 rounded-md px-2 py-0.5 text-xs font-medium">
                                {currency.symbol}
                              </span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>{messages.FORM_SECTIONS.LOCALIZATION.CURRENCY_DESCRIPTION}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="dateFormat"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{messages.FORM_SECTIONS.LOCALIZATION.DATE_FORMAT}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
                      >
                        <Calendar className="text-muted-foreground mr-2 h-4 w-4" />
                        {field.value
                          ? dateFormatOptions.find((format) => format.value === field.value)?.label
                          : messages.FORM_SECTIONS.LOCALIZATION.DATE_FORMAT_PLACEHOLDER}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder={messages.SEARCH.SEARCH_DATE_FORMAT} />
                      <CommandList>
                        <CommandEmpty>{messages.SEARCH.NO_FORMAT}</CommandEmpty>
                        <CommandGroup>
                          {dateFormatOptions.map((format) => (
                            <CommandItem
                              key={format.value}
                              value={format.value}
                              onSelect={() => {
                                form.setValue('dateFormat', format.value)
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  field.value === format.value ? 'opacity-100' : 'opacity-0',
                                )}
                              />
                              <Calendar className="text-muted-foreground mr-2 h-4 w-4" />
                              {format.label}
                              <span className="text-muted-foreground ml-2">{format.example}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>{messages.FORM_SECTIONS.LOCALIZATION.DATE_FORMAT_DESCRIPTION}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timeFormat"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{messages.FORM_SECTIONS.LOCALIZATION.TIME_FORMAT}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
                      >
                        <Clock className="text-muted-foreground mr-2 h-4 w-4" />
                        {field.value
                          ? timeFormatOptions.find((format) => format.value === field.value)?.label
                          : messages.FORM_SECTIONS.LOCALIZATION.TIME_FORMAT_PLACEHOLDER}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder={messages.SEARCH.SEARCH_TIME_FORMAT} />
                      <CommandList>
                        <CommandEmpty>{messages.SEARCH.NO_FORMAT}</CommandEmpty>
                        <CommandGroup>
                          {timeFormatOptions.map((format) => (
                            <CommandItem
                              key={format.value}
                              value={format.value}
                              onSelect={() => {
                                form.setValue('timeFormat', format.value)
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  field.value === format.value ? 'opacity-100' : 'opacity-0',
                                )}
                              />
                              <Clock className="text-muted-foreground mr-2 h-4 w-4" />
                              {format.label}
                              <span className="text-muted-foreground ml-2">{format.example}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>{messages.FORM_SECTIONS.LOCALIZATION.TIME_FORMAT_DESCRIPTION}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  )
}
