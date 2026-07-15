"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageProvider = exports.StorageProviderType = void 0;
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
var StorageProviderType;
(function (StorageProviderType) {
    StorageProviderType["LOCAL"] = "local";
    StorageProviderType["S3"] = "s3";
    StorageProviderType["GCS"] = "gcs";
})(StorageProviderType || (exports.StorageProviderType = StorageProviderType = {}));
class StorageProvider extends ValueObject_1.ValueObject {
    constructor(props) {
        super(props);
    }
    static create(type) {
        return new StorageProvider({ type });
    }
    get type() {
        return this.props.type;
    }
}
exports.StorageProvider = StorageProvider;
//# sourceMappingURL=StorageProvider.js.map