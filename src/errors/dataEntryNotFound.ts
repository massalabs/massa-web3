import { ErrorBase } from './base'
import { ErrorCodes } from './utils/codes'

type ErrorDataEntryNotFoundParameters = {
  key: Uint8Array | string
  address: string
  details?: string
}

/**
 * Error class for handling the situation when a data entry has not been found in a smart contract datastore.
 */
export class ErrorDataEntryNotFound extends ErrorBase {
  /**
   * Override the name to clearly identify this as a ErrorDataEntryNotFound.
   */
  override name = 'ErrorDataEntryNotFound'

  /**
   * Constructs a ErrorDataEntryNotFound with a message indicating the missing data entry.
   * @param key - The key of the data entry that was not found.
   * @param address - The address of the smart contract datastore where the entry was expected.
   * @param details - Optional details to provide more context about the error.
   */
  constructor({ key, address, details }: ErrorDataEntryNotFoundParameters) {
    super(
      `The data entry with key ${key} was not found in the datastore of the contract at address ${address}.`,
      {
        code: ErrorCodes.DataEntryNotFound,
        details,
      }
    )
  }
}
