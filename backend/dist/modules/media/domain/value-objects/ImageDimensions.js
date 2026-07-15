"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageDimensions = void 0;
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
class ImageDimensions extends ValueObject_1.ValueObject {
    constructor(props) {
        super(props);
    }
    static create(width, height) {
        if (width <= 0 || height <= 0) {
            throw new Error('Image dimensions must be positive');
        }
        return new ImageDimensions({ width, height });
    }
    get width() {
        return this.props.width;
    }
    get height() {
        return this.props.height;
    }
}
exports.ImageDimensions = ImageDimensions;
//# sourceMappingURL=ImageDimensions.js.map