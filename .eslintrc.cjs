module.exports = {
  extends: ["@massalabs","prettier"],
  rules: {
    "tsdoc/syntax": "warn",
    "max-len": ["error", 200],
    camelcase: "off",
    "@typescript-eslint/no-unused-vars": "error",
    'no-console': 'warn',
    "comma-dangle": "off"
  },
};
