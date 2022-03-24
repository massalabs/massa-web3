import * as wasmCli from "assemblyscript/cli/asc";
import * as fs from "fs";
import * as path from "path";
import { IAccount } from "../interfaces/IAccount";
import { IClientConfig } from "../interfaces/IClientConfig";
import { IContractData } from "../interfaces/IContractData";
import { ILatestPeriodInfo } from "../interfaces/ILatestPeriodInfo";
import { INodeStatus } from "../interfaces/INodeStatus";
import { JSON_RPC_REQUEST_METHOD } from "../interfaces/JsonRpcMethods";
import { OperationTypeId } from "../interfaces/OperationTypes";
import { BaseClient } from "./BaseClient";
import { PublicApiClient } from "./PublicApiClient";
import { WalletClient } from "./WalletClient";

export interface CompiledSmartContract {
	binary: Uint8Array,
	text: string,
}

export interface WasmConfig {
	smartContractFilePath: fs.PathLike;
	wasmBinaryPath?: fs.PathLike;
	wasmTextPath?: fs.PathLike;
}

/** Smart Contracts Client which enables compilation, deployment and streaming of events */
export class SmartContractsClient extends BaseClient {
	private isWebAssemblyCliInitialized = false;

	public constructor(clientConfig: IClientConfig, private readonly publicApiClient: PublicApiClient, private readonly walletClient: WalletClient) {
		super(clientConfig);

		// bind class methods
		this.initWebAssemblyCli = this.initWebAssemblyCli.bind(this);
		this.compileSmartContractFromString = this.compileSmartContractFromString.bind(this);
		this.compileSmartContractFromFile = this.compileSmartContractFromFile.bind(this);
		this.executeSC = this.executeSC.bind(this);
	}

	/** initializes the webassembly cli under the hood */
	private async initWebAssemblyCli(): Promise<void> {
		try {
			await wasmCli.ready;
		} catch (ex) {
			console.error("Error initializing wasm cli", ex);
			throw ex;
		}
		this.isWebAssemblyCliInitialized = true;
	}

	/** compile smart contract on the fly using the assemblyscript smart contract code as a string */
	public async compileSmartContractFromString(smartContractContent: string): Promise<CompiledSmartContract> {

		if (!this.isWebAssemblyCliInitialized) {
			await this.initWebAssemblyCli();
		}

		let compiledData: { stdout: wasmCli.OutputStream, stderr: wasmCli.OutputStream, binary: Uint8Array, text: string } = null;
		try {
			const virtualFiles = { "input.ts": smartContractContent };
			compiledData = wasmCli.compileString(virtualFiles, {
				optimize: true,
				optimizeLevel: 3,
				runtime: "stub",
				transform: "json-as/transform",
				measure: true,
				debug: true,
				noColors: false,
				traceResolution: true,
				exportTable: true,
				exportRuntime: true
			} as wasmCli.CompilerOptions);
		} catch (ex) {
			console.error(`Wasm from string compilation error`, ex);
			throw ex;
		}

		return {
			binary: compiledData.binary,
			text: compiledData.text
		} as CompiledSmartContract;
	}

	/** compile smart contract from a physical assemblyscript file */
	public async compileSmartContractFromFile(config: WasmConfig): Promise<CompiledSmartContract> {

		if (!this.isWebAssemblyCliInitialized) {
			await this.initWebAssemblyCli();
		}

		if (!fs.existsSync(config.smartContractFilePath)) {
			throw new Error(`Smart contract file ${config.smartContractFilePath} does not exist`);
		}
		const smartContractFilePath = config.smartContractFilePath.toString();

		const par = path.parse(smartContractFilePath);
		const [smartContractFileName, smartContractExtName, smartContractDir] = [par.name, par.ext, par.dir];
		if (!smartContractExtName.includes("ts")) {
			throw new Error(`Smart contract extension ${smartContractExtName} is not a typescript one`);
		}

		const binaryFileToCreate =  `${config.wasmBinaryPath || smartContractDir}/${smartContractFileName}.wasm`;
		const textFileToCreate = `${config.wasmTextPath || smartContractDir}/${smartContractFileName}.wat`;

		try {
			wasmCli.main([
				smartContractFilePath,
				"--binaryFile", binaryFileToCreate,
				"--textFile", textFileToCreate,
				"--transform", "json-as/transform",
				"--exportRuntime",
				"--target", "release",
				"--optimize",
				"--sourceMap",
				"--measure"
			], {
				stdout: process.stdout,
				stderr: process.stderr
			}
			);
		} catch (ex) {
			console.error(`Wasm compilation error`, ex);
			throw ex;
		}

		if (!fs.existsSync(binaryFileToCreate)) {
			throw new Error(`Compiled wasm file (.wasm) ${binaryFileToCreate} does not exist`);
		}

		if (!fs.existsSync(textFileToCreate)) {
			throw new Error(`Compiled text file (.wat) ${textFileToCreate} does not exist`);
		}

		const binaryArrayBuffer = fs.readFileSync(binaryFileToCreate, {});
        const binaryFileContents = new Uint8Array(binaryArrayBuffer);
        const textFileContents = fs.readFileSync(textFileToCreate, {encoding: "utf8"});
        
		return {
			binary: binaryFileContents,
			text: textFileContents
		} as CompiledSmartContract;
	}

	/** create and send an operation containing byte code */
	public async executeSC(contractData: IContractData, executor: IAccount): Promise<Array<string>> {
		// get latest period info
		const latestPeriodInfo: ILatestPeriodInfo = await this.publicApiClient.getLatestPeriodInfo();
		const expiryPeriod: number = latestPeriodInfo.last_period + this.clientConfig.periodOffset;

		// get the block size
		const nodeStatus: INodeStatus = await this.publicApiClient.getNodeStatus();
		if (contractData.contractData.length > nodeStatus.config.max_block_size / 2) {
			console.warn("bytecode size exceeded half of the maximum size of a block, operation will certainly be rejected");
		}

		// bytes compaction
		const bytesCompact: Buffer = this.compactBytesForOperation(contractData, OperationTypeId.ExecuteSC, executor, expiryPeriod);

		// sign payload
		const signature = await WalletClient.walletSignMessage(bytesCompact, executor);
		//console.log("SIGNATURE ", signature);
		//console.log("UINT8ARRAY ", contractData.contractData);
		//console.log("RPC POST DATA ", Array.from(atob(contractData.contractData), c => c.charCodeAt(0)));
		//console.log("ATOB ", Uint8Array.from(atob(contractData.contractData), c => c.charCodeAt(0)));


        const decodedBin = new Uint8Array(Buffer.from(contractData.contractData, 'base64'))

		const data = {
			content: {
				expire_period: expiryPeriod,
				fee: contractData.fee.toString(),
				op: {
					ExecuteSC: {
						data: Array.from(decodedBin), //Array.from(atob(contractData.contractData), c => c.charCodeAt(0)),  //Array.from(contractData.contractData),   //Array.from(atob(contractData.contractData), c => c.charCodeAt(0)), //ascii --> binary
						max_gas: contractData.maxGas,
						coins: contractData.coins.toString(),
						gas_price: contractData.gasPrice.toString()
					}
				},
				sender_public_key: executor.publicKey
			},
			signature: signature.base58Encoded,
		}
		// returns operation ids
		const opIds: Array<string> = await this.sendJsonRPCRequest(JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS, [[data]]);
		return opIds;
	}

	//OTHER OPERATIONS (TODO)
	public readonlySmartContract = (bytecode, maxGas, gasPrice, address) => { /* TODO */ } // execute byte code, address is optional. Nothing is really executed on chain
	public getFilteredScOutputEvents = (startSlot, endSlot, emitterAddress, originalCallerAddress, operationId)  => { /* TODO */ }
}
