/** Supported Massa networks */
export type ContentHashNetwork = 'mainnet' | 'buildnet'

/** MNS domain name target (e.g. "example.massa") */
export type MnsTarget = {
  type: 'mns'
  value: string
}

/** Smart-contract address target (e.g. "AS1...") */
export type ScTarget = {
  type: 'sc'
  value: string
}

/** Gossip ID target (e.g. "gossip1...") */
export type GossipIdTarget = {
  type: 'gossip-id'
  value: string
}

/** Union of all possible target types */
export type Target = MnsTarget | ScTarget | GossipIdTarget

/** DeWeb contenthash: resolves to a file on a Massa DeWeb site */
export type DewebContentHash = {
  network: ContentHashNetwork
  feature: 'deweb'
  target: MnsTarget | ScTarget
  path: string
}

/** Gossip contenthash: resolves to a Gossip participant */
export type GossipContentHash = {
  network: ContentHashNetwork
  feature: 'gossip'
  target: GossipIdTarget
}

/** A fully decoded Massa contenthash */
export type MassaContentHash = DewebContentHash | GossipContentHash
