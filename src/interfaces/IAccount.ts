export interface IAccount {
	/** 
	 * The account address (base58 encoded) 
	 * */
	address?: string;
	/** 
	 * The account public key (base58 encoded) 
	 * */
	publicKey?: string;
	/** 
	 * The account secret key (base58 encoded) 
	 * */
	secretKey?: string;
	/** 
	 * The thread number in which the account was created 
	 * */
	createdInThread?: number;
}
