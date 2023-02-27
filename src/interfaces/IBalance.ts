import { MassaAmount } from '../web3/MassaAmount';

export interface IBalance {
  final: MassaAmount;
  candidate: MassaAmount;
}
