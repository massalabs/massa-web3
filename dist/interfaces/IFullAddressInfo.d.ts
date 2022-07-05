import { IAddressInfo } from "./IAddressInfo";
export interface IFullAddressInfo extends IAddressInfo {
    publicKey: string;
    secretKey: string;
}
