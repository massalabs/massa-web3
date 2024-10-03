import { Version } from './crypto/interfaces/versioner';
import Sealer from './crypto/interfaces/sealer';
import { Address, PrivateKey, PublicKey, Signature } from './basicElements';
/**
 * A class representing an account.
 */
export declare class Account {
    privateKey: PrivateKey;
    publicKey: PublicKey;
    address: Address;
    version: Version;
    sealer: Sealer;
    private constructor();
    /**
     * Initializes a new account object from a private key.
     *
     * @param key - The private key of the account.
     * @param version - The version of the account.
     *
     * @returns A new instance of the Account class.
     */
    static fromPrivateKey(key: string | PrivateKey, version?: Version): Promise<Account>;
    /**
     * Generates a new account object.
     *
     * @param version - The version of the account.
     *
     * @returns A new instance of the Account class.
     */
    static generate(version?: Version): Promise<Account>;
    /**
     * Signs a message.
     *
     * @remarks
     * This function signs a byte-encoded message with the account private key.
     * The message is first hashed and then signed.
     * Do not pass a digest to this function as it will be hashed twice.
     *
     * @param message - The byte array to sign.
     *
     * @returns A signature object.
     */
    sign(message: Uint8Array): Promise<Signature>;
    /**
     * Verifies a message signature.
     *
     * @remarks
     * This function verifies a byte-encoded message signature using the account's public key.
     * The message is first hashed and then the signature is verified against the hashed message.
     * Do not pass a digest to this function as it will be hashed twice.
     *
     * @param signature - The signature to verify.
     * @param message - The byte array that was signed.
     *
     * @returns A boolean indicating whether the signature is valid.
     */
    verify(message: Uint8Array, signature: Signature): Promise<boolean>;
    /**
     * Encodes the account to a serializable object.
     *
     * @remarks
     * The serializable object can be serialized to any format (JSON, YAML, XML, etc.) on any support (file, database, browser storage, etc.).
     * The keystore format is defined in the Massa standard format document:
     * [Massa Standard Format](https://github.com/massalabs/massa-standards/blob/main/wallet/file-format.md)
     *
     * @param password - The password to encrypt the private key.
     * @param salt - The salt to use for the encryption. If not provided, a random salt will be generated.
     * @param nonce - The nonce to use for the encryption. If not provided, a random nonce will be generated.
     *
     * @returns A serializable object.
     *
     * @throws If the password is not provided for V0 and V1 keystores.
     * @throws If the version is not supported.
     */
    toKeyStore(password?: string, salt?: Uint8Array, nonce?: Uint8Array): Promise<AccountKeyStore>;
    /**
     * Decodes the account from a serializable object.
     *
     * @remarks
     * The serializable object can be serialized to any format (JSON, YAML, XML, etc.) on any support (file, database, browser storage, etc.).
     * The keystore format is defined in the Massa standard format document:
     * [Massa Standard Format](https://github.com/massalabs/massa-standards/blob/main/wallet/file-format.md)
     *
     * @param password - The password to decrypt the private key.
     * @param keystore - The serializable object to decode.
     *
     * @returns A new Account instance.
     *
     * @throws If the password is not provided for V0 and V1 keystores.
     * @throws If the version is not supported.
     */
    static fromKeyStore(keystore: AccountKeyStore, password?: string): Promise<Account>;
    /**
     * Uses the environment variables to create an account.
     *
     * @param key - The environment variable key containing the private key.
     *
     * @remarks
     * The `PRIVATE_KEY` or the provided key is required in the environment variables.
     *
     * @returns An account instance.
     */
    static fromEnv(key?: string): Promise<Account>;
}
export type AccountKeyStoreBase = {
    Address: string;
    Nickname: string;
    Salt: Uint8Array;
    Nonce: Uint8Array;
    CipheredData: Uint8Array;
    PublicKey: number[];
};
export type AccountV0KeyStore = AccountKeyStoreBase & {
    Version: Version.V0;
};
export type AccountV1KeyStore = AccountKeyStoreBase & {
    Version: Version.V1;
};
export type AccountKeyStore = AccountV0KeyStore | AccountV1KeyStore;
