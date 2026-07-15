import { ValueObject } from '@shared/domain/ValueObject';

interface MediaIdProps {
  value: string;
}

export class MediaId extends ValueObject<MediaIdProps> {
  constructor(value: string) {
    super({ value });
  }

  get value(): string {
    return this.props.value;
  }
}
