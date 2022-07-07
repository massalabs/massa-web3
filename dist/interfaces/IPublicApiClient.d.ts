import { IAddressInfo } from "./IAddressInfo";
import { IBlockInfo } from "./IBlockInfo";
import { IClique } from "./IClique";
import { IEndorsement } from "./IEndorsement";
import { INodeStatus } from "./INodeStatus";
import { IOperationData } from "./IOperationData";
import { IStakingAddresses } from "./IStakingAddresses";
import { IContractStorageData } from "./IContractStorageData";
import { IDatastoreEntryInput } from "./IDatastoreEntryInput";
export interface IPublicApiClient {
    getNodeStatus(): Promise<INodeStatus>;
    getAddresses(addresses: Array<string>): Promise<Array<IAddressInfo>>;
    getBlocks(blockIds: Array<string>): Promise<Array<IBlockInfo>>;
    getEndorsements(endorsementIds: Array<string>): Promise<Array<IEndorsement>>;
    getOperations(operationIds: Array<string>): Promise<Array<IOperationData>>;
    getCliques(): Promise<Array<IClique>>;
    getStakers(): Promise<Array<IStakingAddresses>>;
    getDatastoreEntries(addresses_keys: Array<IDatastoreEntryInput>): Promise<Array<IContractStorageData | null>>;
}
