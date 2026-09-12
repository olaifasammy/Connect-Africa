import { Entity } from '@shared/domain/Entity';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { FilePath } from '../value-objects/FilePath';
import { ImageDimensions } from '../value-objects/ImageDimensions';

interface MediaThumbnailProps {
  filePath: FilePath;
  dimensions: ImageDimensions;
}

export class MediaThumbnail extends Entity<MediaThumbnailProps> {
  private constructor(props: MediaThumbnailProps, id?: UniqueEntityId) {
    super(props, id);
  }

  static create(props: MediaThumbnailProps, id?: UniqueEntityId): MediaThumbnail {
    return new MediaThumbnail(props, id);
  }

  get filePath(): FilePath {
    return this.props.filePath;
  }

  get dimensions(): ImageDimensions {
    return this.props.dimensions;
  }
}
