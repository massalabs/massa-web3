import { IBlockHeaderInfo } from './IBlockcliqueBlockBySlot';
export interface ISubscribeNewBlocksMessage {
    header: {
        content: IBlockHeaderInfo;
        signature: string;
        creator_public_key: string;
        creator_address: string;
        id: string;
    };
    operations: Array<string>;
}
