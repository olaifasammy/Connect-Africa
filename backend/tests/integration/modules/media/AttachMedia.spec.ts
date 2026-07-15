import { PostgresMediaRepository } from '@modules/media/infrastructure/repositories/PostgresMediaRepository';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { Media } from '@modules/media/domain/models/Media';
import { FileName } from '@modules/media/domain/value-objects/FileName';
import { MimeType } from '@modules/media/domain/value-objects/MimeType';
import { MediaStatus, MediaStatusType } from '@modules/media/domain/value-objects/MediaStatus';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { MediaId } from '@modules/media/domain/value-objects/MediaId';

describe('AttachMedia Integration', () => {
  let repository: PostgresMediaRepository;
  let postgresProvider: PostgresProvider;

  beforeAll(async () => {
    // Assuming PostgresProvider uses process.env.DATABASE_URL from setup.ts
    postgresProvider = new PostgresProvider();
    await postgresProvider.connect();
    repository = new PostgresMediaRepository(postgresProvider);
  });

  afterAll(async () => {
    await postgresProvider.disconnect();
  });

  it('should attach media to entity', async () => {
    const media = Media.create({
      fileName: new FileName('test.jpg'),
      mimeType: new MimeType('image/jpeg'),
      filePath: '/path/to/test.jpg',
      fileSize: 1024,
      uploadedAt: new Date(),
      status: MediaStatus.create(MediaStatusType.DRAFT),
      title: 'Test Media',
    });
    await repository.save(media);

    const entityId = new UniqueEntityId();
    await repository.attach(new MediaId(media.id.toString()), 'entity', entityId);

    const attached = await repository.findByEntity(entityId);
    expect(attached.length).toBe(1);
    expect(attached[0].id.toString()).toBe(media.id.toString());
  });
});
