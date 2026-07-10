"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDtoSchema = void 0;
const zod_1 = require("zod");
/**
 * Zod schema for CreateUserDto validation.
 */
exports.CreateUserDtoSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
});
//# sourceMappingURL=CreateUserDto.js.map