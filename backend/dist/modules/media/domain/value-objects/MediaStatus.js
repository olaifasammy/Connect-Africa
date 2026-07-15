"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaStatus = exports.MediaStatusType = void 0;
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
var MediaStatusType;
(function (MediaStatusType) {
    MediaStatusType["PENDING"] = "pending";
    MediaStatusType["PROCESSING"] = "processing";
    MediaStatusType["READY"] = "ready";
    MediaStatusType["FAILED"] = "failed";
    MediaStatusType["PUBLISHED"] = "published";
    MediaStatusType["ARCHIVED"] = "archived";
})(MediaStatusType || (exports.MediaStatusType = MediaStatusType = {}));
class MediaStatus extends ValueObject_1.ValueObject {
    constructor(props) {
        super(props);
    }
    static create(value) {
        return new MediaStatus({ value });
    }
    static fromString(value) {
        return new MediaStatus({ value: value });
    }
    get value() {
        return this.props.value;
    }
}
exports.MediaStatus = MediaStatus;
//# sourceMappingURL=MediaStatus.js.map