import { PublicApiUrl } from '..'
import { PublicAPI } from './publicAPI'

export class JsonRPCClient extends PublicAPI {
  static buildnet(): JsonRPCClient {
    return new JsonRPCClient(PublicApiUrl.Buildnet)
  }

  static testnet(): JsonRPCClient {
    return new JsonRPCClient(PublicApiUrl.Testnet)
  }

  static mainnet(): JsonRPCClient {
    return new JsonRPCClient(PublicApiUrl.Mainnet)
  }
}
