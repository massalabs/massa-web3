"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const versioner_1 = require("./crypto/interfaces/versioner");
const passwordSeal_1 = require("./crypto/passwordSeal");
const basicElements_1 = require("./basicElements");
/**
 * A class representing an account.
 */
class Account {
    privateKey;
    publicKey;
    address;
    version;
    sealer;
    constructor(privateKey, publicKey, address, version) {
        this.privateKey = privateKey;
        this.publicKey = publicKey;
        this.address = address;
        this.version = version;
    }
    /**
     * Initializes a new account object from a private key.
     *
     * @param key - The private key of the account.
     * @param version - The version of the account.
     *
     * @returns A new instance of the Account class.
     */
    static async fromPrivateKey(key, version = versioner_1.Version.V1) {
        if (typeof key === 'string') {
            key = basicElements_1.PrivateKey.fromString(key);
        }
        const publicKey = await key.getPublicKey();
        const address = publicKey.getAddress();
        return new Account(key, publicKey, address, version);
    }
    /**
     * Generates a new account object.
     *
     * @param version - The version of the account.
     *
     * @returns A new instance of the Account class.
     */
    static async generate(version) {
        const privateKey = basicElements_1.PrivateKey.generate();
        return Account.fromPrivateKey(privateKey, version);
    }
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
    sign(message) {
        return this.privateKey.sign(message);
    }
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
    verify(message, signature) {
        return this.publicKey.verify(message, signature);
    }
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
    async toKeyStore(password, salt, nonce) {
        switch (this.version) {
            case versioner_1.Version.V0: {
                if (!password) {
                    throw new Error('Password is required for V0 keystore');
                }
                const passwordSeal = new passwordSeal_1.PasswordSeal(password, salt, nonce);
                /* eslint-disable @typescript-eslint/naming-convention */
                // It is mandatory to follow the Massa standard.
                return {
                    Address: this.address.toString(),
                    Version: this.version,
                    Nickname: '',
                    Salt: passwordSeal.salt,
                    Nonce: passwordSeal.nonce,
                    CipheredData: await passwordSeal
                        .seal(this.privateKey.toBytes())
                        .then((a) => Array.from(a)),
                    PublicKey: Array.from(this.publicKey.toBytes()),
                };
                /* eslint-enable @typescript-eslint/naming-convention */
            }
            case versioner_1.Version.V1: {
                if (!password) {
                    throw new Error('Password is required for V1 keystore');
                }
                const passwordSeal = new passwordSeal_1.PasswordSeal(password, salt, nonce);
                /* eslint-disable @typescript-eslint/naming-convention */
                // It is mandatory to follow the Massa standard.
                return {
                    Address: this.address.toString(),
                    Version: this.version,
                    Nickname: '',
                    Salt: passwordSeal.salt,
                    Nonce: passwordSeal.nonce,
                    CipheredData: await passwordSeal
                        .seal(this.privateKey.toBytes())
                        .then((a) => Array.from(a)),
                    PublicKey: Array.from(this.publicKey.toBytes()),
                };
                /* eslint-enable @typescript-eslint/naming-convention */
            }
            default:
                throw new Error(`unsupported version`);
        }
    }
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
    static async fromKeyStore(keystore, password) {
        switch (keystore.Version) {
            case versioner_1.Version.V0: {
                if (!password) {
                    throw new Error('Password is required for V0 keystore');
                }
                const passwordSeal = new passwordSeal_1.PasswordSeal(password, keystore.Salt, keystore.Nonce);
                const privateKeyBytes = await passwordSeal.unseal(keystore.CipheredData);
                const privateKey = basicElements_1.PrivateKey.fromBytes(privateKeyBytes);
                const publicKey = basicElements_1.PublicKey.fromBytes(Uint8Array.from(keystore.PublicKey));
                const address = publicKey.getAddress();
                // TODO: add a consistency check with the address in the keystore
                return new Account(privateKey, publicKey, address, keystore.Version);
            }
            case versioner_1.Version.V1: {
                if (!password) {
                    throw new Error('Password is required for V1 keystore');
                }
                const passwordSeal = new passwordSeal_1.PasswordSeal(password, keystore.Salt, keystore.Nonce);
                const privateKeyBytes = await passwordSeal.unseal(keystore.CipheredData);
                const privateKey = basicElements_1.PrivateKey.fromBytes(privateKeyBytes);
                const publicKey = basicElements_1.PublicKey.fromBytes(Uint8Array.from(keystore.PublicKey));
                const address = publicKey.getAddress();
                // TODO: add a consistency check with the address in the keystore
                return new Account(privateKey, publicKey, address, keystore.Version);
            }
            default:
                throw new Error(`unsupported version`);
        }
    }
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
    static async fromEnv(key) {
        return Account.fromPrivateKey(basicElements_1.PrivateKey.fromEnv(key));
    }
}
exports.Account = Account;
//# sourceMappingURL=account.js.map