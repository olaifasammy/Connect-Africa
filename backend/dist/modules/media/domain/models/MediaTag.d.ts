import { Entity } from '../../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
interface MediaTagProps {
    mediaId: UniqueEntityId;
    tag: string;
}
export declare class MediaTag extends Entity<MediaTagProps> {
    static create(props: MediaTagProps, id?: UniqueEntityId): MediaTag;
}
export {};
