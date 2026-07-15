import { Entity } from '@shared/domain/Entity';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

interface MediaUsageProps {
  mediaId: UniqueEntityId;
  resourceType: string;
  resourceId: UniqueEntityId;
  usedAt: Date;
}

export class MediaUsage extends Entity<MediaUsageProps> {
  static create(props: MediaUsageProps, id?: UniqueEntityId): MediaUsage {
    return new MediaUsage(props, id);
  }

  get mediaId(): UniqueEntityId {
    return this.props.mediaId;
  }

  get resourceType(): string {
    return this.props.resourceType;
  }

  get resourceId(): UniqueEntityId {
    return this.props.resourceId;
  }

  get usedAt(): Date {
    return this.props.usedAt;
  }
}
