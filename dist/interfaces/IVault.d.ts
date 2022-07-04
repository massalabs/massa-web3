import { IAccount } from "./IAccount";
export interface IVault {
    network: number;
    accounts: IAccount[];
    mnemonic: string;
}
