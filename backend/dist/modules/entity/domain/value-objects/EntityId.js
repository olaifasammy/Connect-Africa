"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityId = void 0;
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
class EntityId extends ValueObject_1.ValueObject {
    constructor(props) {
        super(props);
    }
    static create(id) {
        return new EntityId({ value: id });
    }
    get value() {
        return this.props.value;
    }
}
exports.EntityId = EntityId;
//# sourceMappingURL=EntityId.js.map