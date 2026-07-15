import { MediaUsage } from '@modules/media/domain/models/MediaUsage';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

describe('MediaUsage', () => {
  it('should create valid media usage', () => {
    const mediaId = new UniqueEntityId();
    const resourceId = new UniqueEntityId();
    const usage = MediaUsage.create({
      mediaId,
      resourceType: 'Entity',
      resourceId,
      usedAt: new Date()
    });

    expect(usage.mediaId).toBe(mediaId);
    expect(usage.resourceType).toBe('Entity');
    expect(usage.resourceId).toBe(resourceId);
  });
});
