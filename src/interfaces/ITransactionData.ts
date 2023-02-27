import { MassaAmount } from '../web3/MassaAmount';

export interface ITransactionData {
  fee: MassaAmount;
  amount: MassaAmount;
  recipientAddress: string;
}
