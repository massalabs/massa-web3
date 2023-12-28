import { fromMAS } from './converters';

/* -------------------------------------------------------------------------- */
/*                                    KEYS                                    */
/* -------------------------------------------------------------------------- */
export const SECRET_KEY_PREFIX = 'S';
export const PUBLIC_KEY_PREFIX = 'P';
export const ADDRESS_USER_PREFIX = 'AU';
export const ADDRESS_CONTRACT_PREFIX = 'AS';
export const ADDRESS_PREFIX_LENGTH = 2;
export const KEYS_VERSION_NUMBER = 0;

/* -------------------------------------------------------------------------- */
/*                                STORAGE COST                                */
/* -------------------------------------------------------------------------- */
export const STORAGE_BYTE_COST = fromMAS(0.0001);
export const NEW_LEDGER_ENTRY_COST = STORAGE_BYTE_COST * 4n;
export const BASE_ACCOUNT_CREATION_COST = fromMAS(0.001);

/* -------------------------------------------------------------------------- */
/*                                 GAS LIMIT                                 */
/* -------------------------------------------------------------------------- */
export const MAX_GAS_EXECUTE_SC = 3_980_167_295n;
export const MAX_GAS_DEPLOYMENT = MAX_GAS_EXECUTE_SC;
export const MAX_GAS_CALL = 4_294_167_295n;

/* -------------------------------------------------------------------------- */
/*                                   NETWORK                                  */
/* -------------------------------------------------------------------------- */
export const MAINNET = 'MainNet';
export const BUILDNET = 'BuildNet';
export const SECURENET = 'SecureNet';
export const LABNET = 'LabNet';
export const SANDBOX = 'Sandbox';

export const CHAIN_ID_TO_NETWORK_NAME = {
  77658377: MAINNET,
  77658366: BUILDNET,
  77658383: SECURENET,
  77658376: LABNET,
  77: SANDBOX,
} as const; // type is inferred as the specific, unchangeable structure
