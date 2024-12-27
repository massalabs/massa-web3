/**
 * Type guard to check if an object has a specific method.
 * @param obj - The object to check.
 * @param methodName - The name of the method to check for.
 * @returns True if the object has the method, false otherwise.
 */
export function hasMethod<T>(obj: unknown, methodName: keyof T): obj is T {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    methodName in obj &&
    typeof (obj as T)[methodName] === 'function'
  )
}
