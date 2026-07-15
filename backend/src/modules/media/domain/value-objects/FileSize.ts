import { ValueObject } from '@shared/domain/ValueObject';

interface FileSizeProps {
  bytes: number;
}

export class FileSize extends ValueObject<FileSizeProps> {
  private constructor(props: FileSizeProps) {
    super(props);
  }

  static create(bytes: number): FileSize {
    if (bytes < 0) {
      throw new Error('FileSize cannot be negative');
    }
    return new FileSize({ bytes });
  }

  get bytes(): number {
    return this.props.bytes;
  }
}
