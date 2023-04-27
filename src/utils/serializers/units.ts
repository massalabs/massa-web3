/**
 * Typed Arguments facilitating the differentiation
 * between different argument types due to Javascript's
 * single number type.
 *
 * @remark In Assemblyscript the latter are all native types
 */
export enum TypedArrayUnit {
  STRING,
  BOOL,
  U8,
  U32,
  U64,
  I32,
  I64,
  F32,
  F64,
}
