"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BcryptPasswordHasher_1 = require("@shared/infrastructure/security/BcryptPasswordHasher");
describe('BcryptPasswordHasher', () => {
    it('should hash and compare correctly', async () => {
        const hasher = new BcryptPasswordHasher_1.BcryptPasswordHasher();
        const password = 'mySecretPassword123!';
        const hash = await hasher.hash(password);
        expect(hash).not.toBe(password);
        expect(await hasher.compare(password, hash)).toBe(true);
        expect(await hasher.compare('wrong', hash)).toBe(false);
    });
});
//# sourceMappingURL=BcryptPasswordHasher.test.js.map