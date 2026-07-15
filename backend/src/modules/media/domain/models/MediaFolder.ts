import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

interface MediaFolderProps {
  name: string;
  parentId?: UniqueEntityId;
  createdBy: UniqueEntityId;
  createdAt: Date;
}

export class MediaFolder extends AggregateRoot<MediaFolderProps> {
  private constructor(props: MediaFolderProps, id?: UniqueEntityId) {
    super(props, id);
  }

  static create(props: MediaFolderProps, id?: UniqueEntityId): MediaFolder {
    return new MediaFolder(props, id);
  }

  get name(): string {
    return this.props.name;
  }
}
