/**
 * Represents the MNS resolver object.
 *
 * @remarks
 * This interface is used to resolve domain name to addresses. It also provides methods for setting
 * custom mns resolver instead of the default one provided for MAINNET and BUILDNET.
 *
 * @see resolve - A function that returns the address of the domain if it exists or throws an error if it does not.
 * @see setMnsResolver - A method for setting a custom mns resolver.
 */

export interface IMnsResolver {
  resolve(domain: string): Promise<string>
  setMnsResolver(contractAddress: string): void
}
