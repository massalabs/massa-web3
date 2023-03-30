import * as grpc from '@grpc/grpc-js';
import * as fs from 'fs';

export default class GrpcSslFactory {
  static createServerSsl = (
    rootCert: string,
    certChain: string,
    certPrivKey: string,
  ): grpc.ServerCredentials => {
    return grpc.ServerCredentials.createSsl(
      fs.readFileSync(rootCert),
      [
        {
          // e.g. './certs/ca.crt'
          cert_chain: fs.readFileSync(certChain), // e.g. './certs/server.crt'
          private_key: fs.readFileSync(certPrivKey), // e.g. './certs/server.key'
        },
      ] as grpc.KeyCertPair[],
      false,
    );
  };

  static createClientSsl = (
    rootCert?: string,
    certChain?: string,
    certPrivKey?: string,
  ): grpc.ChannelCredentials => {
    return grpc.credentials.createSsl(
      rootCert ? fs.readFileSync(rootCert) : undefined, // e.g. './certs/ca.crt'
      certPrivKey ? fs.readFileSync(certPrivKey) : undefined, // e.g. './certs/client.key'
      certChain ? fs.readFileSync(certChain) : undefined, // e.g. './certs/client.crt'
    );
  };
}
