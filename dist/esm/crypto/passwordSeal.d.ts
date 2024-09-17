import Sealer from './interfaces/sealer';
/**
 * Password-based implementation of the Sealer interface.
 */
export declare class PasswordSeal implements Sealer {
    private password;
    salt: Uint8Array;
    nonce: Uint8Array;
    constructor(password: string, salt?: Uint8Array, nonce?: Uint8Array);
    private validate;
    /**
     * Seals data using password-based PKDF2 AES-256-GCM encryption.
     *
     * @param data - The data to encrypt.
     *
     * @returns Protected data.
     */
    seal(data: Uint8Array): Promise<Uint8Array>;
    /**
     * Unseals data using password-based PKDF2 AES-256-GCM decryption.
     *
     * @param data - The encrypted data.
     *
     * @returns Clear data.
     */
    unseal(data: Uint8Array): Promise<Uint8Array>;
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
    static fromEnv(): Sealer;
}
