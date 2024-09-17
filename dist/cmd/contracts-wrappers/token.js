"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MRC20 = void 0;
const basicElements_1 = require("../basicElements");
const smartContracts_1 = require("../smartContracts");
class MRC20 extends smartContracts_1.SmartContract {
    async version(options) {
        const res = await this.read('version', undefined, options);
        return (0, basicElements_1.bytesToStr)(res.value);
    }
    async name(options) {
        const res = await this.read('name', undefined, options);
        return (0, basicElements_1.bytesToStr)(res.value);
    }
    async symbol(options) {
        const res = await this.read('symbol', undefined, options);
        return (0, basicElements_1.bytesToStr)(res.value);
    }
    async decimals(options) {
        const res = await this.read('decimals', undefined, options);
        return Number(basicElements_1.U8.fromBytes(res.value));
    }
    async totalSupply(options) {
        const res = await this.read('totalSupply', undefined, options);
        return basicElements_1.U256.fromBytes(res.value);
    }
    async balanceOf(address, options) {
        const res = await this.read('balanceOf', new basicElements_1.Args().addString(address), options);
        return basicElements_1.U256.fromBytes(res.value);
    }
    async transfer(to, amount, options) {
        return this.call('transfer', new basicElements_1.Args().addString(to).addU256(amount), options);
    }
    async allowance(ownerAddress, spenderAddress, options) {
        const res = await this.read('allowance', new basicElements_1.Args().addString(ownerAddress).addString(spenderAddress), options);
        return basicElements_1.U256.fromBytes(res.value);
    }
    async increaseAllowance(spenderAddress, amount, options) {
        return this.call('increaseAllowance', new basicElements_1.Args().addString(spenderAddress).addU256(amount), options);
    }
    async decreaseAllowance(spenderAddress, amount, options) {
        return this.call('decreaseAllowance', new basicElements_1.Args().addString(spenderAddress).addU256(amount), options);
    }
    async transferFrom(spenderAddress, recipientAddress, amount, options) {
        return this.call('transferFrom', new basicElements_1.Args()
            .addString(spenderAddress)
            .addString(recipientAddress)
            .addU256(amount), options);
    }
}
exports.MRC20 = MRC20;
//# sourceMappingURL=token.js.map