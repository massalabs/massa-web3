// gRPC entry point: `@massalabs/massa-web3/grpc`.
// Kept out of the root entry point so that apps that don't use gRPC don't load
// (or bundle) the generated protobuf code, grpc-web and google-protobuf.
export * from './provider/grpcProvider'
export * from './generated/grpc/PublicServiceClientPb'
