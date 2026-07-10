"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardinalityRule = void 0;
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
class CardinalityRule extends ValueObject_1.ValueObject {
    constructor(props) {
        super(props);
    }
    static create(props) {
        if (props.min < 0) {
            throw new Error('Min cardinality cannot be negative');
        }
        if (props.max !== null && props.max < props.min) {
            throw new Error('Max cardinality cannot be less than min');
        }
        return new CardinalityRule(props);
    }
    get min() {
        return this.props.min;
    }
    get max() {
        return this.props.max;
    }
}
exports.CardinalityRule = CardinalityRule;
//# sourceMappingURL=CardinalityRule.js.map