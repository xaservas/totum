module.exports = {

  env: {
    commonjs: true,
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: ['airbnb-base'],
  plugins: ['jest'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    indent: ['error', 4],
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    quotes: ['error', 'simple'],
  },

