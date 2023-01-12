import { IAccount } from "../../src/interfaces/IAccount";
import { IContractData } from "../../src/interfaces/IContractData";
import { IEventFilter } from "../../src/interfaces/IEventFilter";
import { ClientFactory, DefaultProviderUrls } from "../../src/web3/ClientFactory";
import { IEvent } from "../../src/interfaces/IEvent";
import { IReadData } from "../../src/interfaces/IReadData";
import { WalletClient } from "../../src/web3/WalletClient";
import { deploySmartContract } from "./deployer";
import { Args } from "../../src/utils/arguments";

const chalk = require("chalk");
const ora = require("ora");

const DEPLOYER_SECRET_KEY = "S1LoQ2cyq273f2TTi1qMYH6qgntAtpn85PbMd9qr2tS7S6A64cC";

(async () => {

  const header = "=".repeat(process.stdout.columns - 1);
  console.log(header);
  console.log(`${chalk.green.bold("Massa Smart Contract Interaction Example")}`);
  console.log(header);

  const deployementScPath = "./examples/smartContracts/contracts/deployer.wasm";
  const deployedScPath = "./examples/smartContracts/contracts/sc.wasm";
  let spinner;

  try {
    // init client
    const deployerAccount: IAccount = await WalletClient.getAccountFromSecretKey(DEPLOYER_SECRET_KEY);
    const web3Client = await ClientFactory.createDefaultClient(DefaultProviderUrls.TESTNET, true, deployerAccount);

    // deploy smart contract
    spinner = ora(`Running ${chalk.green("deployment")} of smart contract....`).start();
    const datastoreMap: Map<Uint8Array, Uint8Array> = new Map();
    datastoreMap.set(new Uint8Array(Buffer.from("key")), new Uint8Array(Buffer.from("value")));
    const deploymentOperationId = await deploySmartContract(deployementScPath, deployedScPath, {
      fee: 0,
      maxGas: 200000,
      gasPrice: 0,
      coins: 0,
      datastore: datastoreMap
    } as IContractData, web3Client, true, deployerAccount);
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
    const addressEvent: IEvent | undefined = events.find(event => event.data.includes("SC created at:"));
    if (!addressEvent) {
      throw new Error("No events were emitted from contract containing a message `SC created at:...`. Please make sure to include such a message in order to fetch the sc address");
    }
    const scAddress: string = addressEvent.data.split(":")[1];
    spinner.succeed(`Smart Contract Address: ${chalk.yellow(scAddress)}`);

    // finally get some read state
    spinner = ora(`Reading a smart contract state...`).start();
    const args = new Args();
    const result = await web3Client.smartContracts().readSmartContract({
      fee: 0,
      maxGas: 800000,
      targetAddress: scAddress,
      targetFunction: "event",
      parameter: args.serialize(),
    } as IReadData);
    spinner.succeed(`Called read contract with operation ID ${chalk.yellow(JSON.stringify(result, null, 4))}`);
    console.info("Read Operation Result", Buffer.from(result.returnValue).toString("utf16le"));
  } catch (ex) {
    const msg = chalk.red(`Error = ${ex}`);
    if (spinner) spinner.fail(msg);
  }
})();