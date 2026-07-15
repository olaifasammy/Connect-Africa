"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Media_1 = require("../domain/models/Media");
const FileName_1 = require("../domain/value-objects/FileName");
const MimeType_1 = require("../domain/value-objects/MimeType");
const MediaStatus_1 = require("../domain/value-objects/MediaStatus");
const UniqueEntityId_1 = require("../../../shared/domain/UniqueEntityId");
describe('Media Aggregate', () => {
    it('should create media with valid props', () => {
        const media = Media_1.Media.create({
            fileName: new FileName_1.FileName('test.jpg'),
            mimeType: new MimeType_1.MimeType('image/jpeg'),
            uploadedAt: new Date(),
            filePath: '/path/to/file',
            fileSize: 1024,
            status: MediaStatus_1.MediaStatus.create(MediaStatus_1.MediaStatusType.READY),
            title: 'Test Media',
            ownerId: new UniqueEntityId_1.UniqueEntityId(),
        });
        expect(media.fileName.value).toBe('test.jpg');
        expect(media.mimeType.value).toBe('image/jpeg');
        expect(media.title).toBe('Test Media');
    });
});
//# sourceMappingURL=Media.spec.js.map