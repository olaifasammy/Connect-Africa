"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidEntityError = exports.GraphValidationError = void 0;
const BaseError_1 = require("../../../../shared/errors/BaseError");
class GraphValidationError extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 'GRAPH_VALIDATION_ERROR');
    }
}
exports.GraphValidationError = GraphValidationError;
class InvalidEntityError extends GraphValidationError {
    constructor(entityId) {
        super(`Invalid entity: ${entityId}`);
    }
}
exports.InvalidEntityError = InvalidEntityError;
//# sourceMappingURL=GraphErrors.js.map