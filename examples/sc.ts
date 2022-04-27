import { IAccount } from "../interfaces/IAccount";
import { IContractData } from "../interfaces/IContractData";
import { IEventFilter } from "../interfaces/IEventFilter";
import { ISlot } from "../interfaces/ISlot";
import { ClientFactory, DefaultProviderUrls } from "../web3/ClientFactory";
import { SmartContractUtils, ICompiledSmartContract } from "massa-sc-utils";
import { IEvent } from "../interfaces/IEvent";
import { EventPoller } from "../web3/EventPoller";
import { ICallData } from "../interfaces/ICallData";
import { EOperationStatus } from "../interfaces/EOperationStatus";
import { wait } from "../utils/Wait";
import { IReadData } from "../interfaces/IReadData";
import { VaultClient } from "../web3/VaultClient";
import { WalletClient } from "../web3/WalletClient";

const baseAccount = {
    publicKey: "5Jwx18K2JXacFoZcPmTWKFgdG1mSdkpBAUnwiyEqsVP9LKyNxR",
    privateKey: "2SPTTLK6Vgk5zmZEkokqC3wgpKgKpyV5Pu3uncEGawoGyd4yzC",
    address: "9mvJfA4761u1qT8QwSWcJ4gTDaFP5iSgjQzKMaqTbrWCFo1QM"
} as IAccount;

(async () => {

    try {
        // init client
        const web3Client = ClientFactory.createDefaultClient(DefaultProviderUrls.LABNET, true, baseAccount);

        // init the vault
        web3Client.vault().setPassword("supersecret");
        web3Client.vault().init();
        console.log("EXPORTED VAULT ", web3Client.vault().exportVault());
        const encrypted = await web3Client.vault().encryptVault();
        console.log("ENCRYPTED VAULT ", encrypted);

        const decrypted = await web3Client.vault().decryptVault(encrypted);
        console.log("DECRYPTED VAULT ", decrypted);

    } catch (ex) {
        console.error("Error = ", ex.message);
    }
})();