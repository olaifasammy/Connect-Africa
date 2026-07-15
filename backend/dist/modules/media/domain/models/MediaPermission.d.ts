import { Entity } from '../../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
interface MediaPermissionProps {
    mediaId: UniqueEntityId;
    userId: UniqueEntityId;
    permission: 'READ' | 'WRITE' | 'ADMIN';
}
export declare class MediaPermission extends Entity<MediaPermissionProps> {
    static create(props: MediaPermissionProps, id?: UniqueEntityId): MediaPermission;
}
export {};
