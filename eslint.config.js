import js from '@eslint/js';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      importPlugin.flatConfigs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    plugins: {
      prettier,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': 'warn',

      'no-unused-vars': 'warn',
      'no-console': 'error',
      'array-callback-return': 'error',
      curly: 'warn',

      // padding between statements
      'padding-line-between-statements': [
        'error',
        // always add a blank line before return
        { blankLine: 'always', prev: '*', next: 'return' },
        // optional: add more rules as needed
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'always', prev: 'const', next: '*' },
        { blankLine: 'always', prev: 'let', next: '*' },
        { blankLine: 'always', prev: 'var', next: '*' },
      ],

      // Import order
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-unresolved': 'off',
    },
  },
]);
