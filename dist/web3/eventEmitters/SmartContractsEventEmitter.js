"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartContractsEventEmitter = void 0;
const events_1 = require("events");
const SmartContractEvents_1 = require("./SmartContractEvents");
class SmartContractsEventEmitter extends events_1.default {
    emitScDeploySign(payload) {
        this.emit(SmartContractEvents_1.SMART_CONTRACT_EVENTS.SC_DEPLOY_SIGN, payload);
    }
    emitScDeploySigned(payload) {
        this.emit(SmartContractEvents_1.SMART_CONTRACT_EVENTS.SC_DEPLOY_SIGNED, payload);
    }
    emitScDeploySubmitted(operationIds) {
        this.emit(SmartContractEvents_1.SMART_CONTRACT_EVENTS.SC_DEPLOY_SUBMITTED, operationIds);
    }
    emitScDeployFailed(reason, ex) {
        this.emit(SmartContractEvents_1.SMART_CONTRACT_EVENTS.SC_DEPLOY_FAILED, reason, ex);
    }
}
exports.SmartContractsEventEmitter = SmartContractsEventEmitter;
//# sourceMappingURL=SmartContractsEventEmitter.js.map