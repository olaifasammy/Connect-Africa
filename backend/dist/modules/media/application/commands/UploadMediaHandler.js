"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadMediaHandler = void 0;
const Media_1 = require("../../domain/models/Media");
const FileName_1 = require("../../domain/value-objects/FileName");
const MimeType_1 = require("../../domain/value-objects/MimeType");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
const MediaStatus_1 = require("../../domain/value-objects/MediaStatus");
const AuditLogRequestedEvent_1 = require("../../../audit/domain/events/AuditLogRequestedEvent");
class UploadMediaHandler {
    mediaRepository;
    storageProvider;
    eventBus;
    constructor(mediaRepository, storageProvider, eventBus) {
        this.mediaRepository = mediaRepository;
        this.storageProvider = storageProvider;
        this.eventBus = eventBus;
    }
    async handle(command) {
        const filePath = `media/${new UniqueEntityId_1.UniqueEntityId().toString()}-${command.data.fileName}`;
        try {
            await this.storageProvider.upload(filePath, command.data.fileBuffer);
            const media = Media_1.Media.create({
                fileName: new FileName_1.FileName(command.data.fileName),
                mimeType: new MimeType_1.MimeType(command.data.mimeType),
                filePath,
                fileSize: command.data.fileBuffer.length,
                uploadedAt: new Date(),
                status: MediaStatus_1.MediaStatus.create(MediaStatus_1.MediaStatusType.PENDING),
                title: command.data.fileName,
                ownerId: new UniqueEntityId_1.UniqueEntityId(command.userId),
            });
            await this.mediaRepository.save(media);
            // Decoupled audit logging
            await this.eventBus.publish(new AuditLogRequestedEvent_1.AuditLogRequestedEvent({
                action: 'UPLOAD_MEDIA',
                actorId: command.userId,
                actorType: 'USER',
                ipAddress: '127.0.0.1',
                userAgent: 'unknown',
                resourceId: media.id.toString(),
                resourceType: 'MEDIA',
                metadata: [{ key: 'status', value: 'SUCCESS' }]
            }));
            return {
                id: media.id.toString(),
                fileName: media.fileName.value,
                mimeType: media.mimeType.value,
                uploadedAt: media.uploadedAt.toISOString(),
            };
        }
        catch (error) {
            await this.eventBus.publish(new AuditLogRequestedEvent_1.AuditLogRequestedEvent({
                action: 'UPLOAD_MEDIA',
                actorId: command.userId,
                actorType: 'USER',
                ipAddress: '127.0.0.1',
                userAgent: 'unknown',
                resourceId: 'MEDIA',
                resourceType: 'MEDIA',
                metadata: [{ key: 'status', value: 'FAILURE' }]
            }));
            throw error;
        }
    }
}
exports.UploadMediaHandler = UploadMediaHandler;
//# sourceMappingURL=UploadMediaHandler.js.map