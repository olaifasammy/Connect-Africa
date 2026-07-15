import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import { FileName } from '../value-objects/FileName';
import { MimeType } from '../value-objects/MimeType';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { MediaStatus } from '../value-objects/MediaStatus';
interface MediaProps {
    fileName: FileName;
    mimeType: MimeType;
    uploadedAt: Date;
    filePath: string;
    fileSize: number;
    status: MediaStatus;
    title: string;
    ownerId: UniqueEntityId;
}
export declare class Media extends AggregateRoot<MediaProps> {
    private constructor();
    static create(props: MediaProps, id?: UniqueEntityId): Media;
    publish(): void;
    archive(): void;
    rename(newName: string): void;
    get fileName(): FileName;
    get mimeType(): MimeType;
    get uploadedAt(): Date;
    get filePath(): string;
    get fileSize(): number;
    get status(): MediaStatus;
    get title(): string;
    get ownerId(): UniqueEntityId;
}
export {};
