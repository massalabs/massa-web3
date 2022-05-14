import { ClientFactory, DefaultProviderUrls } from "../web3/ClientFactory";

(async () => {

    try {
        // init client
        const web3Client = ClientFactory.createDefaultClient(DefaultProviderUrls.LABNET, true);

        // init vault
        web3Client.vault().init();

        // set password to vault
        web3Client.vault().setPassword("supersecret");

        // export vault
        const exportedVault = web3Client.vault().exportVault();
        console.log("Export vault ", exportedVault);

        // encrypt vault
        const encryptedVault = await web3Client.vault().encryptVault();
        console.log("Encrypted vault ", encryptedVault);

        // decrypt vault
        const decryptedVault = await web3Client.vault().decryptVault(encryptedVault);
        console.log("Decrypted Vault ", decryptedVault);

        // recover vault
        const recoveredVault = web3Client.vault().recoverVault(exportedVault.mnemonic);
        console.log("Recovered Vault ", recoveredVault);

    } catch (ex) {
        console.error("Error = ", ex.message);
    }
})();