"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadMediaHandler = void 0;
const Media_1 = require("../../domain/models/Media");
const FileName_1 = require("../../domain/value-objects/FileName");
const MimeType_1 = require("../../domain/value-objects/MimeType");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
const AuditLogger_1 = require("../../../../shared/infrastructure/logging/AuditLogger");
const MediaStatus_1 = require("../../domain/value-objects/MediaStatus");
class UploadMediaHandler {
    mediaRepository;
    storageProvider;
    constructor(mediaRepository, storageProvider) {
        this.mediaRepository = mediaRepository;
        this.storageProvider = storageProvider;
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
                ownerId: new UniqueEntityId_1.UniqueEntityId(),
            });
            await this.mediaRepository.save(media);
            AuditLogger_1.AuditLogger.log({
                user: 'system',
                action: 'UPLOAD_MEDIA',
                resource: media.id.toString(),
                status: 'SUCCESS',
            });
            return {
                id: media.id.toString(),
                fileName: media.fileName.value,
                mimeType: media.mimeType.value,
                uploadedAt: media.uploadedAt.toISOString(),
            };
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: 'system',
                action: 'UPLOAD_MEDIA',
                resource: 'unknown',
                status: 'FAILURE',
            });
            throw error;
        }
    }
}
exports.UploadMediaHandler = UploadMediaHandler;
//# sourceMappingURL=UploadMediaHandler.js.map