import { IAccount } from "../interfaces/IAccount";
import { IContractData } from "../interfaces/IContractData";
import { IEventFilter } from "../interfaces/IEventFilter";
import { IExecuteReadOnlyResponse } from "../interfaces/IExecuteReadOnlyResponse";
import { IProvider, ProviderType } from "../interfaces/IProvider";
import { ISlot } from "../interfaces/ISlot";
import { Client } from "../web3/Client";
import { ClientFactory, DefaultProviderUrls } from "../web3/ClientFactory";
import { CompiledSmartContract } from "../web3/SmartContractsClient";

const SMART_CONTRACT =
`export function add(text: string): string { return "hello" + text; };`;

const SMART_CONTRACT_DEPLOYER = `
import { include_base64, print, create_sc, call, generate_event } from "massa-sc-std";

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

const baseAccount = {
    publicKey: "5Jwx18K2JXacFoZcPmTWKFgdG1mSdkpBAUnwiyEqsVP9LKyNxR",
    privateKey: "2SPTTLK6Vgk5zmZEkokqC3wgpKgKpyV5Pu3uncEGawoGyd4yzC",
    address: "9mvJfA4761u1qT8QwSWcJ4gTDaFP5iSgjQzKMaqTbrWCFo1QM"
} as IAccount;

const getTestnetClient = (): Client => {
    const web3Client = ClientFactory.createDefaultClient(DefaultProviderUrls.TESTNET, false, baseAccount);
    return web3Client;
}

const eventsFilter = {
    start: {
        period: 0,
        thread: 0
    } as ISlot,
    end:  {
        period: 0,
        thread: 0
    } as ISlot,
    original_caller_address: null,
    original_operation_id: null,
    emitter_address: baseAccount.address,
} as IEventFilter;

(async () => {

    try {

        // ============= CLIENT ===================== //
        const web3Client: Client = getTestnetClient();

        // ============= SC ===================== //
        // compile smart contract
        /*
        const compiledSc: CompiledSmartContract = await web3Client.smartContracts().compileSmartContractFromSourceFile({
            smartContractFilePath: "/home/evgeni/Documents/development/massa/massa-sc-examples/assembly/mytest.ts",
        } as WasmConfig);
        */

        //const compiledSc: CompiledSmartContract = await web3Client.smartContracts().compileSmartContractFromWasmFile("/home/evgeni/Documents/development/massa/massa-sc-examples/build/mytest.wasm");
        //console.log("Compiled from string: ", JSON.stringify(compiledSc, null, 2));

        //const compiledSc: CompiledSmartContract = await web3Client.smartContracts().compileSmartContractFromString(SMART_CONTRACT_EXAMPLE);
        //console.log("Compiled from string: ", JSON.stringify(compiledSc, null, 2));

        // deploy smart contract
        /*
        const opIds = await web3Client.smartContracts().deploySmartContract({
            fee: 0,
            maxGas: 200000,
            gasPrice: 0,
            coins: 0,
            contractDataBase64: compiledSc.base64
        } as IContractData, baseAccount);
        console.log("Deploy Smart Contract Op Ids", JSON.stringify(opIds, null, 2));
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
        

    } catch (ex) {
        console.error("Error = ", ex.message);
    }
})();