"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const IProvider_1 = require("../../interfaces/IProvider");
const Client_1 = require("../../web3/Client");
const ClientFactory_1 = require("../../web3/ClientFactory");
const WalletClient_1 = require("../../web3/WalletClient");
const EventPoller_1 = require("../../web3/EventPoller");
const SMART_CONTRACT_EXAMPLE = `
import { print } from "massa-sc-std";

export function main(_args: string): void {
    print("hello world");
}
export function add(x: number, y: number): number { return x+y };`;
const baseAccount = {
    publicKey: "5Jwx18K2JXacFoZcPmTWKFgdG1mSdkpBAUnwiyEqsVP9LKyNxR",
    privateKey: "2SPTTLK6Vgk5zmZEkokqC3wgpKgKpyV5Pu3uncEGawoGyd4yzC",
    address: "9mvJfA4761u1qT8QwSWcJ4gTDaFP5iSgjQzKMaqTbrWCFo1QM"
};
const providers = [
    {
        url: "http://127.0.0.1:33035",
        type: IProvider_1.ProviderType.PUBLIC
    },
    {
        url: "http://127.0.0.1:33034",
        type: IProvider_1.ProviderType.PRIVATE
    }
];
const testGroupPublicApi = (web3Client) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    // get node status
    const nodeStatus = yield web3Client.publicApi().getNodeStatus();
    console.log("getNodeStatus::JSON RPC RESPONSE", JSON.stringify(nodeStatus, null, 2));
    // get block
    const blocks = yield web3Client.publicApi().getBlocks(["nKifcnGbd9zu8nu1hb94XEmMGwgoWbjj3DutzrobeHDdUtEuM"]);
    console.log("getBlocks::JSON RPC RESPONSE", JSON.stringify(blocks, null, 2));
    // get endorsements
    const endorsements = yield web3Client.publicApi().getEndorsements(["q2XVw4HrRfwtX8FGXak2VwtTNkBvYtLVW67s8pTCVPdEEeG6J"]);
    console.log("getEndorsements::JSON RPC RESPONSE", JSON.stringify(endorsements, null, 2));
    // get operations
    const operations = yield web3Client.publicApi().getOperations(["z1cNsWAdgvoASq5RnN6MRbqqo634RRJbgwV9n3jNx3rQrQKTt"]);
    console.log("getOperations::JSON RPC RESPONSE", JSON.stringify(operations, null, 2));
    // get addresses
    const addressesResp = yield web3Client.publicApi().getAddresses(["2GcahavufBH9tqVH6SjkSCPXRbqpiCwwSfwFAf3veKiJmiHubK"]);
    console.log("getAddresses::Smart contract addresses info: ", JSON.stringify(addressesResp, null, 2));
    // get cliques
    const cliques = yield web3Client.publicApi().getCliques();
    console.log("getCliques::JSON RPC RESPONSE", JSON.stringify(cliques, null, 2));
    // get staking addresses
    const stakers = yield web3Client.publicApi().getStakers();
    console.log("getStakers::JSON RPC RESPONSE", JSON.stringify(stakers, null, 2));
});
const testGroupPrivateApi = (web3Client) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    // stop node
    yield web3Client.privateApi().nodeStop();
    // ban ip address
    yield web3Client.privateApi().banIpAddress("192.168.1.1");
    // unban ip address
    yield web3Client.privateApi().unbanIpAddress("192.168.1.1");
    // get staking addresses
    const stakingAddresses = yield web3Client.privateApi().nodeGetStakingAddresses();
    console.log("Staking Addresses: ", JSON.stringify(stakingAddresses, null, 2));
    // node sign message
    const message = "hello world";
    const msgBuf = new TextEncoder().encode(message);
    const signedMessage = yield web3Client.privateApi().nodeSignMessage(msgBuf);
    console.log("Signed Message: ", JSON.stringify(signedMessage, null, 2));
    // remove staking addresses
    yield web3Client.privateApi().nodeRemoveStakingAddresses(["2Wo22kCJASiqEu4XSF8YUaP4i5BMwGH2Zaadup9BcYPVaq1eWp"]);
    // add staking private keys
    yield web3Client.privateApi().nodeAddStakingPrivateKeys(["2snKEK1ADWnQX5Mda99riL2kUwy1WjTxWDuCkoExiSC1KPE3vJ"]);
});
const testGroupWallet = (web3Client) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    // STATIC: generate new wallet
    const newWalletAccount = yield WalletClient_1.WalletClient.walletGenerateNewAccount();
    console.log("New Wallet Account: ", JSON.stringify(newWalletAccount, null, 2));
    // STATIC: sign random message
    const sig = yield WalletClient_1.WalletClient.walletSignMessage("hello", baseAccount);
    console.log("Signature Info: ", JSON.stringify(sig, null, 2));
    // add account by private key
    yield web3Client.wallet().addPrivateKeysToWallet(["2SPTTLK6Vgk5zmZEkokqC3wgpKgKpyV5Pu3uncEGawoGyd4yzC"]);
    // get all accounts in wallet
    const walletAccounts = web3Client.wallet().getWalletAccounts();
    console.log("wallet Accounts: ", JSON.stringify(walletAccounts, null, 2));
    // find account in wallet by address
    const walletAccount = web3Client.wallet().getWalletAccountByAddress("9mvJfA4761u1qT8QwSWcJ4gTDaFP5iSgjQzKMaqTbrWCFo1QM");
    console.log("Found Wallet Account:", JSON.stringify(walletAccount, null, 2));
    // add accounts to wallet
    yield web3Client.wallet().addAccountsToWallet([{
            privateKey: "2a4dobJSVb8CN7cQCEL4cfU6xsUNrtwGXQvUPqzUXhEedvzGjc",
            publicKey: "5tdoCo5TwvYZoRjnoqZHDsvff3Z9pXTP1gnEgN9FFS7WWbjjn2",
            address: "yKCRYgv5nVDVwqHmTTXXxqqZW7he3bgEDBQ5bPjBxPkuzAte2"
        }]);
    // get wallet info
    const walletInfo = yield web3Client.wallet().walletInfo();
    console.log("Wallet Info: ", JSON.stringify(walletInfo, null, 2));
    // send native transaction between two wallet accounts
    const sendTxIds = yield web3Client.wallet().sendTransaction({
        fee: 0,
        amount: "1",
        recipientAddress: "yKCRYgv5nVDVwqHmTTXXxqqZW7he3bgEDBQ5bPjBxPkuzAte2"
    }, baseAccount);
    console.log("sendTxIds", JSON.stringify(sendTxIds, null, 2));
    // buy rolls
    const buyRollsIds = yield web3Client.wallet().buyRolls({
        fee: 0,
        amount: 1, //ROLLS
    }, baseAccount);
    console.log("buyRollsIds", JSON.stringify(buyRollsIds, null, 2));
    // send rolls
    const sellRollsIds = yield web3Client.wallet().sellRolls({
        fee: 0,
        amount: 1, //ROLLS
    }, baseAccount);
    console.log("sellRollsIds", JSON.stringify(sellRollsIds, null, 2));
});
const testGroupSmartContracts = (web3Client) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    // compile smart contract
    const compiledScFromSource = yield web3Client.smartContracts().compileSmartContractFromSourceFile({
        smartContractFilePath: "path_to.ts",
    });
    console.log("Compiled from .ts: ", JSON.stringify(compiledScFromSource, null, 2));
    const compiledScFromFile = yield web3Client.smartContracts().compileSmartContractFromWasmFile("path_to.wasm");
    console.log("Compiled from file: ", JSON.stringify(compiledScFromFile, null, 2));
    const compiledScFromString = yield web3Client.smartContracts().compileSmartContractFromString(SMART_CONTRACT_EXAMPLE);
    console.log("Compiled from string: ", JSON.stringify(compiledScFromString, null, 2));
    // deploy smart contract
    const opIds = yield web3Client.smartContracts().deploySmartContract({
        fee: 0,
        maxGas: 200000,
        gasPrice: 0,
        coins: 0,
        contractDataBase64: compiledScFromFile.base64
    }, baseAccount);
    console.log("Deploy Smart Contract Op Ids", JSON.stringify(opIds, null, 2));
    // fetch smart contract events
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
        emitter_address: "9mvJfA4761u1qT8QwSWcJ4gTDaFP5iSgjQzKMaqTbrWCFo1QM",
    };
    // get filtered events
    const events = yield web3Client.smartContracts().getFilteredScOutputEvents(eventsFilter);
    console.log("Filtered Events: ", JSON.stringify(events, null, 2));
    // poll smart contract events
    const eventPoller = new EventPoller_1.EventPoller(eventsFilter, 5000, web3Client.smartContracts());
    eventPoller.startPolling();
    eventPoller.on(EventPoller_1.ON_EVENT, (data) => console.log("Events Received", data));
    const eventsAsync = yield EventPoller_1.EventPoller.getEventsAsync(eventsFilter, 5000, web3Client.smartContracts());
    console.log("Events Received", eventsAsync);
    const readOnlyResponse = yield web3Client.smartContracts().executeReadOnlySmartContract({
        fee: 0,
        maxGas: 200000,
        gasPrice: 0,
        coins: 0,
        contractDataBase64: compiledScFromFile.base64,
        contractDataBinary: compiledScFromFile.binary,
        address: "TAkCGKH8it8HVrBbG8vG8ZKJBEYng4Xvp8uMBk4vfH5WX3RHg"
    });
    console.log("Readonly response: ", JSON.stringify(readOnlyResponse, null, 2));
});
const getLocalClient = () => {
    const web3ClientConfig = {
        providers,
        retryStrategyOn: false,
    };
    const web3Client = new Client_1.Client(web3ClientConfig, baseAccount);
    return web3Client;
};
const getTestnetClient = () => {
    const web3Client = ClientFactory_1.ClientFactory.createDefaultClient(ClientFactory_1.DefaultProviderUrls.TESTNET, false, baseAccount);
    return web3Client;
};
(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        // ============= CLIENT ===================== //
        //const web3Client: Client = getTestnetClient();
        // OR
        const web3Client = getLocalClient();
        // ============= PUBLIC API ================= //
        yield testGroupPublicApi(web3Client);
        // ============= PRIVATE API ================ //
        yield testGroupPrivateApi(web3Client);
        // ============= WALLET ===================== //
        yield testGroupWallet(web3Client);
        // ============= SMART CONTRACTS ============ //
        yield testGroupSmartContracts(web3Client);
    }
    catch (ex) {
        console.error("Error = ", ex.message);
    }
}))();
//# sourceMappingURL=client.js.map