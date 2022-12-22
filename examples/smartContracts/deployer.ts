import { IAccount } from "../../src/interfaces/IAccount";
import { IContractData } from "../../src/interfaces/IContractData";
import { SmartContractUtils } from "@massalabs/massa-sc-utils";
import { PathLike } from "fs";
import { JsonRpcClient } from "../../src/web3/JsonRpcClient";
import { ICompiledSmartContract } from "@massalabs/massa-sc-utils/dist/interfaces/ICompiledSmartContract";
import { EOperationStatus } from "../../src/interfaces/EOperationStatus";
const chalk = require("chalk");

export const deploySmartContract = async (
	deploymentScWasm: PathLike,
	deployedScWasm: PathLike,
	contractData: IContractData,
	web3Client: JsonRpcClient,
	awaitFinalization: boolean,
	deployerAccount?: IAccount
): Promise<string> => {

	let deploymentOperationId: string;
	try {

		// do checks
		if (!deployerAccount) {
			deployerAccount = web3Client.wallet().getBaseAccount();
		}

		// set default values in case of missing ones
		contractData.maxGas = contractData.maxGas || 200000;
		contractData.fee = contractData.fee || 0;

		// construct a sc utils helper
		const utils = new SmartContractUtils();

		// compile deployement sc from wasm
		console.log(`Running ${chalk.green("compilation")} of smart contract on path ${chalk.yellow(deploymentScWasm)}....`);
		let compiledSc: ICompiledSmartContract;
		try {
			compiledSc = await utils.compileSmartContractFromWasmFile(deploymentScWasm);
			console.log(`Smart Contract ${chalk.green("successfully")} compiled to deployable bytecode under ${deploymentScWasm}`);
		} catch (ex) {
			const msg = chalk.red(`Error compiling smart contract on path ${chalk.yellow(deploymentScWasm)}`);
			console.error(msg);
			throw new Error(ex);
		}
		if (!compiledSc.binary) {
			const msg = chalk.red(`No bytecode to deploy for wasm file ${chalk.yellow(deploymentScWasm)}. Check AS compiler`);
			console.error(msg);
			throw new Error(msg);
		}

		// compile deployed sc from wasm
		console.log(`Running ${chalk.green("compilation")} of smart contract on path ${chalk.yellow(deployedScWasm)}....`);
		let compiledDeployedSc: ICompiledSmartContract;
		try {
			compiledDeployedSc = await utils.compileSmartContractFromWasmFile(deployedScWasm);
			console.log(`Smart Contract ${chalk.green("successfully")} compiled to deployable bytecode under ${deployedScWasm}`);
		} catch (ex) {
			const msg = chalk.red(`Error compiling smart contract on path ${chalk.yellow(deployedScWasm)}`);
			console.error(msg);
			throw new Error(ex);
		}
		if (!compiledDeployedSc.binary) {
			const msg = chalk.red(`No bytecode to deploy for wasm file ${chalk.yellow(deployedScWasm)}. Check AS compiler`);
			console.error(msg);
			throw new Error(msg);
		}

		contractData.contractDataBinary = compiledSc.binary;
		contractData.contractDataText = compiledSc.text;
		const key1: Uint8Array = Uint8Array.from([0, 1, 2, 3, 4]);
		contractData.datastore = new Map<Uint8Array, Uint8Array>();
		contractData.datastore.set(key1, compiledDeployedSc.binary);

		// deploy smart contract
		console.log(`Running ${chalk.green("deployment")} of smart contract....`);
		let deployTxId: string[] = [];

		try {
			deployTxId = await web3Client.smartContracts().deploySmartContract(contractData, deployerAccount);
			if (deployTxId.length === 0) {
				throw new Error(`No transaction ids were produced by the deployment. Something went wrong. Please check your contract and network`);
			}
			deploymentOperationId = deployTxId[0];
			console.log(`Smart Contract ${chalk.green("successfully")} deployed to Massa Network. Operation ID ${chalk.yellow(deploymentOperationId)}`);
		} catch (ex) {
			const msg = chalk.red(`Error deploying smart contract ${chalk.yellow(deploymentScWasm)} to Massa Network`);
			console.error(msg);
			throw new Error(ex);
		}

		// await final state
		if (awaitFinalization) {
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
	} catch (ex) {
		const msg = chalk.red(`Error deploying smart contract ${chalk.yellow(deploymentScWasm)} to Massa Network`);
		console.error(msg);
		throw new Error(ex);
	}
	console.log(`Smart Contract Deployment finished!`);

	return deploymentOperationId;
};
