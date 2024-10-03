"use strict";
/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-magic-numbers */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHAIN_ID = exports.NetworkName = exports.PublicApiUrl = void 0;
var PublicApiUrl;
(function (PublicApiUrl) {
    PublicApiUrl["Mainnet"] = "https://mainnet.massa.net/api/v2";
    PublicApiUrl["Testnet"] = "https://testnet.massa.net/api/v2";
    PublicApiUrl["Buildnet"] = "https://buildnet.massa.net/api/v2";
})(PublicApiUrl || (exports.PublicApiUrl = PublicApiUrl = {}));
var NetworkName;
(function (NetworkName) {
    NetworkName["Mainnet"] = "mainnet";
    NetworkName["Testnet"] = "testnet";
    NetworkName["Buildnet"] = "buildnet";
})(NetworkName || (exports.NetworkName = NetworkName = {}));
exports.CHAIN_ID = {
    Mainnet: 77658377n,
    Testnet: 77658376n,
    Buildnet: 77658366n,
};
//# sourceMappingURL=networks.js.map