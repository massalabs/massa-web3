import { IAccount } from "../../interfaces/IAccount";
import { IClientConfig } from "../../interfaces/IClientConfig";
import { IProvider, ProviderType } from "../../interfaces/IProvider";
import { Client } from "../../web3/Client";
import * as wasmCli from "assemblyscript/cli/asc";
import { INodeStatus } from "../../interfaces/INodeStatus";
import { IAddressInfo, IFullAddressInfo } from "../../interfaces/IAddressInfo";
import * as fs from "fs";
import { SmartContractUtils } from "../../web3/SmartContractUtils";
import { IBlockInfo } from "../../interfaces/IBlockInfo";
import { IEndorsement } from "../../interfaces/IEndorsement";
import { IOperationData } from "../../interfaces/IOperationData";
import { IClique } from "../../interfaces/IClique";
import { IStakingAddresses } from "../../interfaces/IStakingAddresses";

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

(async () => {

    try {



        //const smartContractLoader = new SmartContractLoader();
        //const compiledData = await smartContractLoader.compileSmartContractFromFile({
        //    smartContractFilePath: "/home/evgeni/Documents/development/massa/massa-web3/test/unit/myModule.ts",
        //});
        //const compiledData = await smartContractLoader.compileSmartContractFromString(TEXT);
        //console.log("binary", compiledData.binary);
        //console.log("text", compiledData.text);


        // ============= CLIENT ================ //
        const baseAccount = {
            publicKey,
            privateKey,
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

        const web3ClientConfig = {
            providers,
            retryStrategyOn: false
        } as IClientConfig;

        const web3Client: Client = new Client(web3ClientConfig, baseAccount);
        
        // ============= PUBLIC API ================ //

        // get node status
        //const nodeStatus: INodeStatus = await web3Client.publicApi().getNodeStatus();
        //console.error("JSON RPC RESPONSE", JSON.stringify(nodeStatus, null, 2));

        // get block
        //const blocks: Array<IBlockInfo> = await web3Client.publicApi().getBlocks(["q2XVw4HrRfwtX8FGXak2VwtTNkBvYtLVW67s8pTCVPdEEeG6J"]);
        //console.error("JSON RPC RESPONSE", JSON.stringify(blocks, null, 2));

        // get endorsements
        //const endorsements: Array<IEndorsement> = await web3Client.publicApi().getEndorsements(["q2XVw4HrRfwtX8FGXak2VwtTNkBvYtLVW67s8pTCVPdEEeG6J"]);
        //console.error("JSON RPC RESPONSE", JSON.stringify(endorsements, null, 2));

        // get operations
        //const operations: Array<IOperationData> = await web3Client.publicApi().getOperations(["29Z4RrPNwukMFo7B4Tb21rW7JCXGkqeHFbER19zP6Fzn1FLzhm"]);
        //console.error("JSON RPC RESPONSE", JSON.stringify(operations, null, 2));

        // get addresses
        //const addressesResp: Array<IAddressInfo> = await web3Client.publicApi().getAddresses([ADDRESSES.smartContract, ADDRESSES.currentPlayer]);
        //console.error("Smart contract addresses", JSON.stringify(addressesResp, null, 2));

        // get cliques
        //const cliques: Array<IClique> = await web3Client.publicApi().getCliques();
        //console.error("JSON RPC RESPONSE", JSON.stringify(cliques, null, 2));

        // get staking addresses
        //const stakers: Array<IStakingAddresses> = await web3Client.publicApi().getStakers();
        //console.error("JSON RPC RESPONSE", JSON.stringify(stakers, null, 2));

        // ============= PRIVATE API ================ //
        // stop node
        //await web3Client.privateApi().nodeStop();

        // ban ip address
        //await web3Client.privateApi().banIpAddress("192.168.1.1");

        // unban ip address
        //await web3Client.privateApi().unbanIpAddress("192.168.1.1");

        // get staking addresses
        //const stakingAddresses = await web3Client.privateApi().nodeGetStakingAddresses();
        //console.error("stakingAddresses", JSON.stringify(stakingAddresses, null, 2));

        // node sign message
        //const message = "hello world";
        //const msgBuf = new TextEncoder().encode(message);
        //const signedMessage = await web3Client.privateApi().nodeSignMessage(msgBuf);
        //console.error("signedMessage", JSON.stringify(signedMessage, null, 2));

        // remove staking addresses
        //await web3Client.privateApi().nodeRemoveStakingAddresses(["2Wo22kCJASiqEu4XSF8YUaP4i5BMwGH2Zaadup9BcYPVaq1eWp"]);

        // add staking pkeys
        //await web3Client.privateApi().nodeAddStakingPrivateKeys(["2snKEK1ADWnQX5Mda99riL2kUwy1WjTxWDuCkoExiSC1KPE3vJ"]);

        // ============= WALLET ================ //

        // generate new wallet
        //const newWalletAccout = web3Client.wallet().walletGenerateNewAccount();
        //console.error("newWalletAccout", JSON.stringify(newWalletAccout, null, 2));

        // get wallet info
        /*        const walletInfo: Array<IFullAddressInfo> = await web3Client.wallet().walletInfo([{
            privateKey: "2a4dobJSVb8CN7cQCEL4cfU6xsUNrtwGXQvUPqzUXhEedvzGjc",
            publicKey: "5tdoCo5TwvYZoRjnoqZHDsvff3Z9pXTP1gnEgN9FFS7WWbjjn2",
            address: "yKCRYgv5nVDVwqHmTTXXxqqZW7he3bgEDBQ5bPjBxPkuzAte2"
        }]);
        console.error("wallet Info", JSON.stringify(walletInfo, null, 2));
        */
       

    } catch (ex) {
        console.error("Error = ", ex.message);
    }
})();