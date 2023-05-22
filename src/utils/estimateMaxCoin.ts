/**
 * Estimates the value of the maxCoins maximum number of coins to that should be used while deploying a smart contract.
 *
 * @param contractByteCode - The byte code of the smart contract to be deployed.
 * @param transactionOperationCost - The transaction operation cost in MASSA. (it should be the same as the
 * 'coins' parameter used in the deploySC function)
 *
 * @returns The estimated value of the maxCoins value (in MASSA coins).
 */
function estimateMaxCoin(contractByteCode: Buffer, transactionOperationCost) {
  const byteCodeSize = contractByteCode.length;
  return 0.01025 + byteCodeSize * 0.00025 + transactionOperationCost;
}
