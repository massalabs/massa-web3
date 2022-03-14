
import * as wasmCli from "assemblyscript/cli/asc";
import * as fs from "fs";
import * as path from "path";

export interface CompiledSmartContract {
	binary: Uint8Array,
	text: string,
}

export interface WasmConfig {
	smartContractFilePath: fs.PathLike;
	wasmBinaryPath?: fs.PathLike;
	wasmTextPath?: fs.PathLike;
}

export class SmartContractUtils {
	private isWebAssemblyCliInitialised = false;

	public constructor() {
		// bind class methods
		this.initWebAssemblyCli = this.initWebAssemblyCli.bind(this);
		this.compileSmartContractFromString = this.compileSmartContractFromString.bind(this);
		this.compileSmartContractFromFile = this.compileSmartContractFromFile.bind(this);
	}

	private async initWebAssemblyCli(): Promise<void> {
		try {
			await wasmCli.ready;
		} catch (ex) {
			console.error("Error initialising wasm cli", ex);
			throw ex;
		}
		this.isWebAssemblyCliInitialised = true;
	}

	public async compileSmartContractFromString(smartContractContent: string): Promise<CompiledSmartContract> {

		if (!this.isWebAssemblyCliInitialised) {
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

	public async compileSmartContractFromFile(config: WasmConfig): Promise<CompiledSmartContract> {

		if (!this.isWebAssemblyCliInitialised) {
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
}
