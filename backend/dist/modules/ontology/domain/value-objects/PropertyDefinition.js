"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyDefinition = void 0;
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
class PropertyDefinition extends ValueObject_1.ValueObject {
    constructor(props) {
        super(props);
    }
    get dataType() {
        return this.props.dataType;
    }
}
exports.PropertyDefinition = PropertyDefinition;
//# sourceMappingURL=PropertyDefinition.js.map