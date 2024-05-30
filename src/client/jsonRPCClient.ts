import { PublicAPI, Transport } from './publicAPI'

const HTTPS = 443
const HTTP = 80

export class JsonRPCClient extends PublicAPI {
  constructor(url: string) {
    const u = new URL(url)
    const protocol = u.protocol === 'https:' ? Transport.HTTPS : Transport.HTTP
    let port = parseInt(u.port)
    if (isNaN(port)) {
      port = protocol === Transport.HTTPS ? HTTPS : HTTP
    }
    super(protocol, u.hostname, port, { path: u.pathname })
  }
}
