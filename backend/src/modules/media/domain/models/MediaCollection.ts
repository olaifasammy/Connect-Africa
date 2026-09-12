import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

interface MediaCollectionProps {
  name: string;
  mediaIds: UniqueEntityId[];
  ownerId: UniqueEntityId;
  createdAt: Date;
}

export class MediaCollection extends AggregateRoot<MediaCollectionProps> {
  private constructor(props: MediaCollectionProps, id?: UniqueEntityId) {
    super(props, id);
  }

  static create(props: MediaCollectionProps, id?: UniqueEntityId): MediaCollection {
    return new MediaCollection(props, id);
  }

  get name(): string {
    return this.props.name;
  }
}
