import {Buffer} from "buffer";
import { base58checkDecode, base58checkEncode, hashSha256, typedArrayToBuffer, varintEncode } from "../../utils/Xbqcrypto";
import { BN }  from "bn.js";
import { ecdsaSign, ecdsaVerify } from "secp256k1";
import * as secp from "@noble/secp256k1";

const privateKey: string = "2SPTTLK6Vgk5zmZEkokqC3wgpKgKpyV5Pu3uncEGawoGyd4yzC";
const publicKey: string = "5Jwx18K2JXacFoZcPmTWKFgdG1mSdkpBAUnwiyEqsVP9LKyNxR";

(async () => {

    // bytes compaction
    const bytesCompact: Buffer = Buffer.from("somedata");
    console.log("bytesCompact", bytesCompact);

    // Hash byte compact
    const hashEncodedData: Buffer = hashSha256(bytesCompact);
    console.log("hashEncodedData", hashEncodedData);

    // Signing a digest
    const digest = new BN(hashEncodedData.valueOf());
    console.log("digest", hashEncodedData);
    const privateKeyBase58Decoded = base58checkDecode(privateKey);
    console.log("privateKeyBase58Decoded", privateKeyBase58Decoded);
    const publicKeyBase58Decoded = base58checkDecode(publicKey);
    console.log("publicKeyBase58Decoded", publicKeyBase58Decoded);
    const base58PrivateKey = new BN(privateKeyBase58Decoded, 16);
    console.log("base58PrivateKey", base58PrivateKey);
    const base58PublicKey = new BN(publicKeyBase58Decoded, 16);
    console.log("base58PublicKey", base58PublicKey);

    const sig = await secp.sign(digest.toBuffer(), base58PrivateKey.toBuffer(), {
        der: false
    });
    const sig2 = ecdsaSign(digest.toBuffer(), base58PrivateKey.toBuffer());
    console.log("sig", sig);
    console.log("sig2", sig2);
    console.log("sig hex", secp.utils.bytesToHex(sig));

    //const isValid: boolean = ecdsaVerify(sig.signature, digest.toBuffer(), base58PublicKey.toBuffer());
    //console.log("isValid", isValid);

    const isValid = secp.verify(sig, digest.toBuffer(), base58PublicKey.toBuffer());
    console.log("isSigOk", isValid);

    // concat
    const r: Uint8Array = sig2.signature.slice(0, 32);
    console.log("r", r);
    const s: Uint8Array = sig2.signature.slice(32, 64);
    console.log("s", s);

    const rr: Uint8Array = Buffer.from(typedArrayToBuffer(r).toString(), "hex").valueOf();
    console.log("rr", rr);
    const ss: Uint8Array = Buffer.from(typedArrayToBuffer(s).toString(), "hex").valueOf();
    console.log("ss", ss);

    console.log("concat buffer" , base58checkEncode(Buffer.concat([rr, ss])));

})();