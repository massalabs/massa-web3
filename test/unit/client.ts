import { IAccount } from "../../interfaces/IAccount";
import { IClientConfig } from "../../interfaces/IClientConfig";
import { IProvider, ProviderType } from "../../interfaces/IProvider";
import { Client } from "../../web3/Client";
import { INodeStatus } from "../../interfaces/INodeStatus";
import { IAddressInfo, IFullAddressInfo } from "../../interfaces/IAddressInfo";
import { CompiledSmartContract, WasmConfig } from "../../web3/SmartContractsClient";
import { IBlockInfo } from "../../interfaces/IBlockInfo";
import { IEndorsement } from "../../interfaces/IEndorsement";
import { IOperationData } from "../../interfaces/IOperationData";
import { IClique } from "../../interfaces/IClique";
import { IStakingAddresses } from "../../interfaces/IStakingAddresses";
import { ClientFactory, DefaultProviderUrls } from "../../web3/ClientFactory";
import { WalletClient } from "../../web3/WalletClient";
import { ITransactionData } from "../../interfaces/ITransactionData";
import { IRollsData } from "../../interfaces/IRollsData";
import { IContractData } from "../../interfaces/IContractData";
import { IEventFilter } from "../../interfaces/IEventFilter";
import { IEvent } from "../../interfaces/IEvent";
import { ISlot } from "../../interfaces/ISlot";
import { EventPoller, ON_EVENT } from "../../web3/EventPoller";
import { IExecuteReadOnlyResponse } from "../../interfaces/IExecuteReadOnlyResponse";

const SMART_CONTRACT_EXAMPLE = `
import { print } from "massa-sc-std";

export function main(_args: string): void {
    print("hello world");
}
export function add(x: number, y: number): number { return x+y };` ;

const baseAccount = {
    publicKey: "5Jwx18K2JXacFoZcPmTWKFgdG1mSdkpBAUnwiyEqsVP9LKyNxR",
    privateKey: "2SPTTLK6Vgk5zmZEkokqC3wgpKgKpyV5Pu3uncEGawoGyd4yzC",
    address: "9mvJfA4761u1qT8QwSWcJ4gTDaFP5iSgjQzKMaqTbrWCFo1QM"
} as IAccount;

const providers: Array<IProvider> = [
    {
        url: "http://127.0.0.1:33035",
        type: ProviderType.PUBLIC
    } as IProvider,
    {
        url: "http://127.0.0.1:33034",
        type: ProviderType.PRIVATE
    } as IProvider
];

const testGroupPublicApi = async (web3Client: Client): Promise<void> => {

        // get node status
        const nodeStatus: INodeStatus = await web3Client.publicApi().getNodeStatus();
        console.log("getNodeStatus::JSON RPC RESPONSE", JSON.stringify(nodeStatus, null, 2));

        // get block
        const blocks: Array<IBlockInfo> = await web3Client.publicApi().getBlocks(["nKifcnGbd9zu8nu1hb94XEmMGwgoWbjj3DutzrobeHDdUtEuM"]);
        console.log("getBlocks::JSON RPC RESPONSE", JSON.stringify(blocks, null, 2));

        // get endorsements
        const endorsements: Array<IEndorsement> = await web3Client.publicApi().getEndorsements(["q2XVw4HrRfwtX8FGXak2VwtTNkBvYtLVW67s8pTCVPdEEeG6J"]);
        console.log("getEndorsements::JSON RPC RESPONSE", JSON.stringify(endorsements, null, 2));

        // get operations
        const operations: Array<IOperationData> = await web3Client.publicApi().getOperations(["z1cNsWAdgvoASq5RnN6MRbqqo634RRJbgwV9n3jNx3rQrQKTt"]);
        console.log("getOperations::JSON RPC RESPONSE", JSON.stringify(operations, null, 2));

        // get addresses
        const addressesResp: Array<IAddressInfo> = await web3Client.publicApi().getAddresses(["2GcahavufBH9tqVH6SjkSCPXRbqpiCwwSfwFAf3veKiJmiHubK"]);
        console.log("getAddresses::Smart contract addresses info: ", JSON.stringify(addressesResp, null, 2));

        // get cliques
        const cliques: Array<IClique> = await web3Client.publicApi().getCliques();
        console.log("getCliques::JSON RPC RESPONSE", JSON.stringify(cliques, null, 2));

        // get staking addresses
        const stakers: Array<IStakingAddresses> = await web3Client.publicApi().getStakers();
        console.log("getStakers::JSON RPC RESPONSE", JSON.stringify(stakers, null, 2));
};

const testGroupPrivateApi = async (web3Client: Client): Promise<void> => {

    // stop node
    await web3Client.privateApi().nodeStop();

    // ban ip address
    await web3Client.privateApi().banIpAddress("192.168.1.1");

    // unban ip address
    await web3Client.privateApi().unbanIpAddress("192.168.1.1");

    // get staking addresses
    const stakingAddresses = await web3Client.privateApi().nodeGetStakingAddresses();
    console.log("Staking Addresses: ", JSON.stringify(stakingAddresses, null, 2));

    // node sign message
    const message = "hello world";
    const msgBuf = new TextEncoder().encode(message);
    const signedMessage = await web3Client.privateApi().nodeSignMessage(msgBuf);
    console.log("Signed Message: ", JSON.stringify(signedMessage, null, 2));

    // remove staking addresses
    await web3Client.privateApi().nodeRemoveStakingAddresses(["2Wo22kCJASiqEu4XSF8YUaP4i5BMwGH2Zaadup9BcYPVaq1eWp"]);

    // add staking private keys
    await web3Client.privateApi().nodeAddStakingPrivateKeys(["2snKEK1ADWnQX5Mda99riL2kUwy1WjTxWDuCkoExiSC1KPE3vJ"]);
};

const testGroupWallet = async (web3Client: Client): Promise<void> => {
    // STATIC: generate new wallet
    const newWalletAccount = await WalletClient.walletGenerateNewAccount();
    console.log("New Wallet Account: ", JSON.stringify(newWalletAccount, null, 2));

    // STATIC: sign random message
    const sig = await WalletClient.walletSignMessage("hello", baseAccount);
    console.log("Signature Info: ", JSON.stringify(sig, null, 2));

    // add account by private key
    await web3Client.wallet().addPrivateKeysToWallet(["2SPTTLK6Vgk5zmZEkokqC3wgpKgKpyV5Pu3uncEGawoGyd4yzC"]);

    // get all accounts in wallet
    const walletAccounts = web3Client.wallet().getWalletAccounts();
    console.log("wallet Accounts: ", JSON.stringify(walletAccounts, null, 2));

    // find account in wallet by address
    const walletAccount = web3Client.wallet().getWalletAccountByAddress("9mvJfA4761u1qT8QwSWcJ4gTDaFP5iSgjQzKMaqTbrWCFo1QM");
    console.log("Found Wallet Account:", JSON.stringify(walletAccount, null, 2));

    // add accounts to wallet
    await web3Client.wallet().addAccountsToWallet(
        [{
            privateKey: "2a4dobJSVb8CN7cQCEL4cfU6xsUNrtwGXQvUPqzUXhEedvzGjc",
            publicKey: "5tdoCo5TwvYZoRjnoqZHDsvff3Z9pXTP1gnEgN9FFS7WWbjjn2",
            address: "yKCRYgv5nVDVwqHmTTXXxqqZW7he3bgEDBQ5bPjBxPkuzAte2"
        }]
    );

    // get wallet info
    const walletInfo: Array<IFullAddressInfo> = await web3Client.wallet().walletInfo();
    console.log("Wallet Info: ", JSON.stringify(walletInfo, null, 2));

    // send native transaction between two wallet accounts
    const sendTxIds = await web3Client.wallet().sendTransaction({
        fee: 0, // int
        amount: "1", // MAS
        recipientAddress: "yKCRYgv5nVDVwqHmTTXXxqqZW7he3bgEDBQ5bPjBxPkuzAte2"
    } as ITransactionData, baseAccount);
    console.log("sendTxIds", JSON.stringify(sendTxIds, null, 2));

    // buy rolls
    const buyRollsIds = await web3Client.wallet().buyRolls({
        fee: 0, // int
        amount: 1, // ROLLS
    } as IRollsData, baseAccount);
    console.log("buyRollsIds", JSON.stringify(buyRollsIds, null, 2));

    // send rolls
    const sellRollsIds = await web3Client.wallet().sellRolls({
        fee: 0, // int
        amount: 1, // ROLLS
    } as IRollsData, baseAccount);
    console.log("sellRollsIds", JSON.stringify(sellRollsIds, null, 2));
};

const testGroupSmartContracts = async (web3Client: Client): Promise<void> => {
    // compile smart contract
    const compiledScFromSource: CompiledSmartContract = await web3Client.smartContracts().compileSmartContractFromSourceFile({
        smartContractFilePath: "path_to.ts",
    } as WasmConfig);
    console.log("Compiled from .ts: ", JSON.stringify(compiledScFromSource, null, 2));

    const compiledScFromFile: CompiledSmartContract = await web3Client.smartContracts().compileSmartContractFromWasmFile("path_to.wasm");
    console.log("Compiled from file: ", JSON.stringify(compiledScFromFile, null, 2));

    const compiledScFromString: CompiledSmartContract = await web3Client.smartContracts().compileSmartContractFromString(SMART_CONTRACT_EXAMPLE);
    console.log("Compiled from string: ", JSON.stringify(compiledScFromString, null, 2));

    // deploy smart contract
    const opIds = await web3Client.smartContracts().deploySmartContract({
        fee: 0,
        maxGas: 200000,
        gasPrice: 0,
        coins: 0,
        contractDataBase64: compiledScFromFile.base64
    } as IContractData, baseAccount);
    console.log("Deploy Smart Contract Op Ids", JSON.stringify(opIds, null, 2));

    // fetch smart contract events
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
        emitter_address: "9mvJfA4761u1qT8QwSWcJ4gTDaFP5iSgjQzKMaqTbrWCFo1QM",
    } as IEventFilter;

    // get filtered events
    const events: Array<IEvent> = await web3Client.smartContracts().getFilteredScOutputEvents(eventsFilter);
    console.log("Filtered Events: ", JSON.stringify(events, null, 2));

    // poll smart contract events
    const eventPoller = new EventPoller(eventsFilter, 5000, web3Client.smartContracts());
    eventPoller.startPolling();
    eventPoller.on(ON_EVENT, (data: [IEvent]) => console.log("Events Received", data));

    const eventsAsync: Array<IEvent> = await EventPoller.getEventsAsync(eventsFilter, 5000, web3Client.smartContracts());
    console.log("Events Received", eventsAsync);

    const readOnlyResponse: Array<IExecuteReadOnlyResponse> = await web3Client.smartContracts().executeReadOnlySmartContract({
        fee: 0,
        maxGas: 200000,
        gasPrice: 0,
        coins: 0,
        contractDataBase64: compiledScFromFile.base64,
        contractDataBinary: compiledScFromFile.binary,
        address: "TAkCGKH8it8HVrBbG8vG8ZKJBEYng4Xvp8uMBk4vfH5WX3RHg"
    } as IContractData);
    console.log("Readonly response: ", JSON.stringify(readOnlyResponse, null, 2));
};

const getLocalClient = (): Client => {
    const web3ClientConfig = {
        providers,
        retryStrategyOn: false,
    } as IClientConfig;
    const web3Client: Client = new Client(web3ClientConfig, baseAccount);
    return web3Client;
};

const getTestnetClient = (): Client => {
    const web3Client = ClientFactory.createDefaultClient(DefaultProviderUrls.TESTNET, false, baseAccount);
    return web3Client;
};

(async () => {
    try {

        // ============= CLIENT ===================== //
        // const web3Client: Client = getTestnetClient();
        // OR
        const web3Client: Client = getLocalClient();


        // ============= PUBLIC API ================= //
        await testGroupPublicApi(web3Client);


        // ============= PRIVATE API ================ //
        await testGroupPrivateApi(web3Client);


        // ============= WALLET ===================== //
        await testGroupWallet(web3Client);


        // ============= SMART CONTRACTS ============ //
        await testGroupSmartContracts(web3Client);

    } catch (ex) {
        console.error("Error = ", ex.message);
    }
})();
