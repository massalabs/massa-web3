/// <reference types="node" />
import { IBlockHeaderInfo } from '../interfaces/IBlockcliqueBlockBySlot';
import { ISubscribeNewBlocksMessage } from '../interfaces/ISubscribeNewBlocksMessage';
import { IClientConfig } from '../interfaces/IClientConfig';
import { WsBaseClient } from './WsBaseClient';
import { ISubscribedFullBlocksMessage } from '../interfaces/ISubscribedFullBlocksMessage';
/** Public Ws Client for interacting with the massa network */
export declare class WsSubscriptionClient extends WsBaseClient {
    private subIds;
    private subMethods;
    private onNewBlockHandler?;
    private onNewBlockHeaderHandler?;
    private onFilledBlockHandler?;
    constructor(clientConfig: IClientConfig);
    subscribeNewBlockHeaders(onNewBlockHeaderHandler?: (data: IBlockHeaderInfo) => void): void;
    unsubscribeNewBlockHeaders(): void;
    subscribeNewBlocks(onNewBlockHandler?: (data: ISubscribeNewBlocksMessage) => void): void;
    unsubscribeNewBlocks(): void;
    subscribeFilledBlocks(onFilledBlockHandler?: (data: ISubscribedFullBlocksMessage) => void): void;
    unsubscribeFilledBlocks(): void;
    protected parseWsMessage(data: string | Buffer | ArrayBuffer | Buffer[]): void;
}
