"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ClientFactory_1 = require("../web3/ClientFactory");
const baseAccount = {
    publicKey: "5Jwx18K2JXacFoZcPmTWKFgdG1mSdkpBAUnwiyEqsVP9LKyNxR",
    privateKey: "2SPTTLK6Vgk5zmZEkokqC3wgpKgKpyV5Pu3uncEGawoGyd4yzC",
    address: "9mvJfA4761u1qT8QwSWcJ4gTDaFP5iSgjQzKMaqTbrWCFo1QM"
};
(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        // init client
        const web3Client = ClientFactory_1.ClientFactory.createDefaultClient(ClientFactory_1.DefaultProviderUrls.LABNET, true, baseAccount);
        // init the vault
        web3Client.vault().setPassword("supersecret");
        web3Client.vault().init();
        console.log("EXPORTED VAULT ", web3Client.vault().exportVault());
        const encrypted = yield web3Client.vault().encryptVault();
        console.log("ENCRYPTED VAULT ", encrypted);
        const decrypted = yield web3Client.vault().decryptVault(encrypted);
        console.log("DECRYPTED VAULT ", decrypted);
    }
    catch (ex) {
        console.error("Error = ", ex.message);
    }
}))();
//# sourceMappingURL=sc.js.map