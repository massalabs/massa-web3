"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUUID = void 0;
const uuidv4_1 = require("uuidv4");
require("./string_proto");
const generateUUID = () => {
    const guid = (0, uuidv4_1.uuid)();
    return guid.replaceAll("-", "");
};
exports.generateUUID = generateUUID;
//# sourceMappingURL=UUID.js.map