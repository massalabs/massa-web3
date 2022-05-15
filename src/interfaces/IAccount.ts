export interface IAccount {
	address: string  | null;
	publicKey: string | null;	  // base58 encoded public key
	privateKey: string  | null;   // base58 encoded private key
	randomEntropy: string | null; // base58 encoded entropy
}
