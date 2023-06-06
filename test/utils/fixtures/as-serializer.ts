/* This file contains a set of value of different types serialized using the AS serializer of @massalabs/as-types
 The goal is to ensure the TS serializer/deserializer does the exact same thing as the AS one
*/

export const asTests = [
  {
    name: 'ser/deser with emojis',
    ser: 'strToBytes',
    deser: 'bytesToStr',
    val: 'Hello world 🙂',
    serialized: [
      72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 32, 240, 159, 153,
      130,
    ],
  },
  {
    name: 'ser/deser Ascii',
    ser: 'strToBytes',
    deser: 'bytesToStr',
    val: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    serialized: [
      65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82,
      83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105,
      106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120,
      121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
    ],
  },
  {
    name: 'ser/deser u32',
    ser: 'u32ToBytes',
    deser: 'bytesToU32',
    val: 666,
    serialized: [154, 2, 0, 0],
  },
  {
    name: 'ser/deser i32',
    ser: 'i32ToBytes',
    deser: 'bytesToI32',
    val: -666,
    serialized: [102, 253, 255, 255],
  },
  {
    name: 'ser/deser u64',
    ser: 'u64ToBytes',
    deser: 'bytesToU64',
    val: BigInt(666),
    serialized: [154, 2, 0, 0, 0, 0, 0, 0],
  },
  {
    name: 'ser/deser i64',
    ser: 'i64ToBytes',
    deser: 'bytesToI64',
    val: BigInt(-666),
    serialized: [102, 253, 255, 255, 255, 255, 255, 255],
  },
  {
    name: 'ser/deser f32',
    ser: 'f32ToBytes',
    deser: 'bytesToF32',
    val: -666.666,
    serialized: [160, 170, 38, 196],
  },
  {
    name: 'ser/deser f64',
    ser: 'f64ToBytes',
    deser: 'bytesToF64',
    val: -666.666,
    serialized: [23, 217, 206, 247, 83, 213, 132, 192],
  },
];
