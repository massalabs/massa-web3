import { ISlot } from "./ISlot";

export interface IEndorsementInfo {
	content: {
		slot: ISlot,
		index: number,
		endorsed_block: string
	};
	signature: string;
	creator_public_key: string;
	creator_address: string;
	id: string;
}

export interface IBlockcliqueBlockBySlot {
	header: {
		content: {
		  slot: ISlot,
		  parents: Array<string>,
		  operation_merkle_root: string,
		  endorsements: Array<IEndorsementInfo>
		},
		signature: string,
		creator_public_key: string,
		creator_address: string,
		id: string,
	};
	operations: Array<string>;
}
