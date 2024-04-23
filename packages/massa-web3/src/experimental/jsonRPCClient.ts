import { PublicAPI, Transport } from './publicAPI'

export class JsonRPCClient extends PublicAPI {
  constructor(url: string) {
    const u = new URL(url)
    const protocol = u.protocol === 'https:' ? Transport.https : Transport.http
    let port = parseInt(u.port)
    if (isNaN(port)) {
      port = protocol === Transport.https ? 443 : 80
    }
    super(protocol, u.hostname, port, u.pathname)
  }
}
