module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module'
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
    'no-console': 'off'
    // 'no-console': process.env.NODE_ENV === 'development' ? 'off' : 'error'
  }
}
