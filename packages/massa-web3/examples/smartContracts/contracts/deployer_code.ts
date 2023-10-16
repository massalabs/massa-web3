import {
  generateEvent,
  createSC,
  getOpData,
  call,
  functionExists,
  hasOpKey,
} from '@massalabs/massa-as-sdk';
import { Args } from '@massalabs/as-types';

const CONSTRUCTOR = 'constructor';

/**
 * This function deploys and calls the constructor function of the deployed smart contract.
 *
 * The data structure of the operation datastore must be like describe in
 * packages/sc-deployer/src/index.ts
 *
 * @param _ - not used
 */
export function main(): StaticArray<u8> {
  const masterKey = new StaticArray<u8>(1);
  masterKey[0] = 0x00;
  if (!hasOpKey(masterKey)) {
    return [];
  }
  const nbSCSer = getOpData(masterKey);
  const nbSC = new Args(nbSCSer).nextU64().unwrap();
  for (let i: u64 = 0; i < nbSC; i++) {
    const keyBaseArgs = new Args().add(i + 1);
    const keyBaseCoins = new Args().add(i + 1);
    const key = keyBaseArgs.serialize();
    if (!hasOpKey(key)) {
      return [];
    }
    const SCBytecode = getOpData(key);
    const contractAddr = createSC(SCBytecode);
    if (functionExists(contractAddr, CONSTRUCTOR)) {
      const argsIdent = new Uint8Array(1);
      argsIdent[0] = 0x00;
      const keyArgs = keyBaseArgs.add(argsIdent).serialize();
      const coinsIdent = new Uint8Array(1);
      coinsIdent[0] = 0x01;
      const keyCoins = keyBaseCoins.add(coinsIdent).serialize();
      let args: Args;
      if (hasOpKey(keyArgs)) {
        args = new Args(getOpData(keyArgs));
      } else {
        args = new Args();
      }
      let coins: u64;
      if (hasOpKey(keyCoins)) {
        coins = new Args(getOpData(keyCoins)).nextU64().unwrap();
      } else {
        coins = 0;
      }
      call(contractAddr, CONSTRUCTOR, args, coins);
    }
    generateEvent(`Contract deployed at address: ${contractAddr.toString()}`);
  }
  return [];
}
