import { IClientConfig } from "../interfaces/IClientConfig";
import { ISignedMessage } from "../interfaces/ISignedMessage";
import { BaseClient } from "./BaseClient";
import { IPrivateApiClient } from "../interfaces/IPrivateApiClient";
/** Private Api Client for interacting with a massa node */
export declare class PrivateApiClient extends BaseClient implements IPrivateApiClient {
    constructor(clientConfig: IClientConfig);
    /** Unban a given IP addresses */
    unbanIpAddress(ipAddress: string): Promise<void>;
    /** Ban a given IP addresses */
    banIpAddress(ipAddress: string): Promise<void>;
    /** Stops the node */
    nodeStop(): Promise<void>;
    /** Node signs a message */
    nodeSignMessage(message: Uint8Array): Promise<ISignedMessage>;
    /** Show staking addresses */
    nodeGetStakingAddresses(): Promise<Array<string>>;
    /** Remove staking addresses */
    nodeRemoveStakingAddresses(addresses: Array<string>): Promise<void>;
    /** Add staking private keys */
    nodeAddStakingSecretKeys(secretKeys: Array<string>): Promise<void>;
}
