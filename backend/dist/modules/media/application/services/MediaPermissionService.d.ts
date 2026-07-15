import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class MediaPermissionService {
    canAccess(userId: UniqueEntityId, mediaId: UniqueEntityId): Promise<boolean>;
}
