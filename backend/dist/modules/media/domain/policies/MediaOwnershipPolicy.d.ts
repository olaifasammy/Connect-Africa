import { Media } from '../models/Media';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class MediaOwnershipPolicy {
    static isOwner(media: Media, userId: UniqueEntityId): boolean;
}
