import { ErrorBase } from './base'
import { ErrorCodes } from './utils/codes'

test('ErrorBase', () => {
  expect(new ErrorBase('An error occurred.').message).toBe(`An error occurred.`)

  expect(
    new ErrorBase('An error occurred.', { details: 'Some details' }).message
  ).toBe(`An error occurred.

Details: Some details`)

  expect(
    new ErrorBase('An error occurred.', {
      metaMessages: ['Some meta message'],
    }).message
  ).toBe(`An error occurred.

Meta: Some meta message`)

  expect(
    new ErrorBase('An error occurred.', {
      docsPath: 'https://example.com/docs',
    }).message
  ).toBe(`An error occurred.

Docs: see https://example.com/docs for more information.`)
})

test('ErrorBase with code', () => {
  const errorBase = new ErrorBase('An error occurred.', {
    code: ErrorCodes.UnknownError,
  })
  expect(errorBase.code).toBe(ErrorCodes.UnknownError)
})
