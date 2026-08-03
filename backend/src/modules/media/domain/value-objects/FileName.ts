import { ValueObject } from '@shared/domain/ValueObject';

interface FileNameProps {
  value: string;
}

export class FileName extends ValueObject<FileNameProps> {
  constructor(value: string) {
    if (!value || value.trim() === '') {
      throw new Error('File name cannot be empty');
    }
    super({ value: value.trim() });
  }

  get value(): string {
    return this.props.value;
  }
}
