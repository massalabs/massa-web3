"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3Provider = void 0;
const smartContracts_1 = require("./smartContracts");
const __1 = require("../..");
const operation_1 = require("../../operation");
const operationManager_1 = require("../../operation/operationManager");
const formatObjects_1 = require("../../client/formatObjects");
class Web3Provider extends smartContracts_1.SCProvider {
    static fromRPCUrl(url, account) {
        return new Web3Provider(new __1.JsonRPCClient(url), account);
    }
    static mainnet(account) {
        return Web3Provider.fromRPCUrl(__1.PublicApiUrl.Mainnet, account);
    }
    static buildnet(account) {
        return Web3Provider.fromRPCUrl(__1.PublicApiUrl.Buildnet, account);
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
        if (chainId === __1.CHAIN_ID.Mainnet) {
            name = __1.NetworkName.Mainnet;
        }
        else if (chainId === __1.CHAIN_ID.Buildnet) {
            name = __1.NetworkName.Buildnet;
        }
        return {
            name,
            chainId,
            url: this.client.connector.transport.uri,
            minimalFee: await this.client.getMinimalFee(),
        };
    }
    async rollOperation(type, amount, opts) {
        if (type !== operation_1.OperationType.RollBuy && type !== operation_1.OperationType.RollSell) {
            throw new Error('Invalid roll operation type.');
        }
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        if (amount <= 0) {
            throw new Error('amount of rolls must be a positive non-zero value.');
        }
        const operation = new operationManager_1.OperationManager(this.account.privateKey, this.client);
        const details = {
            fee: opts?.fee ?? (await this.client.getMinimalFee()),
            expirePeriod: await (0, operationManager_1.getAbsoluteExpirePeriod)(this.client, opts?.periodToLive),
            type,
            amount,
        };
        const operationId = await operation.send(details);
        return new operation_1.Operation(this, operationId);
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
        return this.rollOperation(operation_1.OperationType.RollBuy, amount, opts);
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
        return this.rollOperation(operation_1.OperationType.RollSell, amount, opts);
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
            to = __1.Address.fromString(to);
        }
        const operation = new operationManager_1.OperationManager(this.account.privateKey, this.client);
        const details = {
            fee: opts?.fee ?? (await this.client.getMinimalFee()),
            expirePeriod: await (0, operationManager_1.getAbsoluteExpirePeriod)(this.client, opts?.periodToLive),
            type: operation_1.OperationType.Transaction,
            amount,
            recipientAddress: to,
        };
        const operationId = await operation.send(details);
        return new operation_1.Operation(this, operationId);
    }
    // eslint-disable-next-line class-methods-use-this
    async sign(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data) {
        throw new Error('not implemented');
    }
    async callSC(params) {
        const operationId = await this.call(params);
        return new operation_1.Operation(this, operationId);
    }
    async deploySC(params) {
        const operationId = await this.deploy(params);
        const operation = new operation_1.Operation(this, operationId);
        const deployedAddress = await operation.getDeployedAddress(params.waitFinalExecution);
        return new __1.SmartContract(this, deployedAddress);
    }
    async getOperationStatus(opId) {
        return this.client.getOperationStatus(opId);
    }
    async getEvents(filter) {
        return this.client.getEvents(filter);
    }
    async getNodeStatus() {
        const status = await this.client.status();
        return (0, formatObjects_1.formatNodeStatusObject)(status);
    }
}
exports.Web3Provider = Web3Provider;
//# sourceMappingURL=web3Provider.js.map