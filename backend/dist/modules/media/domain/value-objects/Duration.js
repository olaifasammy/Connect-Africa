"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Duration = void 0;
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
class Duration extends ValueObject_1.ValueObject {
    constructor(props) {
        super(props);
    }
    static create(seconds) {
        if (seconds < 0) {
            throw new Error('Duration cannot be negative');
        }
        return new Duration({ seconds });
    }
    get seconds() {
        return this.props.seconds;
    }
}
exports.Duration = Duration;
//# sourceMappingURL=Duration.js.map