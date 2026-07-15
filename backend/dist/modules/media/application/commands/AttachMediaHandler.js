"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachMediaHandler = void 0;
const MediaId_1 = require("../../domain/value-objects/MediaId");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
const AuditLogger_1 = require("../../../../shared/infrastructure/logging/AuditLogger");
class AttachMediaHandler {
    mediaRepository;
    permissionService;
    constructor(mediaRepository, permissionService) {
        this.mediaRepository = mediaRepository;
        this.permissionService = permissionService;
    }
    async handle(command) {
        const { mediaId, resourceType, resourceId } = command.data;
        const mediaEntityId = new UniqueEntityId_1.UniqueEntityId(mediaId);
        // 1. Validate Permission
        const hasPermission = await this.permissionService.canAccess(new UniqueEntityId_1.UniqueEntityId('system'), mediaEntityId);
        if (!hasPermission) {
            throw new Error('Unauthorized');
        }
        // 2. Attach
        await this.mediaRepository.attach(new MediaId_1.MediaId(mediaId), resourceType, new UniqueEntityId_1.UniqueEntityId(resourceId));
        // 3. Audit
        AuditLogger_1.AuditLogger.log({
            user: 'system',
            action: 'ATTACH_MEDIA',
            resource: mediaId,
            status: 'SUCCESS',
        });
    }
}
exports.AttachMediaHandler = AttachMediaHandler;
//# sourceMappingURL=AttachMediaHandler.js.map