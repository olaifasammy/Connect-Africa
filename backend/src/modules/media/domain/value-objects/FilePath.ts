import { ValueObject } from '@shared/domain/ValueObject';

interface FilePathProps {
  value: string;
}

export class FilePath extends ValueObject<FilePathProps> {
  private constructor(props: FilePathProps) {
    super(props);
  }

  static create(path: string): FilePath {
    if (!path || path.trim().length === 0) {
      throw new Error('FilePath cannot be empty');
    }
    return new FilePath({ value: path });
  }

  get value(): string {
    return this.props.value;
  }
}
