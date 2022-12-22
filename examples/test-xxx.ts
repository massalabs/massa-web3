import { IAccount } from "../src/interfaces/IAccount";
import { IContractData } from "../src/interfaces/IContractData";
import { IEventFilter } from "../src/interfaces/IEventFilter";
import { ClientFactory, DefaultProviderUrls } from "../src/web3/ClientFactory";
import { IEvent } from "../src/interfaces/IEvent";
import { IReadData } from "../src/interfaces/IReadData";
import { WalletClient } from "../src/web3/WalletClient";
import { ISlot } from "../src/interfaces/ISlot";
import { IGetGraphInterval } from "../src/interfaces/IGetGraphInterval";

const chalk = require("chalk");
const ora = require("ora");

const DEPLOYER_SECRET_KEY = "S1268yms2xCq4ahDNp6jXiz8QRYTxRa2wQTDeMyyxTRCDTpcnbGn";

(async () => {

    const header = "=".repeat(process.stdout.columns - 1);
    console.log(header);
    console.log(`${chalk.green.bold("Massa Smart Contract Interaction Example")}`);
    console.log(header);

    const deployementScPath = "./examples/smartContracts/contracts/deployer.wasm";
    const deployedScPath = "./examples/smartContracts/contracts/sc.wasm";

    try {
        // init client
        const deployerAccount: IAccount = await WalletClient.getAccountFromSecretKey(DEPLOYER_SECRET_KEY);
        const web3Client = await ClientFactory.createDefaultClient(DefaultProviderUrls.LOCALNET, true, deployerAccount);

        // finally get some read state
        const readTxId = await web3Client.publicApi().getBlockcliqueBlockBySlot({
            period: 234,
            thread: 22,
        } as ISlot);
        console.log("Response ", readTxId.header.content);
    } catch (ex) {
        console.error(`Error = ${ex}`);
    }
})();