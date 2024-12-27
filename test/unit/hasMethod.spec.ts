/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-empty-function */
import { hasMethod } from '../../src/utils'

type TestInterface = {
  testMethod(): void
}

describe('hasMethod', () => {
  it('should return true if the object has the specified method', () => {
    const obj = {
      testMethod: () => {},
    }

    expect(hasMethod(obj, 'testMethod')).toBe(true)
  })

  it('should return false if the object does not have the specified method', () => {
    const obj = {
      anotherMethod: () => {},
    }

    expect(hasMethod(obj, 'testMethod')).toBe(false)
  })

  it('should return false if the specified method is not a function', () => {
    const obj = {
      testMethod: 'not a function',
    }

    expect(hasMethod(obj, 'testMethod')).toBe(false)
  })

  it('should return false if the object is null or undefined', () => {
    expect(hasMethod(null, 'testMethod')).toBe(false)
    expect(hasMethod(undefined, 'testMethod')).toBe(false)
  })
})
