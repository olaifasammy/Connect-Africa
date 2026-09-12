import { Entity } from '@shared/domain/Entity';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

interface MediaMetadataProps {
  key: string;
  value: string;
}

export class MediaMetadata extends Entity<MediaMetadataProps> {
  private constructor(props: MediaMetadataProps, id?: UniqueEntityId) {
    super(props, id);
  }

  static create(props: MediaMetadataProps, id?: UniqueEntityId): MediaMetadata {
    return new MediaMetadata(props, id);
  }

  get key(): string {
    return this.props.key;
  }

  get value(): string {
    return this.props.value;
  }
}
