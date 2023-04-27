import { IClientConfig } from '../interfaces/IClientConfig';
import { INodeStatus } from '../interfaces/INodeStatus';
import { IAddressInfo } from '../interfaces/IAddressInfo';
import { IBlockInfo } from '../interfaces/IBlockInfo';
import { IEndorsement } from '../interfaces/IEndorsement';
import { IOperationData } from '../interfaces/IOperationData';
import { IClique } from '../interfaces/IClique';
import { IStakingAddresses } from '../interfaces/IStakingAddresses';
import { BaseClient } from './BaseClient';
import { IPublicApiClient } from '../interfaces/IPublicApiClient';
import { IDatastoreEntry } from '../interfaces/IDatastoreEntry';
import { IDatastoreEntryInput } from '../interfaces/IDatastoreEntryInput';
import { ISlot } from '../interfaces/ISlot';
import { IGetGraphInterval } from '../interfaces/IGetGraphInterval';
import { IGraphInterval } from '../interfaces/IGraphInterval';
import { IBlockcliqueBlockBySlot } from '../interfaces/IBlockcliqueBlockBySlot';
/** Public Api Client for interacting with the massa network */
export declare class PublicApiClient extends BaseClient implements IPublicApiClient {
    constructor(clientConfig: IClientConfig);
    /** Get graph interval */
    getGraphInterval(graphInterval: IGetGraphInterval): Promise<Array<IGraphInterval>>;
    /** Get blockclique details by period and thread */
    getBlockcliqueBlockBySlot(slot: ISlot): Promise<IBlockcliqueBlockBySlot>;
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
    getDatastoreEntries(addressesKeys: Array<IDatastoreEntryInput>): Promise<Array<IDatastoreEntry>>;
}
