import { IAccount } from "../../src/interfaces/IAccount";
import { IContractData } from "../../src/interfaces/IContractData";
import { ClientFactory, DefaultProviderUrls } from "../../src/web3/ClientFactory";
import { WalletClient } from "../../src/web3/WalletClient";
import { deploySmartContract } from "./deployer";

const chalk = require("chalk");
const ora = require("ora");

const DEPLOYER_SECRET_KEY = "S13iFJarF4v6CxYPeguUQHqkxDdGZgFhrsiEMznbnS3is9aXFps";

(async () => {

    const header = "=".repeat(process.stdout.columns - 1);
    console.log(header);
    console.log(`${chalk.green.bold("Massa Smart Contract Interaction Example")}`);
    console.log(header);

    const smartContractPath = "./examples/smartContracts/massaToken.wasm";
    let spinner;

    try {
        // init client
        const deployerAccount: IAccount = await WalletClient.getAccountFromSecretKey(DEPLOYER_SECRET_KEY);
        const web3Client = await ClientFactory.createDefaultClient(DefaultProviderUrls.TESTNET, true, deployerAccount);

        // deploy smart contract
        spinner = ora(`Running ${chalk.green("deployment")} of smart contract....`).start();
        let datastoreMap: Map<Uint8Array, Uint8Array> = new Map();
        datastoreMap.set(new Uint8Array(Buffer.from("key")), new Uint8Array(Buffer.from("value")));
        const deploymentOperationId = await deploySmartContract(smartContractPath, {
            fee: 0,
            maxGas: 200000,
            gasPrice: 0,
            coins: 0,
            datastore: datastoreMap
        } as IContractData, web3Client, true, deployerAccount);
        spinner.succeed(`Deployed Smart Contract ${chalk.green("successfully")} with opId ${deploymentOperationId}`);
    } catch (ex) {
        const msg = chalk.red(`Error = ${ex}`);
        if (spinner) spinner.fail(msg);
    }
})();