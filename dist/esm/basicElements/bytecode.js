import { OperationManager, getAbsoluteExpirePeriod, } from '../operation/operationManager';
import { OperationType } from '../operation';
export const MAX_GAS_EXECUTE = 3980167295n;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function compile(_source) {
    throw new Error('Not implemented');
}
/**
 *
 * Executes a byte code on the blockchain.
 *
 * @param client - The client to connect to the desired blockchain.
 * @param privateKey - The private key of the account that will execute the byte code.
 * @param byteCode - The byte code to execute.
 * @param opts - Optional execution details.
 *
 * @returns The operation.
 */
export async function execute(client, privateKey, byteCode, opts) {
    const operation = new OperationManager(privateKey, client);
    const details = {
        fee: opts?.fee ?? (await client.getMinimalFee()),
        expirePeriod: await getAbsoluteExpirePeriod(client, opts.periodToLive),
        type: OperationType.ExecuteSmartContractBytecode,
        maxCoins: opts?.maxCoins ?? 0n,
        maxGas: opts?.maxGas || MAX_GAS_EXECUTE,
        contractDataBinary: byteCode,
        datastore: opts.datastore,
    };
    return operation.send(details);
}
//# sourceMappingURL=bytecode.js.map