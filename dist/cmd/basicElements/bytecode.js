"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.MAX_GAS_EXECUTE = void 0;
const operationManager_1 = require("../operation/operationManager");
const operation_1 = require("../operation");
exports.MAX_GAS_EXECUTE = 3980167295n;
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
async function execute(client, privateKey, byteCode, opts) {
    const operation = new operationManager_1.OperationManager(privateKey, client);
    const details = {
        fee: opts?.fee ?? (await client.getMinimalFee()),
        expirePeriod: await (0, operationManager_1.getAbsoluteExpirePeriod)(client, opts.periodToLive),
        type: operation_1.OperationType.ExecuteSmartContractBytecode,
        maxCoins: opts?.maxCoins ?? 0n,
        maxGas: opts?.maxGas || exports.MAX_GAS_EXECUTE,
        contractDataBinary: byteCode,
        datastore: opts.datastore,
    };
    return operation.send(details);
}
exports.execute = execute;
//# sourceMappingURL=bytecode.js.map