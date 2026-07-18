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

  let userId: string;

  beforeAll(async () => {
    postgresProvider = new PostgresProvider();
    await postgresProvider.connect();
    
    const email = `test-${Date.now()}@example.com`;
    const userResult = await postgresProvider.query(
      'INSERT INTO users (id, email, password_hash) VALUES (gen_random_uuid(), $1, $2) RETURNING id',
      [email, 'hash']
    );
    userId = userResult.rows[0].id;

    repository = new PostgresMediaRepository(postgresProvider);
  });

  afterAll(async () => {
    await postgresProvider.query('DELETE FROM media WHERE owner_id = $1', [userId]);
    await postgresProvider.query('DELETE FROM users WHERE id = $1', [userId]);
    await postgresProvider.disconnect();
  });

  it('should attach media to entity', async () => {
    const media = Media.create({
      fileName: new FileName('test.jpg'),
      mimeType: new MimeType('image/jpeg'),
      filePath: '/path/to/test.jpg',
      fileSize: 1024,
      uploadedAt: new Date(),
      status: MediaStatus.create(MediaStatusType.PENDING),
      title: 'Test Media',
      ownerId: new UniqueEntityId(userId),
    });
    await repository.save(media);

    const entityId = new UniqueEntityId();
    await repository.attach(new MediaId(media.id.toString()), 'entity', entityId);

    const attached = await repository.findByEntity(entityId);
    expect(attached.length).toBe(1);
    expect(attached[0].id.toString()).toBe(media.id.toString());
  });
});
