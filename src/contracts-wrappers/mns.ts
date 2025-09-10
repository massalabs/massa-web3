import { Args, bytesToStr, strToBytes, U256, U64 } from '../basicElements'
import { Operation } from '../operation'
import {
  DEFAULT_MAX_ARGUMENT_ARRAY_SIZE,
  Provider,
  PublicProvider,
} from '../provider'
import { CallSCOptions, ReadSCOptions, SmartContract } from '../smartContracts'
import { ErrorDataEntryNotFound } from '../errors/dataEntryNotFound'
import { CHAIN_ID } from '../utils'
import { batchListAndCall } from '../operation/batchOpArrayParam'
import { checkNetwork } from './utils'
import { isProvider } from '../provider/helpers'
import {
  DOMAIN_SEPARATOR_KEY,
  ADDRESS_KEY_PREFIX_V2,
  TOKEN_ID_KEY_PREFIX,
  DOMAIN_KEY_PREFIX,
  OWNED_TOKENS_KEY,
  TARGET_KEY_PREFIX,
} from '../deweb/keys'
import { PublicAPI } from '../client/publicAPI'

export const MNS_CONTRACTS = {
  mainnet: 'AS1q5hUfxLXNXLKsYQVXZLK7MPUZcWaNZZsK7e9QzqhGdAgLpUGT',
  buildnet: 'AS12qKAVjU1nr66JSkQ6N4Lqu4iwuVc6rAbRTrxFoynPrPdP1sj3G',
}

/**
 * @class MNS
 * @extends SmartContract
 *
 * The MNS class provides methods to interact with the Massa Name System (MNS) smart contract.
 * It allows resolving domain names, reverse resolving addresses, allocating domains, freeing domains,
 * and updating domain targets.
 * MNS contract is available here: https://github.com/massalabs/massa-name-system/blob/main/smart-contract/assembly/contracts/main.ts
 *
 * @example
 * ```typescript
 * const mns = await MNS.mainnet(provider);
 * const address = await mns.resolve("example");
 * ```
 *
 */

export class MNS extends SmartContract {
  constructor(provider: Provider | PublicProvider, chainId: bigint) {
    const address =
      chainId === CHAIN_ID.Mainnet
        ? MNS_CONTRACTS.mainnet
        : MNS_CONTRACTS.buildnet
    super(provider, address)
  }

  static async init(provider: Provider | PublicProvider): Promise<MNS> {
    const { chainId } = await provider.networkInfos()
    return new MNS(provider, chainId)
  }

  static mainnet(provider: Provider | PublicProvider): MNS {
    checkNetwork(provider, true)
    return new MNS(provider, CHAIN_ID.Mainnet)
  }

  static buildnet(provider: Provider | PublicProvider): MNS {
    checkNetwork(provider, false)
    return new MNS(provider, CHAIN_ID.Buildnet)
  }

  // Resolve domain name (without ".massa") to address
  async resolve(name: string, options?: ReadSCOptions): Promise<string> {
    const res = await this.read(
      'dnsResolve',
      new Args().addString(name),
      options
    )
    return bytesToStr(res.value)
  }

  // deprecated. Use getDomainsFromTarget instead
  async fromAddress(
    address: string,
    options?: ReadSCOptions
  ): Promise<string[]> {
    const res = await this.read(
      'dnsReverseResolve',
      new Args().addString(address),
      options
    )
    return bytesToStr(res.value).split(',')
  }

  async getDomainsFromTarget(target: string, final = false): Promise<string[]> {
    const targetBytes = strToBytes(target)
    const filter = Uint8Array.from([
      ...DOMAIN_SEPARATOR_KEY,
      ...ADDRESS_KEY_PREFIX_V2,
      targetBytes.length,
      ...targetBytes,
    ])
    const keys = await this.provider.getStorageKeys(this.address, filter, final)
    return keys.map((key) => bytesToStr(key.slice(filter.length)))
  }

  /**
   * Returns the list of domains pointing to multiple addresses
   * @param addresses - List of addresses to resolve domains for
   * @returns Promise<string[][]> - List of domains for each address
   * @throws Error if provider implements only PublicProvider interface
   */
  async getDomainsFromMultipleAddresses(
    addresses: string[]
  ): Promise<string[][]> {
    // Check if provider implements full Provider interface (has address property)
    if (!isProvider(this.provider)) {
      throw new Error(
        'current MNS contract wrapper has PublicProvider but getDomainsFromMultipleAddresses need Provider'
      )
    }

    const publicAPI = await PublicAPI.fromProvider(this.provider)

    const caller = this.provider.address

    const results = await batchListAndCall(
      addresses,
      async (addressesBatch) => {
        // Use the PublicAPI to get datastore keys for multiple addresses in a single call
        return publicAPI.executeMultipleReadOnlyCall(
          addressesBatch.map((address) => ({
            target: this.address,
            func: 'dnsReverseResolve',
            caller: caller,
            parameter: new Args().addString(address).serialize(),
          }))
        )
      },
      DEFAULT_MAX_ARGUMENT_ARRAY_SIZE
    )

    return results.map((result) => bytesToStr(result.value).split(','))
  }

  async alloc(
    name: string,
    owner: string,
    options?: CallSCOptions
  ): Promise<Operation> {
    return this.call(
      'dnsAlloc',
      new Args().addString(name).addString(owner),
      options
    )
  }

  async getTokenId(name: string): Promise<bigint> {
    const key = Uint8Array.from([
      ...DOMAIN_SEPARATOR_KEY,
      ...TOKEN_ID_KEY_PREFIX,
      ...strToBytes(name),
    ])
    const data = await this.provider.readStorage(this.address, [key], true)
    if (data[0] == null) {
      throw new ErrorDataEntryNotFound({
        key: key,
        address: this.address,
        details: `mns Domain ${name} not found`,
      })
    }
    return U256.fromBytes(data[0])
  }

  async free(name: string, options?: CallSCOptions): Promise<Operation> {
    const tokenId = await this.getTokenId(name)
    return this.call('dnsFree', new Args().addU256(tokenId), options)
  }

  async updateTarget(
    name: string,
    newTarget: string,
    options?: CallSCOptions
  ): Promise<Operation> {
    return this.call(
      'dnsUpdateTarget',
      new Args().addString(name).addString(newTarget),
      options
    )
  }

  async getOwnedDomains(address: string, final = false): Promise<string[]> {
    const filter = Uint8Array.from([
      ...OWNED_TOKENS_KEY,
      ...strToBytes(address),
    ])
    const ownedKeys = await this.provider.getStorageKeys(
      this.address,
      filter,
      final
    )

    const domainKeys = ownedKeys.map((k) => {
      const tokenIdBytes = k.slice(filter.length)
      return Uint8Array.from([
        ...DOMAIN_SEPARATOR_KEY,
        ...DOMAIN_KEY_PREFIX,
        ...tokenIdBytes,
      ])
    })
    const domainsBytes = await this.provider.readStorage(
      this.address,
      domainKeys,
      final
    )
    return domainsBytes.map((d, i) => {
      if (!d) {
        throw new ErrorDataEntryNotFound({
          key: ownedKeys[i],
          address: this.address,
          details: `Domain with tokenId ${U256.fromBytes(ownedKeys[i].slice(filter.length))} not found`,
        })
      }
      return bytesToStr(d as Uint8Array)
    })
  }

  async getTargets(domains: string[], final = false): Promise<string[]> {
    const targetDataStoreEntries = domains.map((name) =>
      Uint8Array.from([
        ...DOMAIN_SEPARATOR_KEY,
        ...TARGET_KEY_PREFIX,
        ...strToBytes(name),
      ])
    )

    const targetsBytes = await this.provider.readStorage(
      this.address,
      targetDataStoreEntries,
      final
    )

    return targetsBytes.map(bytesToStr)
  }

  async dnsAllocCost(domain: string, options?: ReadSCOptions): Promise<bigint> {
    const res = await this.read(
      'dnsAllocCost',
      new Args().addString(domain),
      options
    )

    if (res.info.error) throw new Error(res.info.error)

    return U64.fromBytes(res.value)
  }

  async transferFrom(
    domain: string,
    currentOwner: string,
    newOwner: string,
    options?: CallSCOptions
  ): Promise<Operation> {
    const tokenId = await this.getTokenId(domain)
    const args = new Args()
      .addString(currentOwner)
      .addString(newOwner)
      .addU256(tokenId)

    return this.call('transferFrom', args, options)
  }

  async balanceOf(owner: string, options?: ReadSCOptions): Promise<bigint> {
    const res = await this.read(
      'balanceOf',
      new Args().addString(owner),
      options
    )
    return U256.fromBytes(res.value)
  }
}
