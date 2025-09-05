// Constants are taken from the smart contract
// https://github.com/massalabs/massa-name-service/blob/main/smart-contract/assembly/contracts/main.ts

import { strToBytes } from '../../basicElements'

// eslint-disable-next-line  @typescript-eslint/no-magic-numbers
export const DOMAIN_SEPARATOR_KEY = [0x42]
export const TOKEN_ID_KEY_PREFIX = [0x1]
// eslint-disable-next-line  @typescript-eslint/no-magic-numbers
export const TARGET_KEY_PREFIX = [0x02]
// eslint-disable-next-line  @typescript-eslint/no-magic-numbers
export const DOMAIN_KEY_PREFIX = [0x3]
// eslint-disable-next-line  @typescript-eslint/no-magic-numbers
export const ADDRESS_KEY_PREFIX_V2 = [0x6]
export const OWNED_TOKENS_KEY = strToBytes('ownedTokens')
