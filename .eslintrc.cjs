/* eslint-env node */
module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/strict',
        'plugin:@typescript-eslint/stylistic',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    rules: {
        'no-else-return': ['error', { allowElseIf: false }],
        'func-style': ['error', 'declaration', { 'allowArrowFunctions': false }],
        'no-magic-numbers': 'off',
        '@typescript-eslint/no-magic-numbers': [
          'error',
          {
            ignoreArrayIndexes: true,
            enforceConst: true,
            detectObjects: true,
            ignoreEnums: true,
            ignore: [0,1,-1,'0n','1n'],
          },
        ],
        '@typescript-eslint/ban-tslint-comment': 'off',
        '@typescript-eslint/consistent-type-definitions': [
            'error',
            'type'
          ],
        'max-params': ['error', 4],
        'class-methods-use-this': ['error', { exceptMethods: [] }],
        '@typescript-eslint/explicit-function-return-type': ['warn'],
        '@typescript-eslint/explicit-module-boundary-types': ['error'],
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'default',
            format: ['camelCase'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },
          {
            selector: 'variable',
            format: ['camelCase'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },
          {
            selector: 'variable',
            modifiers: ['const'],
            format: ['camelCase'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },
          {
            selector: 'variable',
            modifiers: ['const', 'global'],
            format: ['UPPER_CASE'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },
          {
            selector: 'parameter',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'forbid',
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },
          {
            selector: 'enumMember',
            format: ['PascalCase'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },
          {
            selector: 'import',
            format: ['camelCase', 'PascalCase'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },
        ],
        // Not working for now. To investigate at some point.
        //'@typescript-eslint/prefer-nullish-coalescing': [
        //  'error',
        //  { ignoreConditionalTests: true, ignoreMixedLogicalExpressions: true },
        //],
      },
  };