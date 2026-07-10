"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityName = void 0;
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
class EntityName extends ValueObject_1.ValueObject {
    constructor(props) {
        super(props);
    }
    static create(name) {
        if (!name || name.length < 1) {
            throw new Error('Entity name cannot be empty');
        }
        return new EntityName({ value: name });
    }
    get value() {
        return this.props.value;
    }
}
exports.EntityName = EntityName;
//# sourceMappingURL=EntityName.js.map