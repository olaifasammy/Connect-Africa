"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatasetValidator = void 0;
class DatasetValidator {
    static isValid(mimeType) {
        const validDatasetTypes = ['application/json', 'text/csv', 'application/xml'];
        return validDatasetTypes.includes(mimeType.value);
    }
}
exports.DatasetValidator = DatasetValidator;
//# sourceMappingURL=DatasetValidator.js.map