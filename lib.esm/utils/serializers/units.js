/**
 * Typed Arguments facilitating the differentiation
 * between different argument types due to Javascript's
 * single number type.
 *
 * @remark In Assemblyscript the latter are all native types
 */
export var TypedArrayUnit;
(function (TypedArrayUnit) {
    TypedArrayUnit[TypedArrayUnit["STRING"] = 0] = "STRING";
    TypedArrayUnit[TypedArrayUnit["BOOL"] = 1] = "BOOL";
    TypedArrayUnit[TypedArrayUnit["U8"] = 2] = "U8";
    TypedArrayUnit[TypedArrayUnit["U32"] = 3] = "U32";
    TypedArrayUnit[TypedArrayUnit["U64"] = 4] = "U64";
    TypedArrayUnit[TypedArrayUnit["I32"] = 5] = "I32";
    TypedArrayUnit[TypedArrayUnit["I64"] = 6] = "I64";
    TypedArrayUnit[TypedArrayUnit["F32"] = 7] = "F32";
    TypedArrayUnit[TypedArrayUnit["F64"] = 8] = "F64";
})(TypedArrayUnit || (TypedArrayUnit = {}));
//# sourceMappingURL=units.js.map