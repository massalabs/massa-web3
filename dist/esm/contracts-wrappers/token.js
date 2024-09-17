import { Args, bytesToStr, U256, U8 } from '../basicElements';
import { SmartContract } from '../smartContracts';
export class MRC20 extends SmartContract {
    async version(options) {
        const res = await this.read('version', undefined, options);
        return bytesToStr(res.value);
    }
    async name(options) {
        const res = await this.read('name', undefined, options);
        return bytesToStr(res.value);
    }
    async symbol(options) {
        const res = await this.read('symbol', undefined, options);
        return bytesToStr(res.value);
    }
    async decimals(options) {
        const res = await this.read('decimals', undefined, options);
        return Number(U8.fromBytes(res.value));
    }
    async totalSupply(options) {
        const res = await this.read('totalSupply', undefined, options);
        return U256.fromBytes(res.value);
    }
    async balanceOf(address, options) {
        const res = await this.read('balanceOf', new Args().addString(address), options);
        return U256.fromBytes(res.value);
    }
    async transfer(to, amount, options) {
        return this.call('transfer', new Args().addString(to).addU256(amount), options);
    }
    async allowance(ownerAddress, spenderAddress, options) {
        const res = await this.read('allowance', new Args().addString(ownerAddress).addString(spenderAddress), options);
        return U256.fromBytes(res.value);
    }
    async increaseAllowance(spenderAddress, amount, options) {
        return this.call('increaseAllowance', new Args().addString(spenderAddress).addU256(amount), options);
    }
    async decreaseAllowance(spenderAddress, amount, options) {
        return this.call('decreaseAllowance', new Args().addString(spenderAddress).addU256(amount), options);
    }
    async transferFrom(spenderAddress, recipientAddress, amount, options) {
        return this.call('transferFrom', new Args()
            .addString(spenderAddress)
            .addString(recipientAddress)
            .addU256(amount), options);
    }
}
//# sourceMappingURL=token.js.map