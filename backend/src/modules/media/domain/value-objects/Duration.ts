import { ValueObject } from '@shared/domain/ValueObject';

interface DurationProps {
  seconds: number;
}

export class Duration extends ValueObject<DurationProps> {
  private constructor(props: DurationProps) {
    super(props);
  }

  static create(seconds: number): Duration {
    if (seconds < 0) {
      throw new Error('Duration cannot be negative');
    }
    return new Duration({ seconds });
  }

  get seconds(): number {
    return this.props.seconds;
  }
}
