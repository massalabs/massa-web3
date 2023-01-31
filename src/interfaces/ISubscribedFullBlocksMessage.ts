import { IBlockHeaderInfo } from "./IBlockcliqueBlockBySlot";

export interface IFilledBlockInfo {
    content: {fee: string, expire_period: number, op: Object, };
    signature: string;
    creator_public_key: string;
    creator_address: string;
    id: string;
}

export interface ISubscribedFullBlocksMessage {
    header: {
        content: IBlockHeaderInfo,
        signature: string,
        creator_public_key: string,
        creator_address: string,
        id: string,
    };
    operations: Array<[string, [IFilledBlockInfo]]>;
}
