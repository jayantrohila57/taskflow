import { type z } from 'zod'
import { type FieldSchema } from './validation/form.validation'
export const Config = {
  config: {
    label: 'First Name',
    name: '',
    description: 'This is your public display name.',
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
} satisfies z.infer<typeof FieldSchema>
