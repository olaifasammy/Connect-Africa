"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserProfile_1 = require("../../../../../auth/domain/entities/UserProfile");
const UserId_1 = require("../../../../../auth/domain/value-objects/UserId");
const UniqueEntityId_1 = require("../../../../../../shared/domain/UniqueEntityId");
describe('UserProfile', () => {
    it('should create a new user profile', () => {
        const userId = UserId_1.UserId.create(new UniqueEntityId_1.UniqueEntityId().toString());
        const props = {
            userId,
            displayName: 'Test User',
            bio: 'Hello world',
        };
        const profile = UserProfile_1.UserProfile.create(props);
        expect(profile.displayName).toBe('Test User');
        expect(profile.userId.value).toBe(userId.value);
        expect(profile.bio).toBe('Hello world');
    });
    it('should update display name', () => {
        const userId = UserId_1.UserId.create(new UniqueEntityId_1.UniqueEntityId().toString());
        const profile = UserProfile_1.UserProfile.create({
            userId,
            displayName: 'Old Name',
        });
        profile.updateProfile({ displayName: 'New Name' });
        expect(profile.displayName).toBe('New Name');
    });
});
//# sourceMappingURL=UserProfile.test.js.map