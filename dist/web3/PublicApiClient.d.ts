import { IClientConfig } from "../interfaces/IClientConfig";
import { INodeStatus } from "../interfaces/INodeStatus";
import { IAddressInfo } from "../interfaces/IAddressInfo";
import { IBlockInfo } from "../interfaces/IBlockInfo";
import { IEndorsement } from "../interfaces/IEndorsement";
import { IOperationData } from "../interfaces/IOperationData";
import { IClique } from "../interfaces/IClique";
import { IStakingAddresses } from "../interfaces/IStakingAddresses";
import { BaseClient } from "./BaseClient";
import { IPublicApiClient } from "../interfaces/IPublicApiClient";
import { IContractStorageData } from "../interfaces/IContractStorageData";
import { IDatastoreEntryInput } from "../interfaces/IDatastoreEntryInput";
/** Public Api Client for interacting with the massa network */
export declare class PublicApiClient extends BaseClient implements IPublicApiClient {
    constructor(clientConfig: IClientConfig);
    /** Show the status of the node (reachable? number of peers connected, consensus, version, config parameter summary...) */
    getNodeStatus(): Promise<INodeStatus>;
    /** Get info about a list of addresses (balances, block creation, ...) */
    getAddresses(addresses: Array<string>): Promise<Array<IAddressInfo>>;
    /** Show info about a block (content, finality ...) */
    getBlocks(blockIds: Array<string>): Promise<Array<IBlockInfo>>;
    /** Show info about a list of endorsements (content, finality ...) */
    getEndorsements(endorsementIds: Array<string>): Promise<Array<IEndorsement>>;
    /** Show info about a list of operations = (content, finality ...) */
    getOperations(operationIds: Array<string>): Promise<Array<IOperationData>>;
    /** Get cliques */
    getCliques(): Promise<Array<IClique>>;
    /** Returns the active stakers and their roll counts for the current cycle */
    getStakers(): Promise<Array<IStakingAddresses>>;
    /** Returns the data entry both at the latest final and active executed slots. */
    getDatastoreEntries(addresses_keys: Array<IDatastoreEntryInput>): Promise<Array<IContractStorageData>>;
}
