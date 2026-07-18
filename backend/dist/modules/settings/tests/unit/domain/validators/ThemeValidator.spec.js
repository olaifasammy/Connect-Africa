"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ThemeValidator_1 = require("../../../../../settings/domain/validators/ThemeValidator");
describe('ThemeValidator', () => {
    it('should not throw for valid theme', () => {
        expect(() => ThemeValidator_1.ThemeValidator.validate('light')).not.toThrow();
    });
    it('should throw for invalid theme', () => {
        expect(() => ThemeValidator_1.ThemeValidator.validate('invalid')).toThrow();
    });
});
//# sourceMappingURL=ThemeValidator.spec.js.map