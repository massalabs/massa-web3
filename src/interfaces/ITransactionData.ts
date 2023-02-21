import { MassaCoin } from '../web3/MassaCoin';
import { MassaFee } from '../web3/MassaFee';

export interface ITransactionData {
  fee: MassaFee;
  amount: MassaCoin;
  recipientAddress: string;
}
