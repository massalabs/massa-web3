import { IAccount } from "../interfaces/IAccount";
import { IContractData } from "../interfaces/IContractData";
import { IEventFilter } from "../interfaces/IEventFilter";
import { ISlot } from "../interfaces/ISlot";
import { ClientFactory, DefaultProviderUrls } from "../web3/ClientFactory";
import { CompiledSmartContract } from "../web3/SmartContractsClient";
import { IEvent } from "../interfaces/IEvent";
import { EventPoller } from "../web3/EventPoller";
import { ICallData } from "../interfaces/ICallData";

const baseAccount = {
    publicKey: "5Jwx18K2JXacFoZcPmTWKFgdG1mSdkpBAUnwiyEqsVP9LKyNxR",
    privateKey: "2SPTTLK6Vgk5zmZEkokqC3wgpKgKpyV5Pu3uncEGawoGyd4yzC",
    address: "9mvJfA4761u1qT8QwSWcJ4gTDaFP5iSgjQzKMaqTbrWCFo1QM"
} as IAccount;

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
        // init client
        const web3Client = ClientFactory.createDefaultClient(DefaultProviderUrls.LABNET, true, baseAccount);

        // compile sc from wasm file ready for deployment
        const compiledSc: CompiledSmartContract = await web3Client.smartContracts().compileSmartContractFromWasmFile("file.wasm");
        console.log("Compiled from string: ", JSON.stringify(compiledSc, null, 2));

        // deploy smart contract
        const deployTxId = await web3Client.smartContracts().deploySmartContract({
            fee: 0,
            maxGas: 200000,
            gasPrice: 0,
            coins: 0,
            contractDataBase64: compiledSc.base64
        } as IContractData, baseAccount);
        console.log("Deploy Smart Contract Op Ids", JSON.stringify(deployTxId, null, 2));

        // poll smart contract events to get the address
        const events: Array<IEvent> = await EventPoller.getEventsAsync(eventsFilter, 5000, web3Client.smartContracts());
        console.log("Sc events received", events);

        // send a sc operation
        const callTxId = await web3Client.smartContracts().callSmartContract({
            fee: 0,
            gasPrice: 0,
            maxGas: 200000,
            parallelCoins: 0,
            sequentialCoins: 0,
            targetAddress: "xxxxxx",
            functionName: "call",
            parameter: JSON.stringify({x : 1, y: 2}),
        } as ICallData, baseAccount);
        console.log("Send Smart Contract Op Ids", JSON.stringify(callTxId, null, 2));

    } catch (ex) {
        console.error("Error = ", ex.message);
    }
})();