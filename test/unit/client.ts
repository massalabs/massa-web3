import { IAccount } from "../../interfaces/IAccount";
import { IClientConfig } from "../../interfaces/IClientConfig";
import { IProvider } from "../../interfaces/IProvider";
import { JsonRpcResponseData } from "../../interfaces/JsonRpcResponseData";
import { Client } from "../../web3/Client";
import {CompilerOptions, compileString} from "assemblyscript/cli/asc";

const ADDRESSES = {
    currentPlayer: '2PnbfdjnrBPe6LYVixwQtmq6PoGguXiDnZCVCBmcThmt9JwLoF',
    gameState: '2Wo22kCJASiqEu4XSF8YUaP4i5BMwGH2Zaadup9BcYPVaq1eWp',
    smartContract: 'x5hdCdDvEa7fMT1JtfvwvEymaWioeHr6d6DsQEit8cGFGTk4X'
};

const SMART_CONTRACT = `
/* Tic Tac Toe Implementation for Massa Labs
 *
 * */
import { Storage, Context, include_base64, call, print, create_sc } from "massa-sc-std";
import { JSON } from "json-as";

function createContract(): string {
    const bytes = include_base64('./build/tictactoe_play.wasm'); // <---------- HACK I HOPE TO REMOVE
    const sc_address = create_sc(bytes);
    return sc_address;
}

export function main(_args: string): i32 {
    const sc_address = createContract();
    call(sc_address, "initialize", "", 0);
    print("Initialized, address:" + sc_address);
    call(sc_address, "play", JSON.stringify<PlayArgs>({index: 0}), 0)
    call(sc_address, "play", JSON.stringify<PlayArgs>({index: 3}), 0)
    call(sc_address, "play", JSON.stringify<PlayArgs>({index: 1}), 0)
    call(sc_address, "play", JSON.stringify<PlayArgs>({index: 4}), 0)
    call(sc_address, "play", JSON.stringify<PlayArgs>({index: 2}), 0)
    print("Current player:" + Storage.get_data_for(sc_address, "currentPlayer"))
    print("Game state:" + Storage.get_data_for(sc_address, "gameState"))
    print("Game winner:" + Storage.get_data_for(sc_address, "gameWinner"))
    return 0;
}

/*****************************************************************************/

@json
export class PlayArgs {
    index: u32 = 0;
}

export function initialize(_args: string): void {
    Storage.set_data("currentPlayer", "X");
    Storage.set_data("gameState", "n,n,n,n,n,n,n,n,n");
    Storage.set_data("gameWinner", "n");
}

export function play(_args: string): void {
    const args = JSON.parse<PlayArgs>(_args);
    let game_winner = Storage.get_data("gameWinner");
    if (game_winner == "n") {
        let player = Storage.get_data("currentPlayer");
        let game_state = Storage.get_data("gameState");
        let vec_game_state = game_state.split(",");
        assert(args.index >= 0);
        assert(args.index < 9);
        if (vec_game_state[args.index] == "n") {
            vec_game_state[args.index] = player;
            Storage.set_data("gameState", vec_game_state.join());
            if (player == "X") {
                Storage.set_data("currentPlayer", "O");
            }
            else {
                Storage.set_data("currentPlayer", "X");
            }
            _checkWin(player)
        }
    }
}

function _checkWin(player: string): void {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let game_state = Storage.get_data("gameState");
    let vec_game_state = game_state.split(",");

    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = vec_game_state[winCondition[0]];
        let b = vec_game_state[winCondition[1]];
        let c = vec_game_state[winCondition[2]];
        if (a == "n" || b == "n" || c == "n") {
            continue;
        }
        if (a == b && b == c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        Storage.set_data("gameWinner", player);
    }

    let roundDraw = !vec_game_state.includes("n");
    if (roundDraw) {
        Storage.set_data("gameWinner", "draw");
    }
}
`

const fee: number = 0
const max_gas: number = 1000000
const gas_price: number = 0
const coins: number = 0
const expire_period: number = 0;
const privateKey: string = "2SPTTLK6Vgk5zmZEkokqC3wgpKgKpyV5Pu3uncEGawoGyd4yzC";
const publicKey: string = "5Jwx18K2JXacFoZcPmTWKFgdG1mSdkpBAUnwiyEqsVP9LKyNxR";

(async () => {

    /*
    const { stdout: stderr, binary, text } = compileString(SMART_CONTRACT, {
        optimizeLevel: 3,
        runtime: "stub",
    } as CompilerOptions);

    console.log("binary", binary);
    console.log("text", text);

    const sc_data = btoa(binary.toString());
    console.log("sc_data", sc_data);
    */

    const baseAccount = {
        publicKey,
        privateKey,
    } as IAccount;

    const providers: Array<IProvider> = [{
        url: "127.0.0.1:33034",
    } as IProvider];

    const web3ClientConfig = {
        providers,
        defaultProviderIndex: 0,
        retryStrategyOn: true
    } as IClientConfig;

    const web3Client: Client = new Client(web3ClientConfig, baseAccount);
    
    // get status rpc request
    const status = await getStatus(web3Client);
    console.error("Massa chain status", status);

    // get addresses rpc request
    //await getAddresses(web3Client);
})();

async function getAddresses(web3Client: Client): Promise<JsonRpcResponseData> {
    let resp: JsonRpcResponseData = null;
    try {
        resp = await web3Client.sendJsonRPCRequest('get_addresses', [[ADDRESSES.smartContract]]);
    } catch (e) {
        console.error("Got an error when getting addresses", e);
    }
    return resp;
}

async function getStatus(web3Client: Client): Promise<JsonRpcResponseData> {
    let resp: JsonRpcResponseData = null;
    try {
        resp = await web3Client.sendJsonRPCRequest('get_status', []);
    } catch (e) {
        console.error("Got an error when getting status", e);
    }
    return resp;
}