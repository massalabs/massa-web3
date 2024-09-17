import { SCProvider } from './smartContracts';
import { Address, CHAIN_ID, JsonRPCClient, NetworkName, PublicApiUrl, SmartContract, } from '../..';
import { Operation, OperationType, } from '../../operation';
import { getAbsoluteExpirePeriod, OperationManager, } from '../../operation/operationManager';
import { formatNodeStatusObject } from '../../client/formatObjects';
export class Web3Provider extends SCProvider {
    static fromRPCUrl(url, account) {
        return new Web3Provider(new JsonRPCClient(url), account);
    }
    static mainnet(account) {
        return Web3Provider.fromRPCUrl(PublicApiUrl.Mainnet, account);
    }
    static buildnet(account) {
        return Web3Provider.fromRPCUrl(PublicApiUrl.Buildnet, account);
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _providerName = 'Massa web3 provider';
    get accountName() {
        return this.account.address.toString();
    }
    get providerName() {
        return this._providerName;
    }
    get address() {
        return this.account.address.toString();
    }
    async balance(final = true) {
        return this.client.getBalance(this.address.toString(), final);
    }
    async networkInfos() {
        const chainId = await this.client.getChainId();
        let name = 'Unknown';
        if (chainId === CHAIN_ID.Mainnet) {
            name = NetworkName.Mainnet;
        }
        else if (chainId === CHAIN_ID.Buildnet) {
            name = NetworkName.Buildnet;
        }
        return {
            name,
            chainId,
            url: this.client.connector.transport.uri,
            minimalFee: await this.client.getMinimalFee(),
        };
    }
    async rollOperation(type, amount, opts) {
        if (type !== OperationType.RollBuy && type !== OperationType.RollSell) {
            throw new Error('Invalid roll operation type.');
        }
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        if (amount <= 0) {
            throw new Error('amount of rolls must be a positive non-zero value.');
        }
        const operation = new OperationManager(this.account.privateKey, this.client);
        const details = {
            fee: opts?.fee ?? (await this.client.getMinimalFee()),
            expirePeriod: await getAbsoluteExpirePeriod(this.client, opts?.periodToLive),
            type,
            amount,
        };
        const operationId = await operation.send(details);
        return new Operation(this, operationId);
    }
    /**
     * Buys rolls.
     *
     * @param amount - The number of rolls to buy.
     * @param opts - Optional operation details.
     *
     * @returns The ID of the operation.
     * @throws If the amount of rolls is not a positive non-zero value.
     */
    async buyRolls(amount, opts) {
        return this.rollOperation(OperationType.RollBuy, amount, opts);
    }
    /**
     * Sells rolls.
     *
     * @param amount - The number of rolls to sell.
     * @param opts - Optional operation details.
     *
     * @returns The ID of the operation.
     * @throws If the amount of rolls is not a positive non-zero value.
     */
    async sellRolls(amount, opts) {
        return this.rollOperation(OperationType.RollSell, amount, opts);
    }
    /**
     * Transfers tokens.
     *
     * @param to - The address of the recipient.
     * @param amount - The amount of tokens to transfer.
     * @param opts - Optional operation details.
     *
     * @returns The ID of the operation.
     * @throws If the amount of tokens is not a positive non-zero value.
     */
    async transfer(to, amount, opts) {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        if (amount <= 0) {
            throw new Error('amount to transfer must be a positive non-zero value.');
        }
        if (typeof to === 'string') {
            to = Address.fromString(to);
        }
        const operation = new OperationManager(this.account.privateKey, this.client);
        const details = {
            fee: opts?.fee ?? (await this.client.getMinimalFee()),
            expirePeriod: await getAbsoluteExpirePeriod(this.client, opts?.periodToLive),
            type: OperationType.Transaction,
            amount,
            recipientAddress: to,
        };
        const operationId = await operation.send(details);
        return new Operation(this, operationId);
    }
    // eslint-disable-next-line class-methods-use-this
    async sign(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data) {
        throw new Error('not implemented');
    }
    async callSC(params) {
        const operationId = await this.call(params);
        return new Operation(this, operationId);
    }
    async deploySC(params) {
        const operationId = await this.deploy(params);
        const operation = new Operation(this, operationId);
        const deployedAddress = await operation.getDeployedAddress(params.waitFinalExecution);
        return new SmartContract(this, deployedAddress);
    }
    async getOperationStatus(opId) {
        return this.client.getOperationStatus(opId);
    }
    async getEvents(filter) {
        return this.client.getEvents(filter);
    }
    async getNodeStatus() {
        const status = await this.client.status();
        return formatNodeStatusObject(status);
    }
}
//# sourceMappingURL=web3Provider.js.map