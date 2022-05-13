interface AesOptionsType {
    options: {
        iv?: Uint8Array;
        salt?: string;
    };
}
declare const Aes: {
    /**
     * Encryption Funtion
     * @param {string} message - A message that you want to be encrypted.
     * @param {string} password - Password for using both encryption and decryption.
     * @param {AesOptionsType} options - An optional settings.
     * @return {string} Returns an encrypted text.
     */
    encrypt: (message: string, password: string, { options: overrideOptions }?: AesOptionsType) => Promise<any>;
    /**
     * Decryption Funtion
     * @param {string}  ciphertext - An encrypted message that you want to be decrypted.
     * @param {string} password - Password for using both encryption and decryption.
     * @param {AesOptionsType} options - An optional settings.
     * @return {string} Returns the message you have encrypted.
     */
    decrypt: (ciphertext: string, password: string, { options: overrideOptions }?: AesOptionsType) => Promise<any>;
};
export default Aes;
