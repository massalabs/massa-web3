import * as wasmCli from "assemblyscript/cli/asc";
import * as fs from "fs";
import * as path from "path";
import { EOperationStatus } from "../interfaces/EOperationStatus";
import { IAccount } from "../interfaces/IAccount";
import { IClientConfig } from "../interfaces/IClientConfig";
import { IContractData } from "../interfaces/IContractData";
import { IEvent } from "../interfaces/IEvent";
import { IEventFilter } from "../interfaces/IEventFilter";
import { IExecuteReadOnlyResponse } from "../interfaces/IExecuteReadOnlyResponse";
import { INodeStatus } from "../interfaces/INodeStatus";
import { IOperationData } from "../interfaces/IOperationData";
import { JSON_RPC_REQUEST_METHOD } from "../interfaces/JsonRpcMethods";
import { OperationTypeId } from "../interfaces/OperationTypes";
import { trySafeExecute } from "../utils/retryExecuteFunction";
import { wait } from "../utils/Wait";
import { BaseClient } from "./BaseClient";
import { PublicApiClient } from "./PublicApiClient";
import { WalletClient } from "./WalletClient";

const TX_POLL_INTERVAL_MS = 10000;
const TX_STATUS_CHECK_RETRY_COUNT = 100;

export interface CompiledSmartContract {
	binary: Uint8Array;
	text: string;
	base64: string;
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
		this.compileSmartContractFromSourceFile = this.compileSmartContractFromSourceFile.bind(this);
		this.compileSmartContractFromWasmFile = this.compileSmartContractFromWasmFile.bind(this);
		this.compileSmartContractOnTheFly = this.compileSmartContractOnTheFly.bind(this);
		this.deploySmartContract = this.deploySmartContract.bind(this);
		this.getFilteredScOutputEvents = this.getFilteredScOutputEvents.bind(this);
		this.executeReadOnlySmartContract = this.executeReadOnlySmartContract.bind(this);
		this.awaitFinalOperationStatus = this.awaitFinalOperationStatus.bind(this);
		this.getOperationStatus = this.getOperationStatus.bind(this);
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
				exportRuntime: true,
			} as wasmCli.CompilerOptions);
		} catch (ex) {
			console.error(`Wasm from string compilation error`, ex);
			throw ex;
		}

		console.log(`>>> STDOUT >>>\n${compiledData.stdout.toString()}`);
		console.log(`>>> STDERR >>>\n${compiledData.stderr.toString()}`);

		if (!compiledData || !compiledData.binary) {
			throw new Error("No binary file created in the compilation");
		}
		if (!compiledData || !compiledData.text) {
			throw new Error("No text file created in the compilation");
		}
		const base64: string = Buffer.from(compiledData.binary).toString("base64");

		return {
			binary: compiledData.binary,
			text: compiledData.text,
			base64
		} as CompiledSmartContract;
	}

	/** compile smart contract from a physical assemblyscript (.ts) file */
	public async compileSmartContractFromSourceFile(config: WasmConfig): Promise<CompiledSmartContract> {

		if (!this.isWebAssemblyCliInitialized) {
			await this.initWebAssemblyCli();
		}

		if (!fs.existsSync(config.smartContractFilePath)) {
			throw new Error(`Smart contract file ${config.smartContractFilePath} [TYPESCRIPT] does not exist`);
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
		const base64: string = Buffer.from(binaryFileContents).toString("base64");

		return {
			binary: binaryFileContents,
			text: textFileContents,
			base64
		} as CompiledSmartContract;
	}

	/** compile smart contract from a physical assemblyscript file */
	public async compileSmartContractFromWasmFile(wasmFilePath: fs.PathLike): Promise<CompiledSmartContract> {

		if (!this.isWebAssemblyCliInitialized) {
			await this.initWebAssemblyCli();
		}

		if (!fs.existsSync(wasmFilePath)) {
			throw new Error(`Wasm contract file ${wasmFilePath} does not exist`);
		}
		const wasmFilePathStr = wasmFilePath.toString();

		const binaryArrayBuffer: Buffer = fs.readFileSync(wasmFilePathStr, {});
		const binaryFileContents = new Uint8Array(binaryArrayBuffer);
		const base64: string = Buffer.from(binaryFileContents).toString("base64");

		return {
			binary: binaryFileContents,
			text: null,
			base64
		} as CompiledSmartContract;
	}

	// ----------------------------------------------------------------

	/** compile smart contract from a physical assemblyscript (.ts) file */
	public async compileSmartContractOnTheFly(smartContractContent: string): Promise<any> {

		if (!this.isWebAssemblyCliInitialized) {
			await this.initWebAssemblyCli();
		}

		const sources = { "input.ts": smartContractContent };
		console.log(sources);
		const output = Object.create({
			stdout: wasmCli.createMemoryStream(),
			stderr: wasmCli.createMemoryStream()
		});

		const argv = [
			...Object.keys(sources),
			"-O3",
			"--runtime", "stub",
			"--binaryFile", "binary",
			"--textFile", "text",
			"--sourceMap"
		];
		console.log("argv ", argv);

		try {
			wasmCli.main(argv, {
					stdout: output.stdout,
					stderr: output.stderr,

					readFile: (name, baseDir) => {
						console.log("READFILE (name, basedir) ", name, baseDir, Object.prototype.hasOwnProperty.call(sources, name));
						return Object.prototype.hasOwnProperty.call(sources, name) ? sources[name] : null;
					},

					writeFile: (name, contents, baseDir) => {
						console.log(`>>> WRITE:${name} >>>\n${contents.length}`);
						output[name] = contents;
					},
					listFiles(dirname, baseDir) {
						return [];
					}

				} as wasmCli.APIOptions,
				(err) => {
					console.log(`>>> STDOUT >>>\n${output.stdout.toString()}`);
					console.log(`>>> STDERR >>>\n${output.stderr.toString()}`);
					if (err) {
					  console.log(">>> THROWN >>>");
					  console.log(err);
					}
					return 0;
				}
			);
		} catch (ex) {
			console.error(`Wasm compilation error`, ex);
			throw ex;
		}

		return output;
	}

	/** create and send an operation containing byte code */
	public async deploySmartContract(contractData: IContractData, executor: IAccount): Promise<Array<string>> {
		// get next period info
		const nodeStatusInfo: INodeStatus = await this.publicApiClient.getNodeStatus();
		const expiryPeriod: number = nodeStatusInfo.next_slot.period + this.clientConfig.periodOffset;

		// get the block size
		const nodeStatus: INodeStatus = await this.publicApiClient.getNodeStatus();
		if (contractData.contractDataBase64.length > nodeStatus.config.max_block_size / 2) {
			console.warn("bytecode size exceeded half of the maximum size of a block, operation will certainly be rejected");
		}

		// bytes compaction
		const bytesCompact: Buffer = this.compactBytesForOperation(contractData, OperationTypeId.ExecuteSC, executor, expiryPeriod);

		// sign payload
		const signature = await WalletClient.walletSignMessage(bytesCompact, executor);

		// revert base64 sc data to binary
		if (!contractData.contractDataBase64) {
			throw new Error(`Contract base64 encoded data required. Got null`);
		}
        const decodedScBinaryCode = new Uint8Array(Buffer.from(contractData.contractDataBase64, "base64"));

		const data = {
			content: {
				expire_period: expiryPeriod,
				fee: contractData.fee.toString(),
				op: {
					ExecuteSC: {
						data: Array.from(decodedScBinaryCode),
						max_gas: contractData.maxGas,
						coins: contractData.coins.toString(),
						gas_price: contractData.gasPrice.toString()
					}
				},
				sender_public_key: executor.publicKey
			},
			signature: signature.base58Encoded,
		};
		// returns operation ids
		const opIds: Array<string> = await this.sendJsonRPCRequest(JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS, [[data]]);
		return opIds;
	}

	/** get filtered smart contract events */
	public async getFilteredScOutputEvents(eventFilterData: IEventFilter): Promise<Array<IEvent>> {

		const data = {
			start: eventFilterData.start,
			end: eventFilterData.end,
			emitter_address: eventFilterData.emitter_address,
			original_caller_address: eventFilterData.original_caller_address,
			original_operation_id: eventFilterData.original_operation_id,
		};

		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_FILTERED_SC_OUTPUT_EVENT;

		// returns filtered events
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<Array<IEvent>>(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [data]]);
		} else {
			return await this.sendJsonRPCRequest<Array<IEvent>>(jsonRpcRequestMethod, [data]);
		}
	}

	/** Read-only smart contracts */
	public async executeReadOnlySmartContract(contractData: IContractData): Promise<Array<IExecuteReadOnlyResponse>> {

		if (!contractData.contractDataBinary) {
			throw new Error(`Contract binary data required. Got null`);
		}

		if (!contractData.address) {
			throw new Error(`Contract address required. Got null`);
		}

		const data = {
			max_gas: contractData.maxGas,
			simulated_gas_price: contractData.gasPrice.toString(),
			bytecode: Array.from(contractData.contractDataBinary),
			address: contractData.address,
		};

		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.EXECUTE_READ_ONLY_REQUEST;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<Array<IExecuteReadOnlyResponse>>(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [[data]]]);
		} else {
			return await this.sendJsonRPCRequest<Array<IExecuteReadOnlyResponse>>(jsonRpcRequestMethod, [[data]]);
		}
	}

	private async getOperationStatus(opId: string): Promise<EOperationStatus> {
		const operationData: Array<IOperationData> = await this.publicApiClient.getOperations([opId]);
		if (!operationData || operationData.length === 0) return EOperationStatus.PENDING;
		const opData = operationData[0];
		if (opData.in_pool) {
			return EOperationStatus.PENDING;
		} else if (opData.is_final) {
			return EOperationStatus.SUCCESS;
		} else {
			return EOperationStatus.FAIL;
		}
	}

	public async awaitFinalOperationStatus(opId: string): Promise<EOperationStatus> {
		let errCounter = 0;
		let pendingCounter = 0;
		while (true) {
			let status = EOperationStatus.PENDING;
			try {
				status = await this.getOperationStatus(opId);
			}
			catch (ex) {
				if (++errCounter > 100) {
					const msg = `Failed to retrieve the tx status after 10 failed attempts for operation id: ${opId}.`;
					console.error(msg, ex);
					throw ex;
				}

				await wait(TX_POLL_INTERVAL_MS);
			}

			if (status == EOperationStatus.SUCCESS || status == EOperationStatus.FAIL)
				return status;

			if (++pendingCounter > 1000) {
				const msg = `Getting the tx status for operation Id ${opId} took too long to conclude. We gave up after ${TX_POLL_INTERVAL_MS * TX_STATUS_CHECK_RETRY_COUNT}ms.`;
				console.warn(msg);
				throw new Error(msg);
			}

			await wait(TX_POLL_INTERVAL_MS);
		}
	}
}
