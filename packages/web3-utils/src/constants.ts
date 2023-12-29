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

export const MAINNET_CHAIN_ID = 77658377n;
export const BUILDNET_CHAIN_ID = 77658366n;
export const SECURENET_CHAIN_ID = 77658383n;
export const LABNET_CHAIN_ID = 77658376n;
export const SANDBOX_CHAIN_ID = 77n;

// Adjusted: Use the values of the constants as keys
export const CHAIN_ID_TO_NETWORK_NAME = {
  [MAINNET_CHAIN_ID.toString()]: MAINNET,
  [BUILDNET_CHAIN_ID.toString()]: BUILDNET,
  [SECURENET_CHAIN_ID.toString()]: SECURENET,
  [LABNET_CHAIN_ID.toString()]: LABNET,
  [SANDBOX_CHAIN_ID.toString()]: SANDBOX,
} as const;

// Define ChainId type as the keys of CHAIN_ID_TO_NETWORK_NAME
export type ChainId = keyof typeof CHAIN_ID_TO_NETWORK_NAME;

// NETWORK_NAME_TO_CHAIN_ID mapping remains the same
export const CHAIN_ID = {
  [MAINNET]: MAINNET_CHAIN_ID,
  [BUILDNET]: BUILDNET_CHAIN_ID,
  [SECURENET]: SECURENET_CHAIN_ID,
  [LABNET]: LABNET_CHAIN_ID,
  [SANDBOX]: SANDBOX_CHAIN_ID,
} as const;

// Define NetworkName type as the keys of NETWORK_NAME_TO_CHAIN_ID
export type NetworkName = keyof typeof CHAIN_ID;
