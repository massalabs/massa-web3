import { BaseError } from './base'
import { ErrorCodes } from './utils/codes'

test('BaseError', () => {
  expect(new BaseError('An error occurred.').message).toBe(`An error occurred.`)

  expect(
    new BaseError('An error occurred.', { details: 'Some details' }).message
  ).toBe(`An error occurred.

Details: Some details`)

  expect(
    new BaseError('An error occurred.', {
      metaMessages: ['Some meta message'],
    }).message
  ).toBe(`An error occurred.

Meta: Some meta message`)

  expect(
    new BaseError('An error occurred.', {
      docsPath: 'https://example.com/docs',
    }).message
  ).toBe(`An error occurred.

Docs: https://example.com/docs for more information.`)
})

test('BaseError with code', () => {
  const baseError = new BaseError('An error occurred.', {
    code: ErrorCodes.UnknownError,
  })
  expect(baseError.code).toBe(ErrorCodes.UnknownError)
})
