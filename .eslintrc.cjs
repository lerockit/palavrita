module.exports = {
  env: { browser: true, es2020: true, jest: true },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh', 'react', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    semi: ['error', 'never'],
    'react/react-in-jsx-scope': 0,
    quotes: ['error', 'single']
  }
}
