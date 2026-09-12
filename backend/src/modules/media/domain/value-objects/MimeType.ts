import { ValueObject } from '@shared/domain/ValueObject';

interface MimeTypeProps {
  value: string;
}

export class MimeType extends ValueObject<MimeTypeProps> {
  constructor(value: string) {
    if (!value || value.trim() === '') {
      throw new Error('Mime type cannot be empty');
    }
    super({ value: value.trim().toLowerCase() });
  }

  get value(): string {
    return this.props.value;
  }
}
