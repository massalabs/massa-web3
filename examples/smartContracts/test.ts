import { IAccount } from "../../src/interfaces/IAccount";
import { ClientFactory, DefaultProviderUrls } from "../../src/web3/ClientFactory";
import { WalletClient } from "../../src/web3/WalletClient";
import { Args } from "../../src/utils/arguments";

const chalk = require("chalk");
const ora = require("ora");

const DEPLOYER_SECRET_KEY = "S1LoQ2cyq273f2TTi1qMYH6qgntAtpn85PbMd9qr2tS7S6A64cC";

(async () => {

    const header = "=".repeat(process.stdout.columns - 1);
    console.log(header);
    console.log(`${chalk.green.bold("Massa Smart Contract Interaction Example")}`);
    console.log(header);

    let spinner;

    try {
        // init client
        const deployerAccount: IAccount = await WalletClient.getAccountFromSecretKey(DEPLOYER_SECRET_KEY);
        console.log(`Wallet Address Key ${deployerAccount.address}`);
        const web3Client = await ClientFactory.createDefaultClient(DefaultProviderUrls.TESTNET, true, deployerAccount);

        const scBalance = "A12XATuifcrJjND38hS98h1H7sXx6q8aweL11K99Vt3SdVeSBVvA";

        // finally get some read state
        spinner = ora(`Reading a smart contract state...`).start();
        const args = new Args();
        const result = await web3Client.smartContracts().getContractBalance(scBalance);
        spinner.succeed(`Called read contract with operation ID ${chalk.yellow(JSON.stringify(result, null, 4))}`);
    } catch (ex) {
        const msg = chalk.red(`Error = ${ex}`);
        if (spinner) spinner.fail(msg);
    }
})();