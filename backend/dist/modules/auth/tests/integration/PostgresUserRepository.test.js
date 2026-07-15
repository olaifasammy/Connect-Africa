"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PostgresUserRepository_1 = require("../../../auth/infrastructure/PostgresUserRepository");
const User_1 = require("../../../auth/domain/entities/User");
const Email_1 = require("../../../auth/domain/value-objects/Email");
const PasswordHash_1 = require("../../../auth/domain/value-objects/PasswordHash");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
const PostgresProvider_1 = require("../../../../shared/infrastructure/database/PostgresProvider");
describe('PostgresUserRepository Integration', () => {
    let pool;
    let userRepository;
    beforeAll(async () => {
        pool = PostgresProvider_1.PostgresProvider.getPool();
        userRepository = new PostgresUserRepository_1.PostgresUserRepository(pool);
    });
    afterAll(async () => {
        await pool.end();
    });
    it('should save and find a user', async () => {
        const user = new User_1.User({
            email: new Email_1.Email('integration@test.com'),
            passwordHash: new PasswordHash_1.PasswordHash('hashed_password'),
            isActive: true,
        }, new UniqueEntityId_1.UniqueEntityId());
        await userRepository.save(user);
        const foundUser = await userRepository.findByEmail('integration@test.com');
        expect(foundUser).not.toBeNull();
        expect(foundUser?.email.value).toBe('integration@test.com');
    });
});
//# sourceMappingURL=PostgresUserRepository.test.js.map