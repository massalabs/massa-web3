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

/**
 * Generic function to batch a list and apply an async function to each batch
 * @remarks This function allow to don't exceed the max argument limit of node api endpoints
 * @param list The input list to batch and process
 * @param batchFunction The async function to apply to each batch
 * @param batchSize The maximum size of each batch
 * @returns A promise that resolves to the flattened results of all batch operations
 */
export async function batchListAndCall<T, V>(
  list: T[],
  batchFunction: (batch: T[]) => Promise<V[]>,
  batchSize: number
): Promise<V[]> {
  // Batch the input list
  const batchedList = toBatch(list, batchSize)

  // Process all batches in parallel
  const batchResults = await Promise.all(
    batchedList.map(async (batch) => {
      return batchFunction(batch)
    })
  )

  // Flatten all results into a single array
  return batchResults.flat()
}
