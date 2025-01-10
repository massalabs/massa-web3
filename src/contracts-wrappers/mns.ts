import { Args, bytesToStr, strToBytes, U256, U64 } from '../basicElements'
import { Operation } from '../operation'
import { Provider, PublicProvider } from '../provider'
import { CallSCOptions, ReadSCOptions, SmartContract } from '../smartContracts'
import { checkNetwork } from './tokens'

export const MNS_CONTRACTS = {
  mainnet: 'AS1q5hUfxLXNXLKsYQVXZLK7MPUZcWaNZZsK7e9QzqhGdAgLpUGT',
  buildnet: 'AS12qKAVjU1nr66JSkQ6N4Lqu4iwuVc6rAbRTrxFoynPrPdP1sj3G',
}

/**
 * @class MNS
 * @extends SmartContract
 *
 * The MNS class provides methods to interact with the Massa Name Service (MNS) smart contract.
 * It allows resolving domain names, reverse resolving addresses, allocating domains, freeing domains,
 * and updating domain targets.
 * MNS contract is available here: https://github.com/massalabs/massa-name-service/blob/main/smart-contract/assembly/contracts/main.ts
 *
 * @example
 * ```typescript
 * const mns = await MNS.mainnet(provider);
 * const address = await mns.resolve("example");
 * ```
 *
 */

// Constants are taken from the smart contract
// https://github.com/massalabs/massa-name-service/blob/main/smart-contract/assembly/contracts/main.ts
// eslint-disable-next-line  @typescript-eslint/no-magic-numbers
const DOMAIN_SEPARATOR_KEY = [0x42]
const TOKEN_ID_KEY_PREFIX = [0x1]
// eslint-disable-next-line  @typescript-eslint/no-magic-numbers
const DOMAIN_KEY_PREFIX = [0x3]
const OWNED_TOKENS_KEY = strToBytes('ownedTokens')

export class MNS extends SmartContract {
  static mainnet(provider: Provider | PublicProvider): MNS {
    checkNetwork(provider, true)
    return new MNS(provider, MNS_CONTRACTS.mainnet)
  }

  static buildnet(provider: Provider | PublicProvider): MNS {
    checkNetwork(provider, false)
    return new MNS(provider, MNS_CONTRACTS.buildnet)
  }

  // Resolve domain name (without "".massa") to address
  async resolve(name: string, options?: ReadSCOptions): Promise<string> {
    const res = await this.read(
      'dnsResolve',
      new Args().addString(name),
      options
    )
    return bytesToStr(res.value)
  }

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

  private async getTokenId(name: string): Promise<bigint> {
    const key = Uint8Array.from([
      ...DOMAIN_SEPARATOR_KEY,
      ...TOKEN_ID_KEY_PREFIX,
      ...strToBytes(name),
    ])
    const data = await this.provider.readStorage(this.address, [key], true)
    if (!data.length) {
      throw new Error(`Domain ${name} not found`)
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
    const ownedkeys = await this.provider.getStorageKeys(
      this.address,
      filter,
      final
    )

    const domainKeys = ownedkeys.map((k) => {
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
    return domainsBytes.map((d) => bytesToStr(d))
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
}
