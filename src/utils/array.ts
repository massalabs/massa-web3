/**
 * Splits an array into smaller batches of a specified maximum size
 * @param array The input array to split
 * @param batchSize The maximum size of each batch. If zero, return the array as a single batch.
 * @returns An array of batches, where each batch is an array of the original elements
 */
export function toBatch<T>(array: T[], batchSize: number): T[][] {
  if (batchSize < 0) {
    throw new Error('batch size should be positive')
  }
  if (array.length === 0) {
    return []
  }
  if (batchSize === 0 || array.length <= batchSize) {
    return [array]
  }
  const batches: T[][] = []
  for (let i = 0; i < array.length; i += batchSize) {
    batches.push(array.slice(i, i + batchSize))
  }
  return batches
}
