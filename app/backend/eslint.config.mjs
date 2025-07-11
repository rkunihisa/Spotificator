import globals from 'globals';
import markdown from '@eslint/markdown';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  { ignores: ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.json'] },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: { '@typescript-eslint': tseslint.plugin },
    languageOptions: { parser: tseslint.parser },
    extends: [tseslint.configs.recommended],
  },
  { files: ['**/*.md'], plugins: { markdown }, language: 'markdown/commonmark', extends: ['markdown/recommended'] },
  { languageOptions: { globals: globals.node } },
  tseslint.configs.recommended,
]);
