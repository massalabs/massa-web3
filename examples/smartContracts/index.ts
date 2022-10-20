import { IAccount } from "../../src/interfaces/IAccount";
import { IContractData } from "../../src/interfaces/IContractData";
import { IEventFilter } from "../../src/interfaces/IEventFilter";
import { ClientFactory, DefaultProviderUrls } from "../../src/web3/ClientFactory";
import { IEvent } from "../../src/interfaces/IEvent";
import { ICallData } from "../../src/interfaces/ICallData";
import { IReadData } from "../../src/interfaces/IReadData";
import { WalletClient } from "../../src/web3/WalletClient";
import { deploySmartContract } from "@massalabs/massa-sc-utils";
import { IDatastoreEntryInput } from "../../src/interfaces/IDatastoreEntryInput";
const chalk = require("chalk");
const ora = require("ora");

(async () => {

    const header = "=".repeat(process.stdout.columns - 1);
    console.log(header);
    console.log(`${chalk.green.bold("Massa Smart Contract Interaction Example")}`);
    console.log(header);

    const smartContractPath = "./examples/smartContracts/smartContract.wasm";
    let spinner;

    try {
        // init client
        const baseAccount: IAccount = await WalletClient.walletGenerateNewAccount();
        const web3Client = await ClientFactory.createDefaultClient(DefaultProviderUrls.TESTNET, true, baseAccount);

        // deploy smart contract
        spinner = ora(`Running ${chalk.green("deployment")} of smart contract....`).start();
        const deployTxId = await deploySmartContract(smartContractPath, {
            fee: 0,
            maxGas: 200000,
            gasPrice: 0,
            coins: 0,
        } as IContractData, DefaultProviderUrls.LABNET, baseAccount, true);
        const deploymentOperationId = deployTxId[0];
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
        spinner.succeed(`Sc events received: ${chalk.yellow(events)}`);

        // find an event that contains the emitted sc address
        spinner = ora(`Extracting deployed sc address from events....`).start();
        const addressEvent: IEvent|undefined = events.find(event => event.data.includes("Address:"));
        if (!addressEvent) {
            throw new Error("No events were emitted from contract containing a message `Address:...`. Please make sure to include such a message in order to fetch the sc address");
        }
        const scAddress: string = addressEvent.data.split(":")[1];
        spinner.succeed(`Smart Contract Address: ${chalk.yellow(scAddress)}`);

        // send a sc operation
        spinner = ora(`Calling smart contract function...`).start();
        const callTxId = await web3Client.smartContracts().callSmartContract({
            fee: 0,
            gasPrice: 0,
            maxGas: 200000,
            coins: 0,
            targetAddress: scAddress,
            functionName: "play",
            parameter: JSON.stringify({index : 1}),
        } as ICallData);
        const callScOperationId = callTxId[0];
        spinner.succeed(`Called smart contract with operation ID ${chalk.yellow(callScOperationId)}`);

        // finally get some read state
        spinner = ora(`Reading a smart contract state...`).start();
        const readTxId = await web3Client.smartContracts().readSmartContract({
            fee: 0,
            maxGas: 200000,
            simulatedGasPrice: 0,
            targetAddress: scAddress,
            targetFunction: "getGameState",
            parameter: "undefined",
        } as IReadData);
        const readScOperationId = readTxId[0];
        spinner.succeed(`Called read contract with operation ID ${chalk.yellow(JSON.stringify(readScOperationId, null, 4))}`);

        // get sc storage data
        spinner = ora(`Reading a smart state entry...`).start();
        const scStorageData = await web3Client.publicApi().getDatastoreEntries([{address: scAddress, key: "gameState" } as IDatastoreEntryInput]);
        spinner.succeed(`Got smart contract storage data for key: ${chalk.yellow(JSON.stringify(scStorageData, null, 4))}`);

    } catch (ex) {
        const msg = chalk.red(`Error = ${ex.message}`);
        if (spinner) spinner.fail(msg);
    }
})();
