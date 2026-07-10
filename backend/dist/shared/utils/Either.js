"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Right = exports.Left = void 0;
class Left {
    value;
    isLeft = true;
    isRight = false;
    constructor(value) {
        this.value = value;
    }
}
exports.Left = Left;
class Right {
    value;
    isLeft = false;
    isRight = true;
    constructor(value) {
        this.value = value;
    }
}
exports.Right = Right;
//# sourceMappingURL=Either.js.map