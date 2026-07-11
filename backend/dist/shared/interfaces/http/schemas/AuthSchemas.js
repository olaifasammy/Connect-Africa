"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProfileSchema = exports.VerifyEmailSchema = exports.ResetPasswordSchema = exports.RefreshSchema = exports.LoginSchema = exports.RegisterSchema = void 0;
const zod_1 = require("zod");
exports.RegisterSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
exports.RefreshSchema = zod_1.z.object({
    refreshToken: zod_1.z.string(),
});
exports.ResetPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    newPassword: zod_1.z.string().min(8),
});
exports.VerifyEmailSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid(),
});
exports.UpdateProfileSchema = zod_1.z.object({
    displayName: zod_1.z.string().min(2),
});
//# sourceMappingURL=AuthSchemas.js.map