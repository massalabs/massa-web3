import { ISlot } from "./ISlot";

export interface IEndorsement {
    id: string; // EndorsementId,
    in_pool: boolean;
    in_blocks: [string]; // BlockId,
    is_final: boolean;
    endorsement: {
        content: {
            sender_public_key: string,
            slot: ISlot,
            index: number,
            endorsed_block: string // BlockId,
        }
        signature: string
    };
  }
