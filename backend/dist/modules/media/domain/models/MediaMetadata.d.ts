import { Entity } from '../../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
interface MediaMetadataProps {
    key: string;
    value: string;
}
export declare class MediaMetadata extends Entity<MediaMetadataProps> {
    private constructor();
    static create(props: MediaMetadataProps, id?: UniqueEntityId): MediaMetadata;
    get key(): string;
    get value(): string;
}
export {};
