import { IAccount } from "../../interfaces/IAccount";
import { IClientConfig } from "../../interfaces/IClientConfig";
import { IProvider, ProviderType } from "../../interfaces/IProvider";
import { Client } from "../../web3/Client";
import * as wasmCli from "assemblyscript/cli/asc";
import { INodeStatus } from "../../interfaces/INodeStatus";
import { IAddressInfo, IFullAddressInfo } from "../../interfaces/IAddressInfo";
import * as fs from "fs";
import { CompiledSmartContract, SmartContractsClient, WasmConfig } from "../../web3/SmartContractsClient";
import { IBlockInfo } from "../../interfaces/IBlockInfo";
import { IEndorsement } from "../../interfaces/IEndorsement";
import { IOperationData } from "../../interfaces/IOperationData";
import { IClique } from "../../interfaces/IClique";
import { IStakingAddresses } from "../../interfaces/IStakingAddresses";
import { ClientFactory, DefaultProviderUrls } from "../../web3/ClientFactory";
import { ILatestPeriodInfo } from "../../interfaces/ILatestPeriodInfo";
import { WalletClient } from "../../web3/WalletClient";
import { ITransactionData } from "../../interfaces/ITransactionData";
import { IRollsData } from "../../interfaces/IRollsData";
import { IContractData } from "../../interfaces/IContractData";

const ADDRESSES = {
    currentPlayer: '2PnbfdjnrBPe6LYVixwQtmq6PoGguXiDnZCVCBmcThmt9JwLoF',
    gameState: '2Wo22kCJASiqEu4XSF8YUaP4i5BMwGH2Zaadup9BcYPVaq1eWp',
    smartContract: 'x5hdCdDvEa7fMT1JtfvwvEymaWioeHr6d6DsQEit8cGFGTk4X'
};

const SMART_SIMPLE_CONTRACT = `
let x = 7;
function add(x: number, y: number): number { return x+y };
` 

const SMART_SIMPLE_CONTRACT_IMPORTS = `
import { print } from "massa-sc-std";
let x = 7;
export function main(_args: string): void {
    print("hello world");
}
function add(x: number, y: number): number { return x+y };
` 

const fee: number = 0
const max_gas: number = 2000000
const gas_price: number = 0
const coins: number = 0
const expire_period: number = 0;
const privateKey: string = "2SPTTLK6Vgk5zmZEkokqC3wgpKgKpyV5Pu3uncEGawoGyd4yzC";
const publicKey: string = "5Jwx18K2JXacFoZcPmTWKFgdG1mSdkpBAUnwiyEqsVP9LKyNxR";
const address: string = "9mvJfA4761u1qT8QwSWcJ4gTDaFP5iSgjQzKMaqTbrWCFo1QM";

(async () => {

    try {

        // ============= CLIENT ================ //
        const baseAccount = {
            publicKey,
            privateKey,
            address
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

        /*
        const web3ClientConfig = {
            providers,
            retryStrategyOn: false,
        } as IClientConfig;
        const web3Client: Client = new Client(web3ClientConfig, baseAccount);
        */

        const web3Client = ClientFactory.createDefaultClient(DefaultProviderUrls.TESTNET, false, baseAccount);
        
        // ============= PUBLIC API ================ //

        // get latest period
        //const latestPeriodInfo: ILatestPeriodInfo = await web3Client.publicApi().getLatestPeriodInfo();
        //console.log("Latest Period Info", JSON.stringify(latestPeriodInfo, null, 2));

        // get node status
        //const nodeStatus: INodeStatus = await web3Client.publicApi().getNodeStatus();
        //console.log("JSON RPC RESPONSE", JSON.stringify(nodeStatus, null, 2));

        // get block
        //const blocks: Array<IBlockInfo> = await web3Client.publicApi().getBlocks(["nKifcnGbd9zu8nu1hb94XEmMGwgoWbjj3DutzrobeHDdUtEuM"]);
        //console.log("JSON RPC RESPONSE", JSON.stringify(blocks, null, 2));

        // get endorsements
        //const endorsements: Array<IEndorsement> = await web3Client.publicApi().getEndorsements(["q2XVw4HrRfwtX8FGXak2VwtTNkBvYtLVW67s8pTCVPdEEeG6J"]);
        //console.log("JSON RPC RESPONSE", JSON.stringify(endorsements, null, 2));

        // get operations
        //const operations: Array<IOperationData> = await web3Client.publicApi().getOperations(["N9KTqSgG1Ux3jV5HxtjHEjeVR245GhpYfKmnyPsrJHT3que82"]);
        //console.log("JSON RPC RESPONSE", JSON.stringify(operations, null, 2));

        // get addresses
        //const addressesResp: Array<IAddressInfo> = await web3Client.publicApi().getAddresses(["2GcahavufBH9tqVH6SjkSCPXRbqpiCwwSfwFAf3veKiJmiHubK"]);
        //console.log("Smart contract addresses", JSON.stringify(addressesResp, null, 2));

        // get cliques
        //const cliques: Array<IClique> = await web3Client.publicApi().getCliques();
        //console.log("JSON RPC RESPONSE", JSON.stringify(cliques, null, 2));

        // get staking addresses
        //const stakers: Array<IStakingAddresses> = await web3Client.publicApi().getStakers();
        //console.log("JSON RPC RESPONSE", JSON.stringify(stakers, null, 2));

        // ============= PRIVATE API ================ //

        // stop node
        //await web3Client.privateApi().nodeStop();

        // ban ip address
        //await web3Client.privateApi().banIpAddress("192.168.1.1");

        // unban ip address
        //await web3Client.privateApi().unbanIpAddress("192.168.1.1");

        // get staking addresses
        //const stakingAddresses = await web3Client.privateApi().nodeGetStakingAddresses();
        //console.log("stakingAddresses", JSON.stringify(stakingAddresses, null, 2));

        // node sign message
        //const message = "hello world";
        //const msgBuf = new TextEncoder().encode(message);
        //const signedMessage = await web3Client.privateApi().nodeSignMessage(msgBuf);
        //console.log("signedMessage", JSON.stringify(signedMessage, null, 2));

        // remove staking addresses
        //await web3Client.privateApi().nodeRemoveStakingAddresses(["2Wo22kCJASiqEu4XSF8YUaP4i5BMwGH2Zaadup9BcYPVaq1eWp"]);

        // add staking private keys
        //await web3Client.privateApi().nodeAddStakingPrivateKeys(["2snKEK1ADWnQX5Mda99riL2kUwy1WjTxWDuCkoExiSC1KPE3vJ"]);

        // ============= WALLET ================ //

        // STATIC: generate new wallet
        //const newWalletAccount = await WalletClient.walletGenerateNewAccount();
        //console.log("new wallet account", JSON.stringify(newWalletAccount, null, 2));

        // STATIC: sign random message
        //const sig = await WalletClient.walletSignMessage("hello", baseAccount);
        //console.log("signature Info", JSON.stringify(sig, null, 2));

        // add account by private key
        //await web3Client.wallet().addPrivateKeysToWallet(["2SPTTLK6Vgk5zmZEkokqC3wgpKgKpyV5Pu3uncEGawoGyd4yzC"]);

        // get all accounts in wallet
        //const walletAccounts = web3Client.wallet().getWalletAccounts();
        //console.log("walletAccounts", JSON.stringify(walletAccounts, null, 2));

        // find account in wallet by address
        //const walletAccount = web3Client.wallet().getWalletAccountByAddress("9mvJfA4761u1qT8QwSWcJ4gTDaFP5iSgjQzKMaqTbrWCFo1QM");
        //console.log("Found walletAccount", JSON.stringify(walletAccount, null, 2));

        // get wallet info
        /*        await web3Client.wallet().addAccountsToWallet(
            [{
                privateKey: "2a4dobJSVb8CN7cQCEL4cfU6xsUNrtwGXQvUPqzUXhEedvzGjc",
                publicKey: "5tdoCo5TwvYZoRjnoqZHDsvff3Z9pXTP1gnEgN9FFS7WWbjjn2",
                address: "yKCRYgv5nVDVwqHmTTXXxqqZW7he3bgEDBQ5bPjBxPkuzAte2"
            }]
        );
        const walletInfo: Array<IFullAddressInfo> = await web3Client.wallet().walletInfo();
        console.log("wallet Info", JSON.stringify(walletInfo, null, 2));
        */

        /*
        const opIds = await web3Client.wallet().sendTransaction({
            fee: 0, // int
            amount: "1", //MAS
            recipientAddress: "yKCRYgv5nVDVwqHmTTXXxqqZW7he3bgEDBQ5bPjBxPkuzAte2"
        } as ITransactionData, baseAccount);
        console.log("operation ids", JSON.stringify(opIds, null, 2));
        */
        
        /*
        const opIds = await web3Client.wallet().buyRolls({
            fee: 0, // int
            amount: 1, //ROLLS
        } as IRollsData, baseAccount);
        console.log("operation ids", JSON.stringify(opIds, null, 2));
        */

        /*
        const opIds = await web3Client.wallet().sellRolls({
            fee: 0, // int
            amount: 1, //ROLLS
        } as IRollsData, baseAccount);
        console.log("operation ids", JSON.stringify(opIds, null, 2));
        */

        
        // ============= SMART CONTRACTS ================ //
        /*
        const compiledSc: CompiledSmartContract = await web3Client.smartContracts().compileSmartContractFromFile({
            smartContractFilePath: "/home/evgeni/Documents/development/massa/massa-web3/test/unit/myModule.ts",
        } as WasmConfig);
        console.log("smart contract data", JSON.stringify(compiledSc, null, 2));
        */

        const scData: CompiledSmartContract = await web3Client.smartContracts().compileSmartContractFromString(SMART_SIMPLE_CONTRACT);
        //console.log("smart contract data", JSON.stringify(scData, null, 2));

        const opIds = await web3Client.smartContracts().executeSC({
            fee: 0,
            maxGas: 100000,
            gasPrice: 0,
            coins: 0,
            contractData: null
        } as IContractData, baseAccount);
        console.log("operation ids", JSON.stringify(opIds, null, 2));

    } catch (ex) {
        console.error("Error = ", ex.message);
    }
})();