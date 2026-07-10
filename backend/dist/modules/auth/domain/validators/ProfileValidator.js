"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileValidator = void 0;
const Result_1 = require("../../../../shared/utils/Result");
class ProfileValidator {
    validate(bio) {
        if (bio.length <= 500) {
            return new Result_1.Success(undefined);
        }
        return new Result_1.Failure(new Error('Bio must be less than 500 characters'));
    }
}
exports.ProfileValidator = ProfileValidator;
//# sourceMappingURL=ProfileValidator.js.map