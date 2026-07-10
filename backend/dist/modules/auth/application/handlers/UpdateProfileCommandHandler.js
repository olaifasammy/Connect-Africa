"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProfileCommandHandler = void 0;
const AuditLogger_1 = require("../../../auth/infrastructure/AuditLogger");
const UserUpdatedEvent_1 = require("../../../auth/domain/events/UserUpdatedEvent");
const AuthErrors_1 = require("../../../auth/domain/errors/AuthErrors");
const UserProfileId_1 = require("../../../auth/domain/value-objects/UserProfileId");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class UpdateProfileCommandHandler {
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
            if (command.displayName)
                profile.updateProfile({ displayName: command.displayName });
            await this.profileRepository.save(profile);
            AuditLogger_1.AuditLogger.log({
                user: command.userId,
                action: 'UPDATE_PROFILE',
                resource: 'PROFILE',
                status: 'SUCCESS',
                ipAddress: command.ipAddress
            });
            await this.eventBus.publish(new UserUpdatedEvent_1.UserUpdatedEvent(new UniqueEntityId_1.UniqueEntityId(profile.userId.value)));
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: command.userId,
                action: 'UPDATE_PROFILE',
                resource: 'PROFILE',
                status: 'FAILURE',
                ipAddress: command.ipAddress
            });
            throw error instanceof AuthErrors_1.AuthenticationError ? error : new AuthErrors_1.AuthenticationError('Failed to update profile');
        }
    }
}
exports.UpdateProfileCommandHandler = UpdateProfileCommandHandler;
//# sourceMappingURL=UpdateProfileCommandHandler.js.map