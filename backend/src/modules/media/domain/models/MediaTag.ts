import { Entity } from '@shared/domain/Entity';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

interface MediaTagProps {
  mediaId: UniqueEntityId;
  tag: string;
}

export class MediaTag extends Entity<MediaTagProps> {
  static create(props: MediaTagProps, id?: UniqueEntityId): MediaTag {
    return new MediaTag(props, id);
  }
}
