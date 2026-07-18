"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SettingsValueObjects_1 = require("../../../../../settings/domain/value-objects/SettingsValueObjects");
describe('Theme ValueObject', () => {
    it('should create valid theme', () => {
        const theme = new SettingsValueObjects_1.Theme('light');
        expect(theme.toString()).toBe('light');
    });
    it('should throw error for invalid theme', () => {
        expect(() => new SettingsValueObjects_1.Theme('invalid')).toThrow('Invalid theme: invalid');
    });
});
//# sourceMappingURL=Theme.spec.js.map