import { ISlot } from './ISlot';
export interface IGraphInterval {
    id: string;
    is_final: boolean;
    is_stale: boolean;
    is_in_blockclique: boolean;
    slot: ISlot;
    creator: string;
    parents: Array<string>;
}
