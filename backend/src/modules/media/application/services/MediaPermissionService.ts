import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class MediaPermissionService {
  async canAccess(userId: UniqueEntityId, mediaId: UniqueEntityId): Promise<boolean> {
    // Logic to check permissions
    return true;
  }
}
