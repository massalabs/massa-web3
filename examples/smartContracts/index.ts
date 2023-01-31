import { IAccount } from "../../src/interfaces/IAccount";
import { IEventFilter } from "../../src/interfaces/IEventFilter";
import { ClientFactory, DefaultProviderUrls } from "../../src/web3/ClientFactory";
import { IEvent } from "../../src/interfaces/IEvent";
import { IReadData } from "../../src/interfaces/IReadData";
import { WalletClient } from "../../src/web3/WalletClient";
import { deploySmartContracts } from "./deployer";
import { Args } from "../../src/utils/arguments";
import { readFileSync } from "fs";
import { MassaCoin } from "../../src/web3/MassaCoin";
const path = require("path");
const chalk = require("chalk");
const ora = require("ora");

const DEPLOYER_SECRET_KEY = "S1NA786im4CFL5cHSmsGkGZFEPxqvgaRP8HXyThQSsVnWj4tR7d";

(async () => {

    const header = "=".repeat(process.stdout.columns - 1);
    console.log(header);
    console.log(`${chalk.green.bold("Massa Smart Contract Interaction Example")}`);
    console.log(header);

    let spinner;
    try {
        // init client
        const deployerAccount: IAccount = await WalletClient.getAccountFromSecretKey(DEPLOYER_SECRET_KEY);
        const web3Client = await ClientFactory.createDefaultClient(DefaultProviderUrls.LABNET, true, deployerAccount);
        const deployerAccountBalance = await web3Client.wallet().getAccountBalance(deployerAccount.address as string);
        console.log(`Deployer Wallet Address: ${deployerAccount.address} with balance (candidate, final) = (${deployerAccountBalance?.candidate.rawValue()}, ${deployerAccountBalance?.final.rawValue()})`);

        // deploy smart contract
        spinner = ora(`Running ${chalk.green("deployment")} of deployer smart contract....`).start();
        const deploymentOperationId = await deploySmartContracts(
            [{
                data: readFileSync(
					path.join(__dirname, ".", "contracts", "/sc.wasm"),
				),
                args: undefined,
                coins: new MassaCoin(12.5)
            }],
            web3Client,
            true,
            0,
            1_000_000,
            deployerAccount,
        );
        spinner.succeed(`Deployed Smart Contract ${chalk.green("successfully")} with opId ${deploymentOperationId}`);

        // poll smart contract events for the opId
        spinner = ora(`Filtering for sc events....`).start();
        const eventsFilter = {
            start: null,
            end: null,
            original_caller_address: null,
            original_operation_id: deploymentOperationId,
            emitter_address: null,
        } as IEventFilter;

        const events: Array<IEvent> = await web3Client.smartContracts().getFilteredScOutputEvents(eventsFilter);
        spinner.succeed(`Sc events received: ${chalk.yellow(JSON.stringify(events, null, 4))}`);

        // find an event that contains the emitted sc address
        spinner = ora(`Extracting deployed sc address from events....`).start();
        const addressEvent: IEvent | undefined = events.find(event => event.data.includes("Contract deployed at address"));
        if (!addressEvent) {
            throw new Error("No events were emitted from contract containing a message `SC created at:...`. Please make sure to include such a message in order to fetch the sc address");
        }
        const scAddress: string = addressEvent.data.split(":")[1].trim();
        spinner.succeed(`Smart Contract Address: ${chalk.yellow(scAddress)}`);

        // finally get some read state
        spinner = ora(`Reading a smart contract state...`).start();
        const args = new Args();
        const result = await web3Client.smartContracts().readSmartContract({
            fee: 0,
            maxGas: 700000,
            targetAddress: scAddress,
            targetFunction: "event",
            parameter: args.serialize(),
        } as IReadData);
        spinner.succeed(`Called read contract with operation ID ${chalk.yellow(JSON.stringify(result, null, 4))}`);
        console.info("Read Operation Result", Buffer.from(result.returnValue).toString("utf-8"));

        // read contract balance
        const contractBalance = await web3Client.smartContracts().getContractBalance(scAddress);
        console.info(`Deployed smart contract balance (candidate, final) = $(${contractBalance?.candidate.rawValue()},${contractBalance?.final.rawValue()})`);
    } catch (ex) {
        const msg = chalk.red(`Error = ${ex}`);
        if (spinner) spinner.fail(msg);
    }
})();