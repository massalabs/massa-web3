import { IAccount } from "../interfaces/IAccount";
import { IContractData } from "../interfaces/IContractData";
import { IEventFilter } from "../interfaces/IEventFilter";
import { ISlot } from "../interfaces/ISlot";
import { ClientFactory, DefaultProviderUrls } from "../web3/ClientFactory";
import { SmartContractUtils, ICompiledSmartContract } from "massa-sc-utils";
import { IEvent } from "../interfaces/IEvent";
import { EventPoller } from "../web3/EventPoller";
import { ICallData } from "../interfaces/ICallData";
import { EOperationStatus } from "../interfaces/EOperationStatus";
import { wait } from "../utils/Wait";
import { IReadData } from "../interfaces/IReadData";

const baseAccount = {
    publicKey: "5Jwx18K2JXacFoZcPmTWKFgdG1mSdkpBAUnwiyEqsVP9LKyNxR",
    privateKey: "2SPTTLK6Vgk5zmZEkokqC3wgpKgKpyV5Pu3uncEGawoGyd4yzC",
    address: "9mvJfA4761u1qT8QwSWcJ4gTDaFP5iSgjQzKMaqTbrWCFo1QM"
} as IAccount;

(async () => {

    try {
        // init client
        const web3Client = ClientFactory.createDefaultClient(DefaultProviderUrls.LABNET, true, baseAccount);

        // construct a sc utils
        const utils = new SmartContractUtils();

        // compile sc from wasm file ready for deployment
        const compiledSc: ICompiledSmartContract = await utils.compileSmartContractFromWasmFile("/home/evgeni/Documents/development/massa/OTHERS/tictactoe-sc/build/main.wasm"); // TODO: please change acc. to your design
        if (!compiledSc.base64) {
            throw new Error("No bytecode to deploy. Check AS compiler");
        }

        // deploy smart contract
        const deployTxId = await web3Client.smartContracts().deploySmartContract({
            fee: 0,
            maxGas: 200000,
            gasPrice: 0,
            coins: 0,
            contractDataBase64: compiledSc.base64
        } as IContractData, baseAccount);
        const deploymentOperationId = deployTxId[0];
        console.log("=======> Deploy Smart Contract OpId", deploymentOperationId);

        // await included_pending state
        const status: EOperationStatus = await web3Client.smartContracts().awaitRequiredOperationStatus(deploymentOperationId, EOperationStatus.INCLUDED_PENDING);
        // wait around 20 secs fo the events to be fetchable
        await wait(40000);
        console.log("=======> Deploy Smart Contract Status", status);

        // poll smart contract events for the opId
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
            original_operation_id: deploymentOperationId,
            emitter_address: null,
        } as IEventFilter;
        const events: Array<IEvent> = await EventPoller.getEventsAsync(eventsFilter, 5000, web3Client.smartContracts());
        console.log("=======> Sc events received = ", events);

        // find an event that contains the emitted sc address
        const addressEvent: IEvent = events.find(event => event.data.includes("Address:"));
        const scAddress: string = addressEvent.data.split(":")[1];
        console.log("=======> Smart Contract Address = ", scAddress);

        // send a sc operation
        const callTxId = await web3Client.smartContracts().callSmartContract({
            fee: 0,
            gasPrice: 0,
            maxGas: 200000,
            parallelCoins: 0,
            sequentialCoins: 0,
            targetAddress: scAddress,
            functionName: "play",
            parameter: JSON.stringify({index : 1}),
        } as ICallData, baseAccount);
        const callScOperationId = callTxId[0];
        console.log("=======> Call Smart Contract Op Id = ", callScOperationId);

        // get information about transaction
        const opData = await web3Client.publicApi().getOperations([callScOperationId]);
        console.log("=======> Get Operations Smart Contract Tx Summary = ", opData);

        // finally get some read state
        const readTxId = await web3Client.smartContracts().readSmartContract({
            fee: 0,
            maxGas: 200000,
            simulatedGasPrice: 0,
            targetAddress: scAddress,
            targetFunction: "getGameState",
            parameter: "undefined",
            callerAddress: baseAccount.address
        } as IReadData);
        const readScOperationId = readTxId[0];
        console.log("=======> Read Smart Contract Op Id = ", readScOperationId);

        // get sc storage data
        const scStorageData = await web3Client.smartContracts().getDatastoreEntry(scAddress, "gameState");
        console.log("=======> Get Smart Contract Storage Data = ", scStorageData);

    } catch (ex) {
        console.error("Error = ", ex.message);
    }
})();