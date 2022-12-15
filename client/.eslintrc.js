module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  overrides: [],

  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    experimentalObjectRestSpread: true,
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'space-before-function-paren': 'off',
    'comma-dangle': 'off',
    'object-curly-spacing': 'off',
    quotes: 'off',
    'multiline-ternary': 'off',
    indent: 'off',
    'no-unused-vars': 'off',
    'react/display-name': 'off'
  }
}
