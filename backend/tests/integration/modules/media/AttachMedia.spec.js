"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PostgresMediaRepository_1 = require("@modules/media/infrastructure/repositories/PostgresMediaRepository");
const PostgresProvider_1 = require("@shared/infrastructure/database/PostgresProvider");
const Media_1 = require("@modules/media/domain/models/Media");
const FileName_1 = require("@modules/media/domain/value-objects/FileName");
const MimeType_1 = require("@modules/media/domain/value-objects/MimeType");
const MediaStatus_1 = require("@modules/media/domain/value-objects/MediaStatus");
const UniqueEntityId_1 = require("@shared/domain/UniqueEntityId");
const MediaId_1 = require("@modules/media/domain/value-objects/MediaId");
describe('AttachMedia Integration', () => {
    let repository;
    let postgresProvider;
    let userId;
    beforeAll(async () => {
        postgresProvider = new PostgresProvider_1.PostgresProvider();
        await postgresProvider.connect();
        const email = `test-${Date.now()}@example.com`;
        const userResult = await postgresProvider.query('INSERT INTO users (id, email, password_hash) VALUES (gen_random_uuid(), $1, $2) RETURNING id', [email, 'hash']);
        userId = userResult.rows[0].id;
        repository = new PostgresMediaRepository_1.PostgresMediaRepository(postgresProvider);
    });
    afterAll(async () => {
        await postgresProvider.query('DELETE FROM media WHERE owner_id = $1', [userId]);
        await postgresProvider.query('DELETE FROM users WHERE id = $1', [userId]);
        await postgresProvider.disconnect();
    });
    it('should attach media to entity', async () => {
        const media = Media_1.Media.create({
            fileName: new FileName_1.FileName('test.jpg'),
            mimeType: new MimeType_1.MimeType('image/jpeg'),
            filePath: '/path/to/test.jpg',
            fileSize: 1024,
            uploadedAt: new Date(),
            status: MediaStatus_1.MediaStatus.create(MediaStatus_1.MediaStatusType.PENDING),
            title: 'Test Media',
            ownerId: new UniqueEntityId_1.UniqueEntityId(userId),
        });
        await repository.save(media);
        const entityId = new UniqueEntityId_1.UniqueEntityId();
        await repository.attach(new MediaId_1.MediaId(media.id.toString()), 'entity', entityId);
        const attached = await repository.findByEntity(entityId);
        expect(attached.length).toBe(1);
        expect(attached[0].id.toString()).toBe(media.id.toString());
    });
});
//# sourceMappingURL=AttachMedia.spec.js.map