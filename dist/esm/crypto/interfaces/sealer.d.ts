export default interface Sealer {
    seal(data: Uint8Array): Promise<any>;
    unseal(data: any): Promise<Uint8Array>;
}
