export interface IProvider {
  url: string;
  type: ProviderType;
}

export enum ProviderType {
  PRIVATE,
  PUBLIC,
}
