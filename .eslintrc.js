module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    allowImportExportEverywhere: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', 'react'],
  // add your custom rules here
  rules: {
    'arrow-parens': "off",
    'no-console': 'off',
    'react/prop-types': 0
    // 'no-console': process.env.NODE_ENV === 'development' ? 'off' : 'error'
  }
}
