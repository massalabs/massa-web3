"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ClientFactory_1 = require("../web3/ClientFactory");
//import { print, create_sc, call, generate_event } from "massa-sc-std";
//import {isKeyPressed}  from "@wasmer/io-devices-lib-assemblyscript";
const SMART_CONTRACT = `
import { print } from "./node_modules/massa-sc-std/assembly/index";
//import { JSON } from "json-as";
//import {isKeyPressed}  from "@wasmer/io-devices-lib-assemblyscript";

export function say_hello(text: string): string {
    const res = "hello" + text;
    return res;
};`;
const SMART_CONTRACT_DEPLOYER = `
import { print, create_sc, call, generate_event } from "massa-sc-std";

function createSimpleSc(): string {
    const bytes = {{contractCode}};
    const token = create_sc(bytes);
    print("Created sc address = " + token);
    return token;
}

export function main(_args: string): i32 {
    const sc_address = createSimpleSc();
    print("Initialized, address:" + sc_address);
    generate_event(sc_address);
    return 0;
}
`;
const READ_ONLY_SMART_CONTRACT = `
import { call, print, generate_event } from "massa-sc-std";
 
export function main(_args: string): string {
    const addr = {{contractAddress}};
    const func = "say_hello"; // Replace the function
    const args = "john";
    const result = call(addr, func, args, 0);
    generate_event(result);
    return "0"
}`;
const baseAccount = {
    publicKey: "5Jwx18K2JXacFoZcPmTWKFgdG1mSdkpBAUnwiyEqsVP9LKyNxR",
    privateKey: "2SPTTLK6Vgk5zmZEkokqC3wgpKgKpyV5Pu3uncEGawoGyd4yzC",
    address: "9mvJfA4761u1qT8QwSWcJ4gTDaFP5iSgjQzKMaqTbrWCFo1QM"
};
const eventsFilter = {
    start: {
        period: 0,
        thread: 0
    },
    end: {
        period: 0,
        thread: 0
    },
    original_caller_address: null,
    original_operation_id: null,
    emitter_address: baseAccount.address,
};
(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        // init client
        const web3Client = ClientFactory_1.ClientFactory.createDefaultClient(ClientFactory_1.DefaultProviderUrls.TESTNET, true, baseAccount);
        // EXPERIMENTAL (FROM STRING)
        //const output1 = await web3Client.smartContracts().compileSmartContractOnTheFly(SMART_CONTRACT);
        //console.log("compileSmartContractOnTheFly: ", output1);
        // FROM STRING
        const output2 = yield web3Client.smartContracts().compileSmartContractFromString(SMART_CONTRACT);
        console.log("compileSmartContractFromString: ", output2);
        // FROM TS file
        /*
        const output3: CompiledSmartContract = await web3Client.smartContracts().compileSmartContractFromSourceFile({
          smartContractFilePath: "/home/evgeni/Documents/development/massa/massa-sc-examples/assembly/helloworld.ts"
        });
        console.log("compileSmartContractFromSourceFile: ", output3.base64);
        */
        // compile smart contracts on the fly
        /*
        const compiledBaseSc: CompiledSmartContract = await web3Client.smartContracts().compileSmartContractFromString(SMART_CONTRACT);
        console.log("Basic Smart Contract Compiled: ", compiledBaseSc.base64);

        const template = Handlebars.compile(SMART_CONTRACT_DEPLOYER, {
            noEscape: true
        } as CompileOptions);
        const data = { "contractCode": compiledBaseSc.base64 };
        const base64DeployerContract = template(data, {} as Handlebars.RuntimeOptions);

        const compiledSc: CompiledSmartContract = await web3Client.smartContracts().compileSmartContractFromString(base64DeployerContract);
        console.log("Compiled from string: ", JSON.stringify(compiledSc, null, 2));
        */
        // deploy smart contract
        /*
        const txId = await web3Client.smartContracts().deploySmartContract({
            fee: 0,
            maxGas: 200000,
            gasPrice: 0,
            coins: 0,
            contractDataBase64: compiledSc.base64
        } as IContractData, baseAccount);
        console.log("Deploy Smart Contract Op Ids", JSON.stringify(txId, null, 2));
        */
        // poll smart contract events
        //const events: Array<IEvent> = await EventPoller.getEventsAsync(eventsFilter, 5000, web3Client.smartContracts());
        //console.log("EVENTS RECEIVED", events)
        // execute readonly logic
        /*
        const readOnlyResponse: Array<IExecuteReadOnlyResponse> = await web3Client.smartContracts().executeReadOnlySmartContract({
            fee: 0,
            maxGas: 200000,
            gasPrice: 0,
            coins: 0,
            contractDataBase64: compiledSc.base64,
            contractDataBinary: compiledSc.binary,
            address: "TAkCGKH8it8HVrBbG8vG8ZKJBEYng4Xvp8uMBk4vfH5WX3RHg"
        } as IContractData);
        console.log("Readonly response: ", JSON.stringify(readOnlyResponse, null, 2));
        */
    }
    catch (ex) {
        console.error("Error = ", ex.message);
    }
}))();
//# sourceMappingURL=sc.js.map