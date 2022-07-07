import { ISignedMessage } from "./ISignedMessage";
export interface IPrivateApiClient {
    unbanIpAddress(ipAddress: string): Promise<void>;
    banIpAddress(ipAddress: string): Promise<void>;
    nodeStop(): Promise<void>;
    nodeSignMessage(message: Uint8Array): Promise<ISignedMessage>;
    nodeGetStakingAddresses(): Promise<Array<string>>;
    nodeRemoveStakingAddresses(addresses: Array<string>): Promise<void>;
    nodeAddStakingSecretKeys(secretKeys: Array<string>): Promise<void>;
}
