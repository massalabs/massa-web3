import { IEndorsementInfo } from "./IBlockcliqueBlockBySlot"
import { ISlot } from "./ISlot"
 
export interface ISubscribeNewBlocksMessage {
    header: {
        content: {
            slot: ISlot,
            parents: Array<string>,
            operation_merkle_root: string,
            endorsements: Array<IEndorsementInfo>,
        },
        signature: string,
        creator_public_key: string,
        creator_address: string,
        id: string,
    },
    operations: Array<string>;
}
