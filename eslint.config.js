// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default tseslint.config(
  {
    files: ['src/**/*.ts'],
    ignores: [
      'src/i18n/i18n.ts'
    ],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      eslintPrettierRecommended,
    ],
    languageOptions: {
      parserOptions: {
        project: 'tsconfig.eslint.json',
        ecmaVersion: 2020,
        sourceType: 'module'
      }
    },
    rules: {
      'no-debugger': 'off',
      'no-prototype-builtins': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-misused-new': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_'
        }
      ]
    }
  }
);