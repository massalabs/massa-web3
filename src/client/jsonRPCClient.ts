import { PublicApiUrl } from '..'
import { PublicAPI, Transport } from './publicAPI'

const HTTPS = 443
const HTTP = 80

const DEFAULT_PORTS = {
  [Transport.HTTPS]: HTTPS,
  [Transport.HTTP]: HTTP,
}

export class JsonRPCClient extends PublicAPI {
  constructor(url: string) {
    const u = new URL(url)
    const protocol = u.protocol === 'https:' ? Transport.HTTPS : Transport.HTTP
    const port = u.port ? parseInt(u.port) : DEFAULT_PORTS[protocol]

    super(protocol, u.hostname, port, { path: u.pathname })
  }

  static buildnet(): JsonRPCClient {
    return new JsonRPCClient(PublicApiUrl.Buildnet)
  }

  static testnet(): JsonRPCClient {
    return new JsonRPCClient(PublicApiUrl.Testnet)
  }

  static mainnet(): JsonRPCClient {
    return new JsonRPCClient(PublicApiUrl.Mainnet)
  }
}
