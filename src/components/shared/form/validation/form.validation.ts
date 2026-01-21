import { z } from 'zod'
import { fieldConstants } from '../fields/fields'

export const FieldTypeSchema = z.enum([...fieldConstants.type])
export const FieldOptionSchema = z.object({
  prefix: z.string().optional(),
  label: z.string(),
  value: z.string(),
  suffix: z.string().optional(),
  tooltip: z.string().optional(),
  icon: z.string().optional(),
})
export const FieldConfigSchema = z.object({
  label: z.string(),
  name: z.string(),
  description: z.string().optional(),
  type: FieldTypeSchema,
  options: z.array(FieldOptionSchema).optional(),
  placeholder: z.string().optional(),
  defaultValue: z.string().optional(),
  isMultiSelect: z.boolean().optional(),
  isSearchable: z.boolean().optional(),
})
export const FieldUiSettingsSchema = z.object({
  className: z.string().optional(),
  styleOverrides: z.record(z.string(), z.any()).optional(),
  width: z.string().optional(),
  fullWidth: z.boolean().optional(),
  helperText: z.string().optional(),
  tooltip: z.string().optional(),
})
export const FieldValidationSchema = z.object({
  isRequired: z.boolean().default(false).optional(),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
  regexPattern: z.string().optional(),
  minValue: z.number().optional(),
  maxValue: z.number().optional(),
})
export const FieldSchema = z.object({
  config: FieldConfigSchema,
  ui: FieldUiSettingsSchema,
  validation: FieldValidationSchema,
})
