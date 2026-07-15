import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
interface MediaFolderProps {
    name: string;
    parentId?: UniqueEntityId;
    createdBy: UniqueEntityId;
    createdAt: Date;
}
export declare class MediaFolder extends AggregateRoot<MediaFolderProps> {
    private constructor();
    static create(props: MediaFolderProps, id?: UniqueEntityId): MediaFolder;
    get name(): string;
}
export {};
