"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ClientFactory_1 = require("../web3/ClientFactory");
(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        // init client
        const web3Client = ClientFactory_1.ClientFactory.createDefaultClient(ClientFactory_1.DefaultProviderUrls.LABNET, true);
        // init vault
        web3Client.vault().init();
        // set password to vault
        web3Client.vault().setPassword("supersecret");
        // export vault
        const exportedVault = web3Client.vault().exportVault();
        console.log("Export vault ", exportedVault);
        // encrypt vault
        const encryptedVault = yield web3Client.vault().encryptVault();
        console.log("Encrypted vault ", encryptedVault);
        // decrypt vault
        const decryptedVault = yield web3Client.vault().decryptVault(encryptedVault);
        console.log("Decrypted Vault ", decryptedVault);
        // recover vault
        const recoveredVault = web3Client.vault().recoverVault(exportedVault.mnemonic);
        console.log("Recovered Vault ", recoveredVault);
    }
    catch (ex) {
        console.error("Error = ", ex.message);
    }
}))();
//# sourceMappingURL=vault.js.map