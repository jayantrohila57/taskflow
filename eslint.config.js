import { FlatCompat } from '@eslint/eslintrc'
import prettierPlugin from 'eslint-plugin-prettier'
import tseslint from 'typescript-eslint'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

export default tseslint.config(
  {
    ignores: ['.next'],
  },
  ...compat.extends('next/core-web-vitals'),
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      prettier: prettierPlugin,
    },
    extends: [
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    rules: {
      'prettier/prettier': 'error',
      'react/jsx-no-literals': 'error',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': ['off', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: { attributes: false } }],
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      'no-restricted-imports': [
        'error',
        {
          name: 'next/link',
          message: 'Please import from `@/package/next-intl/utils/routing` instead.',
        },
        {
          name: 'next/navigation',
          importNames: ['redirect', 'permanentRedirect', 'useRouter', 'usePathname'],
          message: 'Please import from `@/package/next-intl/utils/routing` instead.',
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: "JSXAttribute[name.name='href'][value.type='Literal']",
          message: 'Use route constants from the route-path file instead of hardcoded hrefs.',
        },
        {
          selector: "CallExpression[callee.object.name='console'][callee.property.name='log']",
          message: 'Use debugLog instead of console.log.',
        },
        {
          selector: "CallExpression[callee.object.name='console'][callee.property.name='error']",
          message: 'Use debugError instead of console.error.',
        },
        {
          selector: "CallExpression[callee.object.name='console'][callee.property.name='warn']",
          message: 'Use debugError instead of console.warn.',
        },
        {
          selector: "JSXAttribute[name.name='className'] > Literal[value=/#[0-9a-fA-F]{3,6}/]",
          message: 'Do not use hex color values directly in className. Use predefined color variables instead.',
        },
      ],
    },
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
)
