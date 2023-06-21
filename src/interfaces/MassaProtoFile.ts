/**
 * This interface is used to represent proto files retrieved from smart contracts.
 *
 * @see final_value - The current version of the proto file as a byte array
 * @see candidate_value - If it is different from the final_value, it represents the
 * candidate file (as a byte array) to replace the current proto file.
 */
export interface MassaProtoFile {
  data: string;
  filePath: string;
  protoFuncName: string;
}
