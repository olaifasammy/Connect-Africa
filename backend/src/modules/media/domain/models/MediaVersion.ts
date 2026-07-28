import { Entity } from '@shared/domain/Entity';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { FilePath } from '../value-objects/FilePath';
import { FileHash } from '../value-objects/FileHash';

interface MediaVersionProps {
  version: number;
  filePath: FilePath;
  fileHash: FileHash;
  createdAt: Date;
}

export class MediaVersion extends Entity<MediaVersionProps> {
  private constructor(props: MediaVersionProps, id?: UniqueEntityId) {
    super(props, id);
  }

  static create(props: MediaVersionProps, id?: UniqueEntityId): MediaVersion {
    return new MediaVersion(props, id);
  }

  get version(): number {
    return this.props.version;
  }

  get filePath(): FilePath {
    return this.props.filePath;
  }

  get fileHash(): FileHash {
    return this.props.fileHash;
  }
}
