/**
 * Multicodec codes for Massa contenthash encoding (ENSIP-7 compatible).
 *
 * These codes follow the `0xbX9910` namespace convention used by other
 * blockchain ecosystems (skynet, arweave, subspace, kumandra) in the
 * multiformats/multicodec table.
 *
 * @see https://github.com/multiformats/multicodec
 * @see https://docs.ens.domains/ensip/7/
 */

/* eslint-disable @typescript-eslint/no-magic-numbers */

import type { ContentHashNetwork } from './types'

/** Massa blockchain ecosystem identifier */
export const MASSA = 0xb59910

/** Massa mainnet network identifier */
export const MASSA_MAINNET = 0xb59911

/** Massa buildnet network identifier */
export const MASSA_BUILDNET = 0xb59912

/** Massa DeWeb decentralized web feature */
export const MASSA_DEWEB = 0xb59913

/** Massa Gossip decentralized messaging feature */
export const MASSA_GOSSIP = 0xb59914

/** Massa Name Service target */
export const MASSA_MNS = 0xb59915

/** Massa smart-contract address target */
export const MASSA_SC = 0xb59916

/** Massa Gossip ID target */
export const MASSA_GOSSIP_ID = 0xb59917

/** Path namespace (standard multicodec 0x2f) */
export const PATH = 0x2f

/** Set of codecs that carry no payload (empty-value markers) */
export const EMPTY_VALUE_CODECS = new Set([
  MASSA,
  MASSA_MAINNET,
  MASSA_BUILDNET,
  MASSA_DEWEB,
  MASSA_GOSSIP,
])

/** Map from network name to its codec */
export const NETWORK_CODECS: Record<ContentHashNetwork, number> = {
  mainnet: MASSA_MAINNET,
  buildnet: MASSA_BUILDNET,
}

/** Reverse map from codec to network name */
export const CODEC_TO_NETWORK: Record<number, ContentHashNetwork> = {
  [MASSA_MAINNET]: 'mainnet',
  [MASSA_BUILDNET]: 'buildnet',
}
