"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const subtle = require("crypto").webcrypto.subtle;
const defaultOptions = {
    iv: new Uint8Array([
        60, 114, 145, 14, 139, 254, 202, 21, 208, 198, 204, 142, 15, 200, 50, 6,
    ]),
    salt: "salt",
};
Object.freeze(defaultOptions);
const Aes = {
    /**
     * Encryption Funtion
     * @param {string} message - A message that you want to be encrypted.
     * @param {string} password - Password for using both encryption and decryption.
     * @param {AesOptionsType} options - An optional settings.
     * @return {string} Returns an encrypted text.
     */
    encrypt: (message, password, { options: overrideOptions } = { options: {} }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            const encoder = new TextEncoder();
            const options = Object.assign({}, defaultOptions, overrideOptions);
            const key = yield passwordToCryptoKey(password, options.salt);
            const cipherArray = yield subtle.encrypt({
                name: "AES-CBC",
                iv: options.iv,
            }, key, encoder.encode(message));
            const buffer = new Uint8Array(cipherArray);
            const cipherText = buffer.join("e");
            //console.log("Encrypt output: ", cipherText);
            return cipherText;
        }
        catch (error) {
            console.log("Encryption Error ", error);
        }
    }),
    /**
     * Decryption Funtion
     * @param {string}  ciphertext - An encrypted message that you want to be decrypted.
     * @param {string} password - Password for using both encryption and decryption.
     * @param {AesOptionsType} options - An optional settings.
     * @return {string} Returns the message you have encrypted.
     */
    decrypt: (ciphertext, password, { options: overrideOptions } = { options: {} }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            const options = Object.assign({}, defaultOptions, overrideOptions);
            const decoder = new TextDecoder();
            const key = yield passwordToCryptoKey(password, options.salt);
            const chars = ciphertext.split("e");
            const charsStringToInt = chars.map((char) => parseInt(char));
            const charsToCipherArray = new Uint8Array(charsStringToInt);
            let decrypted = yield subtle.decrypt({
                name: "AES-CBC",
                iv: options.iv,
            }, key, charsToCipherArray);
            return decoder.decode(decrypted);
        }
        catch (error) {
            console.log("Decryption Error ", error);
        }
    }),
};
exports.default = Aes;
/**
 * Helper function that turns password string to CryptoKey.
 * @param {string}  password - Password for using both encryption and decryption.
 * @param {string}  salt - Like another password.
 * @return {string} Returns a CryptoKey.
 */
function passwordToCryptoKey(password, salt) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const enc = new TextEncoder();
            const keyMaterial = yield subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits", "deriveKey"]);
            const key = yield subtle.deriveKey({
                name: "PBKDF2",
                salt: enc.encode(salt),
                iterations: 4000,
                hash: "SHA-256",
            }, keyMaterial, { name: "AES-CBC", length: 256 }, true, ["encrypt", "decrypt"]);
            return key;
        }
        catch (error) {
            console.log(error);
        }
    });
}
//# sourceMappingURL=aes.js.map