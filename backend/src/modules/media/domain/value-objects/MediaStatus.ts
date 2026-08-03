import { ValueObject } from '@shared/domain/ValueObject';

export enum MediaStatusType {
  PENDING = 'pending',
  PROCESSING = 'processing',
  READY = 'ready',
  FAILED = 'failed',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

interface MediaStatusProps {
  value: MediaStatusType;
}

export class MediaStatus extends ValueObject<MediaStatusProps> {
  private constructor(props: MediaStatusProps) {
    super(props);
  }

  static create(value: MediaStatusType): MediaStatus {
    return new MediaStatus({ value });
  }

  static fromString(value: string): MediaStatus {
    return new MediaStatus({ value: value as MediaStatusType });
  }

  get value(): MediaStatusType {
    return this.props.value;
  }
}
