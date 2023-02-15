import { IAddressInfo } from './IAddressInfo';
import { IBlockInfo } from './IBlockInfo';
import { IClique } from './IClique';
import { IEndorsement } from './IEndorsement';
import { INodeStatus } from './INodeStatus';
import { IOperationData } from './IOperationData';
import { IStakingAddresses } from './IStakingAddresses';
import { IDatastoreEntryInput } from './IDatastoreEntryInput';
import { IDatastoreEntry } from './IDatastoreEntry';
import { ISlot } from './ISlot';
import { IGetGraphInterval } from './IGetGraphInterval';
import { IBlockcliqueBlockBySlot } from './IBlockcliqueBlockBySlot';
import { IGraphInterval } from './IGraphInterval';

export interface IPublicApiClient {
  getNodeStatus(): Promise<INodeStatus>;
  getAddresses(addresses: Array<string>): Promise<Array<IAddressInfo>>;
  getBlocks(blockIds: Array<string>): Promise<Array<IBlockInfo>>;
  getEndorsements(endorsementIds: Array<string>): Promise<Array<IEndorsement>>;
  getOperations(operationIds: Array<string>): Promise<Array<IOperationData>>;
  getCliques(): Promise<Array<IClique>>;
  getStakers(): Promise<Array<IStakingAddresses>>;
  getDatastoreEntries(
    getDatastoreEntries: Array<IDatastoreEntryInput>,
  ): Promise<Array<IDatastoreEntry | null>>;
  getBlockcliqueBlockBySlot(slot: ISlot): Promise<IBlockcliqueBlockBySlot>;
  getGraphInterval(
    graphInterval: IGetGraphInterval,
  ): Promise<Array<IGraphInterval>>;
}
