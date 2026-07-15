import { Entity } from '../../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { FilePath } from '../value-objects/FilePath';
import { ImageDimensions } from '../value-objects/ImageDimensions';
interface MediaThumbnailProps {
    filePath: FilePath;
    dimensions: ImageDimensions;
}
export declare class MediaThumbnail extends Entity<MediaThumbnailProps> {
    private constructor();
    static create(props: MediaThumbnailProps, id?: UniqueEntityId): MediaThumbnail;
    get filePath(): FilePath;
    get dimensions(): ImageDimensions;
}
export {};
