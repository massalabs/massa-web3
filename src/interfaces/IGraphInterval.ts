import { ISlot } from "./ISlot";

export interface IGraphInterval {
    id: string; // graph id
    is_final: boolean; // is final ?
    is_stale: boolean; // is stale ?
    is_in_blockclique: boolean; // has it been added to the blockclique
    slot: ISlot; // slot ?
    creator: string; // creator
    parents: Array<String>; // parents
}
