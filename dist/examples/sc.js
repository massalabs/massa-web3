"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ClientFactory_1 = require("../web3/ClientFactory");
const EventPoller_1 = require("../web3/EventPoller");
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
        const web3Client = ClientFactory_1.ClientFactory.createDefaultClient(ClientFactory_1.DefaultProviderUrls.LABNET, true, baseAccount);
        // compile sc from wasm file ready for deployment
        const compiledSc = yield web3Client.smartContracts().compileSmartContractFromWasmFile("file.wasm");
        console.log("Compiled from string: ", JSON.stringify(compiledSc, null, 2));
        // deploy smart contract
        const deployTxId = yield web3Client.smartContracts().deploySmartContract({
            fee: 0,
            maxGas: 200000,
            gasPrice: 0,
            coins: 0,
            contractDataBase64: compiledSc.base64
        }, baseAccount);
        console.log("Deploy Smart Contract Op Ids", JSON.stringify(deployTxId, null, 2));
        // poll smart contract events to get the address
        const events = yield EventPoller_1.EventPoller.getEventsAsync(eventsFilter, 5000, web3Client.smartContracts());
        console.log("Sc events received", events);
        // send a sc operation
        const callTxId = yield web3Client.smartContracts().callSmartContract({
            fee: 0,
            gasPrice: 0,
            maxGas: 200000,
            parallelCoins: 0,
            sequentialCoins: 0,
            targetAddress: "xxxxxx",
            functionName: "call",
            parameter: JSON.stringify({ x: 1, y: 2 }),
        }, baseAccount);
        console.log("Send Smart Contract Op Ids", JSON.stringify(callTxId, null, 2));
    }
    catch (ex) {
        console.error("Error = ", ex.message);
    }
}))();
//# sourceMappingURL=sc.js.map