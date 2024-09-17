"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAbsoluteExpirePeriod = exports.checkPeriodToLive = exports.OperationManager = exports.PERIOD_TO_LIVE_MIN = exports.PERIOD_TO_LIVE_MAX = exports.PERIOD_TO_LIVE_DEFAULT = void 0;
const tslib_1 = require("tslib");
const unsigned = tslib_1.__importStar(require("../utils/big-varint"));
const address_1 = require("../basicElements/address");
const varint_1 = tslib_1.__importDefault(require("varint"));
const serializers_1 = require("../basicElements/serializers");
const types_1 = require("./types");
exports.PERIOD_TO_LIVE_DEFAULT = 9;
exports.PERIOD_TO_LIVE_MAX = 9;
exports.PERIOD_TO_LIVE_MIN = 1;
/*
 * A class regrouping operation functions.
 */
class OperationManager {
    privateKey;
    blockchainClient;
    constructor(privateKey, blockchainClient) {
        this.privateKey = privateKey;
        this.blockchainClient = blockchainClient;
    }
    /**
     * Serializes an operation according to the Massa protocol.
     *
     * @param operation - The operation to serialize.
     *
     * @returns A byte array representing the serialized operation.
     */
    static serialize(operation) {
        const components = [
            unsigned.encode(operation.fee),
            varint_1.default.encode(operation.expirePeriod),
            varint_1.default.encode(operation.type),
        ];
        switch (operation.type) {
            case types_1.OperationType.Transaction:
                operation = operation;
                components.push(operation.recipientAddress.toBytes());
                components.push(unsigned.encode(operation.amount));
                break;
            case types_1.OperationType.RollBuy:
            case types_1.OperationType.RollSell:
                operation = operation;
                components.push(unsigned.encode(operation.amount));
                break;
            case types_1.OperationType.CallSmartContractFunction:
                // @see https://docs.massa.net/docs/learn/operation-format-execution#callsc-operation-payload
                operation = operation;
                components.push(unsigned.encode(operation.maxGas));
                components.push(unsigned.encode(operation.coins));
                components.push(address_1.Address.fromString(operation.address).toBytes());
                components.push(varint_1.default.encode(operation.func.length));
                components.push(Buffer.from(operation.func));
                components.push(varint_1.default.encode(operation.parameter.length));
                components.push(operation.parameter);
                break;
            case types_1.OperationType.ExecuteSmartContractBytecode:
                operation = operation;
                components.push(unsigned.encode(operation.maxGas));
                components.push(unsigned.encode(operation.maxCoins));
                components.push(unsigned.encode(serializers_1.U64.fromNumber(operation.contractDataBinary.length)));
                components.push(operation.contractDataBinary);
                operation.datastore =
                    operation.datastore || new Map();
                components.push(unsigned.encode(serializers_1.U64.fromNumber(operation.datastore.size)));
                // length prefixed key-value pairs encoding
                for (const [key, value] of operation.datastore) {
                    const keyBytes = Buffer.from(key);
                    const keyLen = unsigned.encode(serializers_1.U64.fromNumber(keyBytes.length));
                    const valueBytes = Buffer.from(value);
                    const valueLen = unsigned.encode(serializers_1.U64.fromNumber(valueBytes.length));
                    components.push(keyLen, keyBytes, valueLen, valueBytes);
                }
                break;
            default:
                throw new Error('Operation type not supported');
        }
        return Uint8Array.from(components.flatMap((component) => Array.from(component)));
    }
    /**
     * Deserializes an operation according to the Massa protocol.
     *
     * @param data - The byte array to deserialize.
     *
     * @returns An new instance of OperationDetails representing the deserialized operation.
     */
    static deserialize(data) {
        let offset = 0;
        // eslint-disable-next-line func-style
        const nextVarInt = () => {
            const value = unsigned.decode(data, offset);
            offset += unsigned.encodingLength(value);
            return value;
        };
        const operationDetails = {
            fee: nextVarInt(),
            expirePeriod: Number(nextVarInt()),
            type: Number(nextVarInt()),
        };
        switch (operationDetails.type) {
            case types_1.OperationType.Transaction: {
                const { data: addrBytes, length } = address_1.Address.extractFromBuffer(data, offset);
                const recipientAddress = address_1.Address.fromBytes(addrBytes);
                offset += length;
                return {
                    ...operationDetails,
                    recipientAddress,
                    amount: nextVarInt(),
                };
            }
            case types_1.OperationType.RollBuy:
            case types_1.OperationType.RollSell: {
                return {
                    ...operationDetails,
                    amount: nextVarInt(),
                };
            }
            default:
                throw new Error('Operation type not supported');
        }
    }
    /**
     * Formats an operation for signing.
     *
     * @param chainId - The identifier of the blockchain network.
     * @param operation - The operation to sign.
     * @param key - The public key to sign the operation with.
     *
     * @returns The formatted operation ready for signing.
     */
    static canonicalize(chainId, operation, key) {
        // u64ToBytes is little endian
        const networkId = new Uint8Array(serializers_1.U64.SIZE_BYTE);
        const view = new DataView(networkId.buffer);
        view.setBigUint64(0, chainId, false);
        const data = OperationManager.serialize(operation);
        const publicKeyBytes = key.toBytes();
        return Uint8Array.from([...networkId, ...publicKeyBytes, ...data]);
    }
    /**
     * Signs an operation for a given network.
     *
     * @remarks
     * The chainId is used to counter replay attacks on a different chain.
     *
     * @param chainId - The identifier of the blockchain network.
     * @param operation - The operation to sign.
     *
     * @returns A signature of the operation.
     */
    async sign(chainId, operation) {
        return this.privateKey.sign(OperationManager.canonicalize(chainId, operation, await this.privateKey.getPublicKey()));
    }
    /**
     * Sends an operation to the blockchain.
     *
     * @param operation - The operation to send.
     *
     * @returns An operation Id.
     */
    async send(operation) {
        if (!this.blockchainClient) {
            throw new Error('blockchainClient is mandatory to send operations');
        }
        const chainId = await this.blockchainClient.getChainId();
        const signature = await this.sign(chainId, operation);
        const data = OperationManager.serialize(operation);
        const publicKey = await this.privateKey.getPublicKey();
        return this.blockchainClient.sendOperation({
            data,
            publicKey: publicKey.toString(),
            signature: signature.toString(),
        });
    }
}
exports.OperationManager = OperationManager;
/**
 * Check the expire period validity.
 *
 * @remarks
 * If the periodToLive is too big, the node will silently reject the operation.
 * This is why the periodToLive is limited to an upper value.
 *
 * @param periodToLive - The period to live.
 *
 * @returns The expire period.
 * @throws An error if the periodToLive is too low or too big.
 */
function checkPeriodToLive(periodToLive = exports.PERIOD_TO_LIVE_DEFAULT) {
    if (periodToLive < exports.PERIOD_TO_LIVE_MIN || periodToLive > exports.PERIOD_TO_LIVE_MAX) {
        throw new Error(`periodToLive must be between ${exports.PERIOD_TO_LIVE_MIN} and ${exports.PERIOD_TO_LIVE_MAX}.`);
    }
}
exports.checkPeriodToLive = checkPeriodToLive;
async function getAbsoluteExpirePeriod(client, periodToLive = exports.PERIOD_TO_LIVE_DEFAULT) {
    checkPeriodToLive(periodToLive);
    const currentPeriod = await client.fetchPeriod();
    return currentPeriod + periodToLive;
}
exports.getAbsoluteExpirePeriod = getAbsoluteExpirePeriod;
//# sourceMappingURL=operationManager.js.map