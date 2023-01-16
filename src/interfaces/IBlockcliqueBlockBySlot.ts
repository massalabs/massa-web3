import { ISlot } from "./ISlot";

export interface IBlockHeaderInfo {
	/**
     * Block slot
	 * */
	slot: ISlot;
    /**
     * Block parents
	 * */
	parents: Array<string>;
    /**
     * The merkle tree root of the operation
	 * */
	operation_merkle_root: string;
    /**
     * An array containing endorsement info
	 * */
	endorsements: Array<IEndorsementInfo>;
}

export interface IEndorsementInfo {
    /**
     * The endorsement info context
	 * */
	content: {
		/**
		 * The slot of the endorsement
		 * */
		slot: ISlot,
		/**
		 * The index of the endorsement
		 * */
		index: number,
		/**
		 * The endorsed block
		 * */
		endorsed_block: string
	};
	/**
	 * The endorsement signature
	 * */
	signature: string;
	/**
	 * The endorsement creator public key
	 * */
	creator_public_key: string;
	/**
	 * The endorsement creator address
	 * */
	creator_address: string;
	/**
	 * The endorsement id
	 * */
	id: string;
}

export interface IBlockcliqueBlockBySlot {
	/**
	 * The blockclique metadata
	 * */
	header: {
		/**
		 * The block content info
		 * */
		content: IBlockHeaderInfo,
		/**
		 * The block signature
		 * */
		signature: string,
		/**
		 * The creator public key
		 * */
		creator_public_key: string,
		/**
		 * The creator address
		 * */
		creator_address: string,
		/**
		 * The blockclique id
		 * */
		id: string,
	};
	/**
	 * The block operations
	 * */
	operations: Array<string>;
}
