import { z, type ZodSchema } from 'zod'
import { toSlugCase } from '../form.utils'
import type { FieldSchema } from '../validation/form.validation'

const fieldType = ['text', 'select', 'number', 'checkbox', 'radio'] as const

type DefaultValueTypes = {
  text: string
  select: string
  number: number
  checkbox: boolean
  radio: string
}

const defaultFieldsValue = {
  text: '',
  select: '',
  number: 0,
  checkbox: false,
  radio: '',
} satisfies DefaultValueTypes

export const fieldConstants = {
  type: fieldType,
  defaultValue: defaultFieldsValue,
}

/**
 * Returns the default value for a given field type.
 * @param key - The field type key (e.g. 'text', 'select', etc.).
 * @returns The default value associated with the field type.
 */
export const getDefaultValue = <K extends keyof DefaultValueTypes>(key: K): DefaultValueTypes[K] => {
  return defaultFieldsValue[key]
}

/**
 * Returns a Zod schema based on the field type.
 * @param type - The field type (e.g. 'text', 'select', 'number', etc.).
 * @returns The Zod schema corresponding to the field type.
 */
export const getZodSchema = (type: keyof DefaultValueTypes) => {
  switch (type) {
    case 'text':
    case 'select':
    case 'radio':
      return z.string().min(1, { message: 'This field is required' })

    case 'number':
      return z.number().min(0, { message: 'Value must be a positive number' })

    case 'checkbox':
      return z.boolean()

    default:
      return z.unknown()
  }
}

/**
 * Generates a Zod schema object from a list of fields.
 * @param schemaList - An array of field configurations.
 * @returns A Zod schema object based on the field configurations.
 */
export const createDynamicSchema = <T extends z.infer<typeof FieldSchema>>(schemaList: T[]) => {
  const schemaObject = Object.fromEntries(
    schemaList.map((fieldValue) => {
      const name = toSlugCase(fieldValue.config.label)
      const field = getZodSchema(fieldValue.config.type)
      return [name, field]
    }),
  )

  return z.object(schemaObject) as ZodSchema
}

export const createDefaultValues = <T extends z.infer<typeof FieldSchema>>(schemaList: T[]) => {
  return Object.fromEntries(
    schemaList.map((fieldValue) => [toSlugCase(fieldValue.config.label), getDefaultValue(fieldValue.config.type)]),
  ) as Record<string, DefaultValueTypes[keyof DefaultValueTypes]>
}
