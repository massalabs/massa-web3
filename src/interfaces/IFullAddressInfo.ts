import { IAddressInfo } from "./IAddressInfo";

export interface IFullAddressInfo extends IAddressInfo {
    publicKey: string;
    privateKey: string;
}