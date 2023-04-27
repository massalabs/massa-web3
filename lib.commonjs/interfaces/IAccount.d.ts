export interface IAccount {
    address: string | null;
    publicKey: string | null;
    secretKey: string | null;
    createdInThread?: number;
}
