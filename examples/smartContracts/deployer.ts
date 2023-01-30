import { IAccount } from "../../src/interfaces/IAccount";
import { IContractData } from "../../src/interfaces/IContractData";
import { Client } from "../../src/web3/Client";
import { EOperationStatus } from "../../src/interfaces/EOperationStatus";
import { Args } from "../../src/utils/arguments";
import { readFileSync } from "fs";
const path = require("path");
const chalk = require("chalk");

interface ISCData {
	data: Uint8Array;
	args?: Args;
	coins: number;
}

async function checkBalance(web3Client: Client, account: IAccount) {
	const balance = await web3Client.wallet().getAccountBalance(account.address as string);
	console.log("Wallet balance: ", balance?.final);
	if (!balance?.final || !parseFloat(balance.final) || parseFloat(balance.final) === 0.0) {
	  throw new Error("Insufficient MAS balance.");
	}
}

async function awaitTxConfirmation(web3Client: Client, deploymentOperationId: string): Promise<void> {
	console.log(`Awaiting ${chalk.green("FINAL")} transaction status....`);
	let status: EOperationStatus;
	try {
		status = await web3Client.smartContracts().awaitRequiredOperationStatus(deploymentOperationId, EOperationStatus.FINAL);
		console.log(`Transaction with Operation ID ${chalk.yellow(deploymentOperationId)} has reached finality!`);
	} catch (ex) {
		const msg = chalk.red(`Error getting finality of transaction ${chalk.yellow(deploymentOperationId)}`);
		console.error(msg);
		throw new Error(ex);
	}

	if (status !== EOperationStatus.FINAL) {
		const msg = chalk.red(`Transaction ${chalk.yellow(deploymentOperationId)} did not reach finality after considerable amount of time. Try redeploying anew`);
		console.error(msg);
		throw new Error(msg);
	}
}

export const deploySmartContracts = async (
	contractsToDeploy: ISCData[],
	web3Client: Client,
	awaitFinalization: boolean = false,
	fee: number = 0,
	maxGas: number = 1_000_000,
	deployerAccount?: IAccount,
): Promise<string> => {

	let deploymentOperationId: string;
	try {

		// do checks
		if (!deployerAccount) {
			deployerAccount = web3Client.wallet().getBaseAccount();
		}

		// check deployer account balance
		await checkBalance(web3Client, deployerAccount);

		// construct a new datastore
		const datastore = new Map<Uint8Array, Uint8Array>();

		// set the number of contracts
		datastore.set(
		  new Uint8Array([0x00]),
		  new Uint8Array(new Args().addU64(BigInt(contractsToDeploy.length)).serialize()),
		);
		// loop through all contracts and fill datastore
		for (let i = 0; i < contractsToDeploy.length; i++) {
			const contract: ISCData = contractsToDeploy[i];

			datastore.set(
				new Uint8Array(new Args().addU64(BigInt(i + 1)).serialize()),
				contract.data,
			);
			if (contract.args) {
				datastore.set(
					new Uint8Array(
					new Args()
						.addU64(BigInt(i + 1))
						.addUint8Array(new Uint8Array([0x00]))
						.serialize(),
					),
					new Uint8Array(contract.args.serialize()),
				);
			}
			if (contract.coins > 0) {
				datastore.set(
					new Uint8Array(
					new Args()
						.addU64(BigInt(i + 1))
						.addUint8Array(new Uint8Array([0x01]))
						.serialize(),
					),
					new Uint8Array(new Args().addU64(BigInt(contract.coins)).serialize()),
				);
			}
		}

		// deploy deployer contract
		console.log(`Running ${chalk.green("deployment")} of smart contract....`);
		try {
			const coins = contractsToDeploy.reduce((acc, contract) => acc + contract.coins, 0);
			console.log("Sending coins ... ", coins);
			deploymentOperationId = await web3Client.smartContracts().deploySmartContract({
				coins,
				contractDataBinary: readFileSync(
					path.join(__dirname, ".", "contracts", "/deployer.wasm"),
				),
				datastore,
				fee,
				maxGas,
			} as IContractData, deployerAccount);
			console.log(`Smart Contract ${chalk.green("successfully")} deployed to Massa Network. Operation ID ${chalk.yellow(deploymentOperationId)}`);
		} catch (ex) {
			const msg = chalk.red(`Error deploying deployer smart contract to Massa Network`);
			console.error(msg);
			throw new Error(ex);
		}

		// await finalization if required
		if (awaitFinalization) await awaitTxConfirmation(web3Client, deploymentOperationId);

	} catch (ex) {
		const msg = chalk.red(`Error deploying deployer smart contract to Massa Network`);
		console.error(msg);
		throw new Error(ex);
	}
	console.log(`Smart Contract Deployment finished!`);

	return deploymentOperationId;
};
