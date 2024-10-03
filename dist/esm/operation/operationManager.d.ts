import { PrivateKey, PublicKey } from '../basicElements/keys';
import { PublicAPI } from '../client';
import { Signature } from '../basicElements/signature';
import { OperationDetails } from './types';
export declare const PERIOD_TO_LIVE_DEFAULT = 9;
export declare const PERIOD_TO_LIVE_MAX = 9;
export declare const PERIOD_TO_LIVE_MIN = 1;
export declare class OperationManager {
    privateKey: PrivateKey;
    blockchainClient?: PublicAPI | undefined;
    constructor(privateKey: PrivateKey, blockchainClient?: PublicAPI | undefined);
    /**
     * Serializes an operation according to the Massa protocol.
     *
     * @param operation - The operation to serialize.
     *
     * @returns A byte array representing the serialized operation.
     */
    static serialize(operation: OperationDetails): Uint8Array;
    /**
     * Deserializes an operation according to the Massa protocol.
     *
     * @param data - The byte array to deserialize.
     *
     * @returns An new instance of OperationDetails representing the deserialized operation.
     */
    static deserialize(data: Uint8Array): OperationDetails;
    /**
     * Formats an operation for signing.
     *
     * @param chainId - The identifier of the blockchain network.
     * @param operation - The operation to sign.
     * @param key - The public key to sign the operation with.
     *
     * @returns The formatted operation ready for signing.
     */
    static canonicalize(chainId: bigint, operation: OperationDetails, key: PublicKey): Uint8Array;
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
    sign(chainId: bigint, operation: OperationDetails): Promise<Signature>;
    /**
     * Sends an operation to the blockchain.
     *
     * @param operation - The operation to send.
     *
     * @returns An operation Id.
     */
    send(operation: OperationDetails): Promise<string>;
}
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
export declare function checkPeriodToLive(periodToLive?: number): void;
export declare function getAbsoluteExpirePeriod(client: PublicAPI, periodToLive?: number): Promise<number>;
