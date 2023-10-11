module.exports = {
  extends: ['@massalabs'],
  rules: {
    'tsdoc/syntax': 'warn',
    'max-len': ['error', 200],
    camelcase: 'off',
    '@typescript-eslint/no-unused-vars': 'error',
  },
};
