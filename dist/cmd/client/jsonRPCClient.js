"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonRPCClient = void 0;
const __1 = require("..");
const types_1 = require("./types");
const publicAPI_1 = require("./publicAPI");
const HTTPS = 443;
const HTTP = 80;
const DEFAULT_PORTS = {
    [types_1.Transport.HTTPS]: HTTPS,
    [types_1.Transport.HTTP]: HTTP,
};
class JsonRPCClient extends publicAPI_1.PublicAPI {
    constructor(url) {
        const u = new URL(url);
        const protocol = u.protocol === 'https:' ? types_1.Transport.HTTPS : types_1.Transport.HTTP;
        const port = u.port ? parseInt(u.port) : DEFAULT_PORTS[protocol];
        super(protocol, u.hostname, port, { path: u.pathname });
    }
    static buildnet() {
        return new JsonRPCClient(__1.PublicApiUrl.Buildnet);
    }
    static testnet() {
        return new JsonRPCClient(__1.PublicApiUrl.Testnet);
    }
    static mainnet() {
        return new JsonRPCClient(__1.PublicApiUrl.Mainnet);
    }
}
exports.JsonRPCClient = JsonRPCClient;
//# sourceMappingURL=jsonRPCClient.js.map