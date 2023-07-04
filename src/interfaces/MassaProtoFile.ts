/**
 * This interface is used to represent proto files retrieved from smart contracts.
 *
 * @see data - The proto file data.
 * @see filePath - The file path of the proto file.
 * @see protoFuncName - The name of the proto function.
 */
export interface MassaProtoFile {
  data: string;
  filePath: string;
  protoFuncName: string;
}
