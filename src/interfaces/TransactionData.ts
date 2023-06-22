/**
 * Interface for transaction data
 *
 * @see fee - fee paid for transaction
 * @see amount - amount of tokens sent
 * @see recipientAddress - recipient address
 */
export interface TransactionData {
  fee: bigint;
  amount: bigint;
  recipientAddress: string;
}
