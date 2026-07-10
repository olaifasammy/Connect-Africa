"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProfileQueryHandler = void 0;
const AuditLogger_1 = require("../../../../auth/infrastructure/AuditLogger");
const AuthErrors_1 = require("../../../../auth/domain/errors/AuthErrors");
const UserProfileId_1 = require("../../../../auth/domain/value-objects/UserProfileId");
class GetProfileQueryHandler {
    profileRepository;
    constructor(profileRepository) {
        this.profileRepository = profileRepository;
    }
    async handle(query) {
        try {
            const profile = await this.profileRepository.findById(UserProfileId_1.UserProfileId.create(query.userId));
            if (!profile) {
                throw new AuthErrors_1.AuthenticationError('Profile not found');
            }
            AuditLogger_1.AuditLogger.log({
                user: query.adminUserId || query.userId,
                action: 'GET_PROFILE',
                resource: query.userId,
                status: 'SUCCESS',
                ipAddress: query.ipAddress
            });
            return profile;
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: query.adminUserId || query.userId,
                action: 'GET_PROFILE',
                resource: query.userId,
                status: 'FAILURE',
                ipAddress: query.ipAddress
            });
            throw error instanceof AuthErrors_1.AuthenticationError ? error : new AuthErrors_1.AuthenticationError('Failed to get profile');
        }
    }
}
exports.GetProfileQueryHandler = GetProfileQueryHandler;
//# sourceMappingURL=GetProfileQueryHandler.js.map