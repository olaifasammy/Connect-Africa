import { Entity } from '../../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { FilePath } from '../value-objects/FilePath';
import { FileHash } from '../value-objects/FileHash';
interface MediaVersionProps {
    version: number;
    filePath: FilePath;
    fileHash: FileHash;
    createdAt: Date;
}
export declare class MediaVersion extends Entity<MediaVersionProps> {
    private constructor();
    static create(props: MediaVersionProps, id?: UniqueEntityId): MediaVersion;
    get version(): number;
    get filePath(): FilePath;
    get fileHash(): FileHash;
}
export {};
