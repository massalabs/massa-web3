import crypto from 'crypto';
import bs58 from 'bs58';
import { Buffer } from 'buffer';

export const bs58EncodeCheck = (data: Buffer, prefix = '00', encoding = 'hex'): string => {
  if (typeof data === 'string') {
    data = Buffer.from(data, encoding as BufferEncoding);
  }
  if (!Buffer.isBuffer(data)) {
    throw new TypeError('"data" argument must be a Buffer');
  }
  let _prefix: Buffer = null;
  if (!Buffer.isBuffer(prefix)) {
    _prefix = Buffer.from(prefix, encoding as BufferEncoding);
  }
  const hash = crypto.createHash('sha256').update(Buffer.concat([_prefix, data])).digest();
  const checksum = crypto.createHash('sha256').update(hash).digest().slice(0, 4);
  const hashWithChecksum = Buffer.concat([_prefix, data, checksum]);
  return bs58.encode(hashWithChecksum);
};

export const bs58DecodeCheck = (string: string, encoding?: string): {prefix: Buffer, data: Buffer} => {
  const buffer = Buffer.from(bs58.decode(string));
  let prefix = buffer.slice(0, 1);
  let data = buffer.slice(1, -4);
  const checksum = buffer.slice(-4);
  const hash = crypto.createHash('sha256').update(Buffer.concat([prefix, data])).digest();
  const calculatedChecksum = crypto.createHash('sha256').update(hash).digest().slice(0, 4);
  if (!checksum.equals(calculatedChecksum)) {
    throw new Error('Invalid checksum');
  }
  return {
    prefix,
    data
  };
};