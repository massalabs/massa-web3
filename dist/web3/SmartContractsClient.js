"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartContractsClient = void 0;
const tslib_1 = require("tslib");
const wasmCli = require("assemblyscript/cli/asc");
const fs = require("fs");
const path = require("path");
const EOperationStatus_1 = require("../interfaces/EOperationStatus");
const JsonRpcMethods_1 = require("../interfaces/JsonRpcMethods");
const OperationTypes_1 = require("../interfaces/OperationTypes");
const retryExecuteFunction_1 = require("../utils/retryExecuteFunction");
const Wait_1 = require("../utils/Wait");
const BaseClient_1 = require("./BaseClient");
const WalletClient_1 = require("./WalletClient");
const TX_POLL_INTERVAL_MS = 10000;
const TX_STATUS_CHECK_RETRY_COUNT = 100;
/** Smart Contracts Client which enables compilation, deployment and streaming of events */
class SmartContractsClient extends BaseClient_1.BaseClient {
    constructor(clientConfig, publicApiClient, walletClient) {
        super(clientConfig);
        this.publicApiClient = publicApiClient;
        this.walletClient = walletClient;
        this.isWebAssemblyCliInitialized = false;
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
    initWebAssemblyCli() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield wasmCli.ready;
            }
            catch (ex) {
                console.error("Error initializing wasm cli", ex);
                throw ex;
            }
            this.isWebAssemblyCliInitialized = true;
        });
    }
    /** compile smart contract on the fly using the assemblyscript smart contract code as a string */
    compileSmartContractFromString(smartContractContent) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.isWebAssemblyCliInitialized) {
                yield this.initWebAssemblyCli();
            }
            let compiledData = null;
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
                });
            }
            catch (ex) {
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
            const base64 = Buffer.from(compiledData.binary).toString('base64');
            return {
                binary: compiledData.binary,
                text: compiledData.text,
                base64
            };
        });
    }
    /** compile smart contract from a physical assemblyscript (.ts) file */
    compileSmartContractFromSourceFile(config) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.isWebAssemblyCliInitialized) {
                yield this.initWebAssemblyCli();
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
            const binaryFileToCreate = `${config.wasmBinaryPath || smartContractDir}/${smartContractFileName}.wasm`;
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
                });
            }
            catch (ex) {
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
            const textFileContents = fs.readFileSync(textFileToCreate, { encoding: "utf8" });
            const base64 = Buffer.from(binaryFileContents).toString('base64');
            return {
                binary: binaryFileContents,
                text: textFileContents,
                base64
            };
        });
    }
    /** compile smart contract from a physical assemblyscript file */
    compileSmartContractFromWasmFile(wasmFilePath) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.isWebAssemblyCliInitialized) {
                yield this.initWebAssemblyCli();
            }
            if (!fs.existsSync(wasmFilePath)) {
                throw new Error(`Wasm contract file ${wasmFilePath} does not exist`);
            }
            const wasmFilePathStr = wasmFilePath.toString();
            const binaryArrayBuffer = fs.readFileSync(wasmFilePathStr, {});
            const binaryFileContents = new Uint8Array(binaryArrayBuffer);
            const base64 = Buffer.from(binaryFileContents).toString('base64');
            return {
                binary: binaryFileContents,
                text: null,
                base64
            };
        });
    }
    // ----------------------------------------------------------------
    /** compile smart contract from a physical assemblyscript (.ts) file */
    compileSmartContractOnTheFly(smartContractContent) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.isWebAssemblyCliInitialized) {
                yield this.initWebAssemblyCli();
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
                }, (err) => {
                    console.log(`>>> STDOUT >>>\n${output.stdout.toString()}`);
                    console.log(`>>> STDERR >>>\n${output.stderr.toString()}`);
                    if (err) {
                        console.log(">>> THROWN >>>");
                        console.log(err);
                    }
                    return 0;
                });
            }
            catch (ex) {
                console.error(`Wasm compilation error`, ex);
                throw ex;
            }
            return output;
        });
    }
    /** create and send an operation containing byte code */
    deploySmartContract(contractData, executor) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // get next period info
            const nodeStatusInfo = yield this.publicApiClient.getNodeStatus();
            const expiryPeriod = nodeStatusInfo.next_slot.period + this.clientConfig.periodOffset;
            // get the block size
            if (contractData.contractDataBase64.length > nodeStatusInfo.config.max_block_size / 2) {
                console.warn("bytecode size exceeded half of the maximum size of a block, operation will certainly be rejected");
            }
            // bytes compaction
            const bytesCompact = this.compactBytesForOperation(contractData, OperationTypes_1.OperationTypeId.ExecuteSC, executor, expiryPeriod);
            // sign payload
            const signature = yield WalletClient_1.WalletClient.walletSignMessage(bytesCompact, executor);
            // revert base64 sc data to binary
            if (!contractData.contractDataBase64) {
                throw new Error(`Contract base64 encoded data required. Got null`);
            }
            const decodedScBinaryCode = new Uint8Array(Buffer.from(contractData.contractDataBase64, 'base64'));
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
            const opIds = yield this.sendJsonRPCRequest(JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS, [[data]]);
            return opIds;
        });
    }
    /** call smart contract method */
    callSmartContract(callData, executor) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // get next period info
            const nodeStatusInfo = yield this.publicApiClient.getNodeStatus();
            const expiryPeriod = nodeStatusInfo.next_slot.period + this.clientConfig.periodOffset;
            // check if the param payload is already stringified
            let stringifiedParamPayload = callData.parameter;
            try {
                // if this call succeeds it means the payload is already a stringified json
                JSON.parse(callData.parameter);
            }
            catch (e) {
                // payload is not a stringified json, also stringify
                stringifiedParamPayload = JSON.stringify(callData.parameter);
            }
            callData.parameter = stringifiedParamPayload;
            // bytes compaction
            const bytesCompact = this.compactBytesForOperation(callData, OperationTypes_1.OperationTypeId.CallSC, executor, expiryPeriod);
            // sign payload
            const signature = yield WalletClient_1.WalletClient.walletSignMessage(bytesCompact, executor);
            // request data
            const data = {
                content: {
                    expire_period: expiryPeriod,
                    fee: callData.fee.toString(),
                    op: {
                        CallSC: {
                            max_gas: callData.maxGas,
                            gas_price: callData.gasPrice.toString(),
                            parallel_coins: callData.parallelCoins.toString(),
                            sequential_coins: callData.sequentialCoins.toString(),
                            target_addr: callData.targetAddress,
                            target_func: callData.functionName,
                            param: callData.parameter,
                        }
                    },
                    sender_public_key: executor.publicKey
                },
                signature: signature.base58Encoded,
            };
            // returns operation ids
            const opIds = yield this.sendJsonRPCRequest(JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS, [[data]]);
            return opIds;
        });
    }
    /** get filtered smart contract events */
    getFilteredScOutputEvents(eventFilterData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = {
                start: eventFilterData.start,
                end: eventFilterData.end,
                emitter_address: eventFilterData.emitter_address,
                original_caller_address: eventFilterData.original_caller_address,
                original_operation_id: eventFilterData.original_operation_id,
            };
            const jsonRpcRequestMethod = JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.GET_FILTERED_SC_OUTPUT_EVENT;
            // returns filtered events
            if (this.clientConfig.retryStrategyOn) {
                return yield (0, retryExecuteFunction_1.trySafeExecute)(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [data]]);
            }
            else {
                return yield this.sendJsonRPCRequest(jsonRpcRequestMethod, [data]);
            }
        });
    }
    /** Read-only smart contracts */
    executeReadOnlySmartContract(contractData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
            const jsonRpcRequestMethod = JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.EXECUTE_READ_ONLY_REQUEST;
            if (this.clientConfig.retryStrategyOn) {
                return yield (0, retryExecuteFunction_1.trySafeExecute)(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [[data]]]);
            }
            else {
                return yield this.sendJsonRPCRequest(jsonRpcRequestMethod, [[data]]);
            }
        });
    }
    getOperationStatus(opId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const operationData = yield this.publicApiClient.getOperations([opId]);
            if (!operationData || operationData.length === 0)
                return EOperationStatus_1.EOperationStatus.PENDING;
            const opData = operationData[0];
            if (opData.in_pool) {
                return EOperationStatus_1.EOperationStatus.PENDING;
            }
            else if (opData.is_final) {
                return EOperationStatus_1.EOperationStatus.SUCCESS;
            }
            else {
                return EOperationStatus_1.EOperationStatus.FAIL;
            }
        });
    }
    awaitFinalOperationStatus(opId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let errCounter = 0;
            let pendingCounter = 0;
            while (true) {
                let status = EOperationStatus_1.EOperationStatus.PENDING;
                try {
                    status = yield this.getOperationStatus(opId);
                }
                catch (ex) {
                    if (++errCounter > 100) {
                        const msg = `Failed to retrieve the tx status after 10 failed attempts for operation id: ${opId}.`;
                        console.error(msg, ex);
                        throw ex;
                    }
                    yield (0, Wait_1.wait)(TX_POLL_INTERVAL_MS);
                }
                if (status == EOperationStatus_1.EOperationStatus.SUCCESS || status == EOperationStatus_1.EOperationStatus.FAIL)
                    return status;
                if (++pendingCounter > 1000) {
                    const msg = `Getting the tx status for operation Id ${opId} took too long to conclude. We gave up after ${TX_POLL_INTERVAL_MS * TX_STATUS_CHECK_RETRY_COUNT}ms.`;
                    console.warn(msg);
                    throw new Error(msg);
                }
                yield (0, Wait_1.wait)(TX_POLL_INTERVAL_MS);
            }
        });
    }
}
exports.SmartContractsClient = SmartContractsClient;
//# sourceMappingURL=SmartContractsClient.js.map