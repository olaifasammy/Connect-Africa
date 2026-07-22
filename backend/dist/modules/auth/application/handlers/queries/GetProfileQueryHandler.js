"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProfileQueryHandler = void 0;
const public_1 = require("../../../../audit/public");
const AuthErrors_1 = require("../../../../auth/domain/errors/AuthErrors");
const UserProfileId_1 = require("../../../../auth/domain/value-objects/UserProfileId");
class GetProfileQueryHandler {
    profileRepository;
    eventBus;
    constructor(profileRepository, eventBus) {
        this.profileRepository = profileRepository;
        this.eventBus = eventBus;
    }
    async handle(query) {
        try {
            const profile = await this.profileRepository.findById(UserProfileId_1.UserProfileId.create(query.userId));
            if (!profile) {
                throw new AuthErrors_1.AuthenticationError('Profile not found');
            }
            await this.eventBus.publish(new public_1.AuditLogRequestedEvent({
                action: 'GET_PROFILE',
                actorId: query.adminUserId || query.userId,
                actorType: 'USER',
                resourceId: query.userId,
                resourceType: 'USER_PROFILE',
                ipAddress: query.ipAddress || '127.0.0.1',
                userAgent: 'unknown',
                metadata: [{ key: 'status', value: 'SUCCESS' }]
            }));
            return profile;
        }
        catch (error) {
            await this.eventBus.publish(new public_1.AuditLogRequestedEvent({
                action: 'GET_PROFILE',
                actorId: query.adminUserId || query.userId,
                actorType: 'USER',
                resourceId: query.userId,
                resourceType: 'USER_PROFILE',
                ipAddress: query.ipAddress || '127.0.0.1',
                userAgent: 'unknown',
                metadata: [{ key: 'status', value: 'FAILURE' }]
            }));
            throw error instanceof AuthErrors_1.AuthenticationError ? error : new AuthErrors_1.AuthenticationError('Failed to get profile');
        }
    }
}
exports.GetProfileQueryHandler = GetProfileQueryHandler;
//# sourceMappingURL=GetProfileQueryHandler.js.map