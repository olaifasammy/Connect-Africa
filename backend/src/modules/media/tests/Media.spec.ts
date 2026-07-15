import { Media } from '../domain/models/Media';
import { FileName } from '../domain/value-objects/FileName';
import { MimeType } from '../domain/value-objects/MimeType';
import { MediaStatus, MediaStatusType } from '../domain/value-objects/MediaStatus';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

describe('Media Aggregate', () => {
  it('should create media with valid props', () => {
    const media = Media.create({
      fileName: new FileName('test.jpg'),
      mimeType: new MimeType('image/jpeg'),
      uploadedAt: new Date(),
      filePath: '/path/to/file',
      fileSize: 1024,
      status: MediaStatus.create(MediaStatusType.READY),
      title: 'Test Media',
      ownerId: new UniqueEntityId(),
    });
    expect(media.fileName.value).toBe('test.jpg');
    expect(media.mimeType.value).toBe('image/jpeg');
    expect(media.title).toBe('Test Media');
  });
});
