// ESM wrapper for protobuf classes
// Import the CommonJS module using a relative path that works in both environments
import * as commonjsModule from '/Users/peterjah/dev/massa/massa-web3/../../../../../../cmd/generated/grpc/massa/model/v1/staker_pb.js';

// Create a proto object that matches the expected structure
// The CommonJS module exports classes directly, so we need to access them properly
export const proto = {
  massa: {
    model: {
      v1: commonjsModule.default || commonjsModule
    }
  }
};
