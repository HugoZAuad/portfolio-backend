// eslint.config.js

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default tseslint.config(
  // 1. Arquivos a serem ignorados pelo ESLint
  {
    ignores: ['dist', 'node_modules', 'eslint.config.js'],
  },

  // 2. Configurações base
  eslint.configs.recommended, // Regras recomendadas do ESLint
  ...tseslint.configs.recommendedTypeChecked, // Regras recomendadas do TypeScript, com verificação de tipos

  // 3. Regras do Prettier
  // Garante que o ESLint e o Prettier trabalhem juntos sem conflitos.
  // IMPORTANTE: Este deve ser o último na lista para sobrepor outras regras de formatação.
  prettierRecommended,

  // 4. Regras personalizadas e configurações de projeto
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        project: 'tsconfig.json', // Aponte diretamente para o seu tsconfig.json
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Regras de boas práticas e segurança
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      'no-debugger': 'error',
      'no-unused-vars': 'off', // Desabilitado em favor da regra do TypeScript
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn', // Considerar 'error' no futuro
      '@typescript-eslint/no-floating-promises': 'error', // Torna esta regra crítica
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Pode ser útil em alguns casos, mas é opcional
      '@typescript-eslint/ban-ts-comment': 'off', // Habilitado para permitir comentários TS para suppress
    },
  },
);
