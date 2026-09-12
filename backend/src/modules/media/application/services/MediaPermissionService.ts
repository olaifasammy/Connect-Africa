import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

@provide(MediaPermissionService, true)
@injectable()
export class MediaPermissionService {
  async canAccess(userId: UniqueEntityId, mediaId: UniqueEntityId): Promise<boolean> {
    // Logic to check permissions
    return true;
  }
}
