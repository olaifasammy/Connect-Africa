"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadAvatarCommandHandler = void 0;
const AuditLogger_1 = require("../../../auth/infrastructure/AuditLogger");
const AvatarUpdatedEvent_1 = require("../../../auth/domain/events/AvatarUpdatedEvent");
const AuthErrors_1 = require("../../../auth/domain/errors/AuthErrors");
const UserProfileId_1 = require("../../../auth/domain/value-objects/UserProfileId");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class UploadAvatarCommandHandler {
    profileRepository;
    eventBus;
    constructor(profileRepository, eventBus) {
        this.profileRepository = profileRepository;
        this.eventBus = eventBus;
    }
    async handle(command) {
        try {
            const profile = await this.profileRepository.findById(UserProfileId_1.UserProfileId.create(command.userId));
            if (!profile) {
                throw new AuthErrors_1.AuthenticationError('Profile not found');
            }
            await this.profileRepository.save(profile);
            AuditLogger_1.AuditLogger.log({
                user: command.userId,
                action: 'UPLOAD_AVATAR',
                resource: 'PROFILE',
                status: 'SUCCESS',
                ipAddress: command.ipAddress
            });
            await this.eventBus.publish(new AvatarUpdatedEvent_1.AvatarUpdatedEvent(new UniqueEntityId_1.UniqueEntityId(profile.userId.value), command.avatarUrl));
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: command.userId,
                action: 'UPLOAD_AVATAR',
                resource: 'PROFILE',
                status: 'FAILURE',
                ipAddress: command.ipAddress
            });
            throw error instanceof AuthErrors_1.AuthenticationError ? error : new AuthErrors_1.AuthenticationError('Failed to upload avatar');
        }
    }
}
exports.UploadAvatarCommandHandler = UploadAvatarCommandHandler;
//# sourceMappingURL=UploadAvatarCommandHandler.js.map