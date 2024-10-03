import randomUint8Array from 'secure-random';
import { aesGCMDecrypt, aesGCMEncrypt, pbkdf2, } from './cross-browser';
const KEY_SIZE_BYTES = 32;
const NONCE_SIZE_BYTES = 12;
const SALT_SIZE_BYTES = 16;
const OWASP_ITERATIONS = 600000;
function createKey(password, salt) {
    const opts = {
        iterations: OWASP_ITERATIONS,
        keyLength: KEY_SIZE_BYTES,
        hash: 'sha256',
    };
    return pbkdf2(password, salt, opts);
}
/**
 * Password-based implementation of the Sealer interface.
 */
export class PasswordSeal {
    password;
    salt;
    nonce;
    constructor(password, salt, nonce) {
        this.salt = salt ?? randomUint8Array(SALT_SIZE_BYTES);
        this.nonce = nonce ?? randomUint8Array(NONCE_SIZE_BYTES);
        this.validate();
        this.password = password;
    }
    validate() {
        if (!this.salt || this.salt.length !== SALT_SIZE_BYTES) {
            throw new Error(`Salt must be ${SALT_SIZE_BYTES} bytes`);
        }
        if (!this.nonce || this.nonce.length !== NONCE_SIZE_BYTES) {
            throw new Error(`Nonce must be ${NONCE_SIZE_BYTES} bytes`);
        }
    }
    /**
     * Seals data using password-based PKDF2 AES-256-GCM encryption.
     *
     * @param data - The data to encrypt.
     *
     * @returns Protected data.
     */
    async seal(data) {
        this.validate();
        const key = await createKey(this.password, Buffer.from(this.salt));
        return aesGCMEncrypt(data, key, Buffer.from(this.nonce));
    }
    /**
     * Unseals data using password-based PKDF2 AES-256-GCM decryption.
     *
     * @param data - The encrypted data.
     *
     * @returns Clear data.
     */
    async unseal(data) {
        this.validate();
        const key = await createKey(this.password, Buffer.from(this.salt));
        return aesGCMDecrypt(data, key, Buffer.from(this.nonce));
    }
    /**
     * Creates a Sealer from environment variables.
     *
     * @remarks
     * The expected environment variables are:
     * - PASSWORD,
     * - SALT - base64 encoded, and
     * - NONCE - base64 encoded.
     *
     * @returns A password-based sealer instance.
     */
    static fromEnv() {
        const pwd = process.env.PASSWORD;
        if (!pwd) {
            throw new Error('Missing PASSWORD environment variable');
        }
        const salt = process.env.SALT
            ? Uint8Array.from(Buffer.from(process.env.SALT, 'base64'))
            : undefined;
        if (!salt) {
            throw new Error('Missing base64 encoded SALT in .env file');
        }
        const nonce = process.env.NONCE
            ? Uint8Array.from(Buffer.from(process.env.NONCE, 'base64'))
            : undefined;
        if (!nonce) {
            throw new Error('Missing base64 encoded NONCE in .env file');
        }
        return new PasswordSeal(pwd, salt, nonce);
    }
}
//# sourceMappingURL=passwordSeal.js.map