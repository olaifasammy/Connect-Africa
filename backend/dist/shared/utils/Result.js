"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Failure = exports.Success = void 0;
class Success {
    value;
    isSuccess = true;
    isFailure = false;
    constructor(value) {
        this.value = value;
    }
}
exports.Success = Success;
class Failure {
    error;
    isSuccess = false;
    isFailure = true;
    constructor(error) {
        this.error = error;
    }
}
exports.Failure = Failure;
//# sourceMappingURL=Result.js.map