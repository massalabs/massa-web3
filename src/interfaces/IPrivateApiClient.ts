import { ISignedMessage } from "./ISignedMessage";

export interface IPrivateApiClient {
	nodeBanById(id: string): Promise<void>;
	nodeBanByIpAddress(ipAddress: string): Promise<void>;
	nodeUnbanById(nodeId: string): Promise<void>;
	nodeUnbanByIpAddress(ipAddress: string): Promise<void>;
	nodeRemoveFromWhitelist(ipAddress: string): Promise<void>;
	nodeAddToPeersWhitelist(ipAddress: string): Promise<void>;
	nodeStop(): Promise<void>;
	nodeSignMessage(message: Uint8Array): Promise<ISignedMessage>;
	nodeGetStakingAddresses(): Promise<Array<string>>;
	nodeRemoveStakingAddresses(addresses: Array<string>): Promise<void>;
	nodeAddStakingSecretKeys(secretKeys: Array<string>): Promise<void>;
}