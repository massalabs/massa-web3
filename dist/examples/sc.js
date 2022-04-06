"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ClientFactory_1 = require("../web3/ClientFactory");
const EventPoller_1 = require("../web3/EventPoller");
const EOperationStatus_1 = require("../interfaces/EOperationStatus");
const Wait_1 = require("../utils/Wait");
const baseAccount = {
    publicKey: "5Jwx18K2JXacFoZcPmTWKFgdG1mSdkpBAUnwiyEqsVP9LKyNxR",
    privateKey: "2SPTTLK6Vgk5zmZEkokqC3wgpKgKpyV5Pu3uncEGawoGyd4yzC",
    address: "9mvJfA4761u1qT8QwSWcJ4gTDaFP5iSgjQzKMaqTbrWCFo1QM"
};
(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        // init client
        const web3Client = ClientFactory_1.ClientFactory.createDefaultClient(ClientFactory_1.DefaultProviderUrls.LABNET, true, baseAccount);
        // compile sc from wasm file ready for deployment
        const compiledSc = yield web3Client.smartContracts().compileSmartContractFromWasmFile("/home/evgeni/Documents/development/massa/massa-sc-examples/build/create_tictactoe.wasm");
        if (!compiledSc.base64) {
            throw new Error("No bytecode to deploy. Check AS compiler");
        }
        // deploy smart contract
        const deployTxId = yield web3Client.smartContracts().deploySmartContract({
            fee: 0,
            maxGas: 200000,
            gasPrice: 0,
            coins: 0,
            contractDataBase64: compiledSc.base64
        }, baseAccount);
        const deploymentOperationId = deployTxId[0];
        console.log("=======> Deploy Smart Contract OpId", deploymentOperationId);
        // await included_pending state
        const status = yield web3Client.smartContracts().awaitRequiredOperationStatus(deploymentOperationId, EOperationStatus_1.EOperationStatus.INCLUDED_PENDING);
        // wait around 20 secs fo the events to be fetchable
        yield (0, Wait_1.wait)(20000);
        console.log("=======> Deploy Smart Contract Status", status);
        // poll smart contract events for the opId
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
            original_operation_id: deploymentOperationId,
            emitter_address: null,
        };
        const events = yield EventPoller_1.EventPoller.getEventsAsync(eventsFilter, 5000, web3Client.smartContracts());
        console.log("=======> Sc events received = ", events);
        // find an event that contains the emitted sc address
        const addressEvent = events.find(event => event.data.includes("Address:"));
        const scAddress = addressEvent.data.split(":")[1];
        console.log("=======> Smart Contract Address = ", scAddress);
        // send a sc operation
        const callTxId = yield web3Client.smartContracts().callSmartContract({
            fee: 0,
            gasPrice: 0,
            maxGas: 200000,
            parallelCoins: 0,
            sequentialCoins: 0,
            targetAddress: scAddress,
            functionName: "play",
            parameter: JSON.stringify({ index: 1 }),
        }, baseAccount);
        const callScOperationId = callTxId[0];
        console.log("=======> Call Smart Contract Op Id = ", callScOperationId);
        // get information about transaction
        const opData = yield web3Client.publicApi().getOperations([callScOperationId]);
        console.log("=======> Call Smart Contract Tx Summary = ", opData);
    }
    catch (ex) {
        console.error("Error = ", ex.message);
    }
}))();
//# sourceMappingURL=sc.js.map