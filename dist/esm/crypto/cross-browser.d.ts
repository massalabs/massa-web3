/// <reference types="node" />
export type PBKDF2Options = {
    iterations: number;
    keyLength: number;
    hash: string;
};
/**
 * Derives a cryptographic key using PBKDF2.
 *
 * @param password - The password from which to derive the key.
 * @param salt - The cryptographic salt.
 * @param opts - Options for the derivation.
 *
 * @returns  The derived key.
 */
export declare function pbkdf2(password: string, salt: Buffer, opts: PBKDF2Options): Promise<Uint8Array>;
/**
 * Seals data using AES-256-GCM encryption.
 *
 * @param data - The data to encrypt.
 * @param key - The 32-byte secret key.
 * @param iv - The 12-byte initialization vector.
 *
 * @throws If the key is not 32 bytes.
 * @throws If the iv is not 12 bytes.
 *
 * @returns The encrypted data.
 */
export declare function aesGCMEncrypt(data: Uint8Array, key: Uint8Array, iv: Uint8Array): Promise<Uint8Array>;
/**
 * Unseals data using AES-256-GCM decryption.
 *
 * @remarks
 * The authentication tag shall be appended to the encryptedData.
 *
 * @param encryptedData - The data to decrypt.
 * @param key - The 32-byte secret key.
 * @param iv - The 12-byte initialization vector.
 *
 * @throws If the key is not 32 bytes.
 * @throws If the iv is not 12 bytes.
 *
 * @returns The decrypted data.
 */
export declare function aesGCMDecrypt(encryptedData: Uint8Array, key: Uint8Array, iv: Uint8Array): Promise<Uint8Array>;
