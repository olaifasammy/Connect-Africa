"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadMediaHandler = void 0;
const Media_1 = require("../../domain/models/Media");
const FileName_1 = require("../../domain/value-objects/FileName");
const MimeType_1 = require("../../domain/value-objects/MimeType");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
const MediaStatus_1 = require("../../domain/value-objects/MediaStatus");
const public_1 = require("../../../audit/public");
class UploadMediaHandler {
    mediaRepository;
    storageProvider;
    auditRepository;
    constructor(mediaRepository, storageProvider, auditRepository) {
        this.mediaRepository = mediaRepository;
        this.storageProvider = storageProvider;
        this.auditRepository = auditRepository;
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
            const auditEntry = public_1.AuditEntry.create({
                action: 'UPLOAD_MEDIA',
                actor: public_1.AuditActor.create({
                    userId: new public_1.UserId(command.userId),
                    actorType: 'USER',
                    ipAddress: new public_1.IPAddress('127.0.0.1'),
                    userAgent: new public_1.UserAgent('unknown')
                }),
                resource: public_1.AuditResource.create({
                    id: new public_1.ResourceId(media.id.toString()),
                    type: 'MEDIA'
                }),
                metadata: [public_1.AuditMetadata.create({ key: 'status', value: 'SUCCESS' })],
                correlationId: new public_1.CorrelationId(new UniqueEntityId_1.UniqueEntityId().toString()),
                timestamp: new public_1.Timestamp(new Date())
            });
            await this.auditRepository.log(auditEntry);
            return {
                id: media.id.toString(),
                fileName: media.fileName.value,
                mimeType: media.mimeType.value,
                uploadedAt: media.uploadedAt.toISOString(),
            };
        }
        catch (error) {
            // Log failure with audit repository as well
            throw error;
        }
    }
}
exports.UploadMediaHandler = UploadMediaHandler;
//# sourceMappingURL=UploadMediaHandler.js.map