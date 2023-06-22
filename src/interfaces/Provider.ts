/**
 * Represents a provider.
 *
 * @see url - url of the provider
 * @see type - type of the provider
 */
export interface Provider {
  url: string;
  type: ProviderType;
}

/**
 * Represents a provider type.
 *
 * @see PRIVATE - private provider
 * @see PUBLIC - public provider
 */
export enum ProviderType {
  PRIVATE,
  PUBLIC,
}
