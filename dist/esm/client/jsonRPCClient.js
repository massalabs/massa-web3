import { PublicApiUrl } from '..';
import { Transport } from './types';
import { PublicAPI } from './publicAPI';
const HTTPS = 443;
const HTTP = 80;
const DEFAULT_PORTS = {
    [Transport.HTTPS]: HTTPS,
    [Transport.HTTP]: HTTP,
};
export class JsonRPCClient extends PublicAPI {
    constructor(url) {
        const u = new URL(url);
        const protocol = u.protocol === 'https:' ? Transport.HTTPS : Transport.HTTP;
        const port = u.port ? parseInt(u.port) : DEFAULT_PORTS[protocol];
        super(protocol, u.hostname, port, { path: u.pathname });
    }
    static buildnet() {
        return new JsonRPCClient(PublicApiUrl.Buildnet);
    }
    static testnet() {
        return new JsonRPCClient(PublicApiUrl.Testnet);
    }
    static mainnet() {
        return new JsonRPCClient(PublicApiUrl.Mainnet);
    }
}
//# sourceMappingURL=jsonRPCClient.js.map