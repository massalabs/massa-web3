export interface IProvider {
    url: string;
    type: ProviderType;
}
export declare enum ProviderType {
    PRIVATE = 0,
    PUBLIC = 1,
    WS = 2
}
