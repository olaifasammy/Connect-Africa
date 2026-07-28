import { Media } from '../models/Media';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class MediaOwnershipPolicy {
  static isOwner(media: Media, userId: UniqueEntityId): boolean {
    return media.ownerId.equals(userId);
  }
}
