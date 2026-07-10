"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OntologyId = void 0;
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class OntologyId extends UniqueEntityId_1.UniqueEntityId {
    constructor(value) {
        super(value);
    }
    static create(value) {
        return new OntologyId(value);
    }
}
exports.OntologyId = OntologyId;
//# sourceMappingURL=OntologyId.js.map