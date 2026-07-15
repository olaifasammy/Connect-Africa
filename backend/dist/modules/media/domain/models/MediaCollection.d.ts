import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
interface MediaCollectionProps {
    name: string;
    mediaIds: UniqueEntityId[];
    ownerId: UniqueEntityId;
    createdAt: Date;
}
export declare class MediaCollection extends AggregateRoot<MediaCollectionProps> {
    private constructor();
    static create(props: MediaCollectionProps, id?: UniqueEntityId): MediaCollection;
    get name(): string;
}
export {};
