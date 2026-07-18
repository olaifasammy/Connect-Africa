"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSettingsDtoSchema = exports.ChangeThemeDtoSchema = void 0;
const zod_1 = require("zod");
exports.ChangeThemeDtoSchema = zod_1.z.object({
    theme: zod_1.z.enum(['light', 'dark']),
});
exports.UpdateSettingsDtoSchema = zod_1.z.object({
    theme: zod_1.z.enum(['light', 'dark']).optional(),
    timezone: zod_1.z.string().optional(),
    locale: zod_1.z.string().optional(),
});
//# sourceMappingURL=SettingsValidation.js.map