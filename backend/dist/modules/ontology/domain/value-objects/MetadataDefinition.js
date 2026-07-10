"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataDefinition = void 0;
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
class MetadataDefinition extends ValueObject_1.ValueObject {
    constructor(props) {
        super(props);
    }
    static create(props) {
        if (!props.name || props.name.trim().length === 0) {
            throw new Error('Metadata name is required');
        }
        return new MetadataDefinition(props);
    }
    get name() {
        return this.props.name;
    }
    get type() {
        return this.props.type;
    }
    get required() {
        return this.props.required;
    }
}
exports.MetadataDefinition = MetadataDefinition;
//# sourceMappingURL=MetadataDefinition.js.map