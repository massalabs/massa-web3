import { IBaseAccount } from '../../interfaces/IBaseAccount';
import { IAccount } from '@massalabs/wallet-provider';
import { base58Encode } from '../../utils/Xbqcrypto';
import { ISignature } from '../../interfaces/ISignature';
import { IRollsData } from '../../interfaces/IRollsData';
import { ITransactionData } from '../../interfaces/ITransactionData';
import { ICallData } from '../../interfaces/ICallData';
import { IContractData } from '../../interfaces/IContractData';
import { Args } from '@massalabs/web3-utils';

export class WalletProviderAccount implements IBaseAccount {
  private account: IAccount;
  constructor(account: IAccount) {
    this.account = account;
  }

  public async sign(data: Buffer | Uint8Array | string): Promise<ISignature> {
    if (data instanceof Uint8Array) {
      data = Buffer.from(data);
    }
    let bytes_signature = (await this.account.sign(data)).signature;
    const base58Encoded = base58Encode(bytes_signature);
    return {
      base58Encoded,
    };
  }

  public address(): string {
    return this.account.address();
  }

  public async sellRolls(rollsData: IRollsData): Promise<string> {
    let res = await this.account.sellRolls(rollsData.amount, rollsData.fee);
    return res.operationId;
  }

  public async buyRolls(rollsData: IRollsData): Promise<string> {
    let res = await this.account.buyRolls(rollsData.amount, rollsData.fee);
    return res.operationId;
  }

  public async sendTransaction(txData: ITransactionData): Promise<string> {
    let res = await this.account.sendTransaction(
      txData.amount,
      txData.recipientAddress,
      txData.fee,
    );
    return res.operationId;
  }

  public async callSmartContract(callData: ICallData): Promise<string> {
    let params: number[] | Args = callData.parameter;
    let paramToSend: Uint8Array | Args;

    if (params instanceof Array) {
      paramToSend = new Uint8Array(params);
    }
    if (params instanceof Args) {
      paramToSend = params;
    }

    let res = await this.account.callSC(
      callData.targetAddress,
      callData.functionName,
      paramToSend,
      callData.coins,
      callData.fee,
      callData.maxGas,
      false,
    );
    return res.operationId;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async deploySmartContract(_: IContractData): Promise<string> {
    throw new Error(
      'deploySmartContract with an account from WalletProvider is not implemented yet.',
    );
  }

  public async verify(): Promise<void> {
    return;
  }
}
