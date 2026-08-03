import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { MediaId } from '../value-objects/MediaId';
import { FileName } from '../value-objects/FileName';
import { MimeType } from '../value-objects/MimeType';
import { MediaUploadedEvent } from '../events/MediaUploadedEvent';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { MediaStatus, MediaStatusType } from '../value-objects/MediaStatus';

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

export class Media extends AggregateRoot<MediaProps> {
  private constructor(props: MediaProps, id?: UniqueEntityId) {
    super(props, id);
  }

  static create(props: MediaProps, id?: UniqueEntityId): Media {
    const media = new Media(props, id);
    media.addDomainEvent(new MediaUploadedEvent(media.id));
    return media;
  }

  publish(): void {
    this.props.status = MediaStatus.create(MediaStatusType.PUBLISHED);
  }

  archive(): void {
    this.props.status = MediaStatus.create(MediaStatusType.ARCHIVED);
  }

  rename(newName: string): void {
    this.props.fileName = new FileName(newName);
  }

  get fileName(): FileName {
    return this.props.fileName;
  }

  get mimeType(): MimeType {
    return this.props.mimeType;
  }

  get uploadedAt(): Date {
    return this.props.uploadedAt;
  }

  get filePath(): string {
    return this.props.filePath;
  }

  get fileSize(): number {
    return this.props.fileSize;
  }

  get status(): MediaStatus {
    return this.props.status;
  }

  get title(): string {
    return this.props.title;
  }

  get ownerId(): UniqueEntityId {
    return this.props.ownerId;
  }
}
