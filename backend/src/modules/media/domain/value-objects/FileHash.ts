import { ValueObject } from '@shared/domain/ValueObject';

interface FileHashProps {
  value: string;
  algorithm: 'sha256' | 'md5';
}

export class FileHash extends ValueObject<FileHashProps> {
  private constructor(props: FileHashProps) {
    super(props);
  }

  static create(value: string, algorithm: 'sha256' | 'md5' = 'sha256'): FileHash {
    if (!value || value.trim().length === 0) {
      throw new Error('FileHash cannot be empty');
    }
    return new FileHash({ value, algorithm });
  }

  get value(): string {
    return this.props.value;
  }

  get algorithm(): 'sha256' | 'md5' {
    return this.props.algorithm;
  }
}
