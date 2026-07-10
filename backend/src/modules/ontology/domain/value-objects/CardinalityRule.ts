import { ValueObject } from '@shared/domain/ValueObject';

export interface CardinalityRuleProps {
  min: number;
  max: number | null; // null for infinite
}

export class CardinalityRule extends ValueObject<CardinalityRuleProps> {
  private constructor(props: CardinalityRuleProps) {
    super(props);
  }

  public static create(props: CardinalityRuleProps): CardinalityRule {
    if (props.min < 0) {
      throw new Error('Min cardinality cannot be negative');
    }
    if (props.max !== null && props.max < props.min) {
      throw new Error('Max cardinality cannot be less than min');
    }
    return new CardinalityRule(props);
  }

  get min(): number {
    return this.props.min;
  }

  get max(): number | null {
    return this.props.max;
  }
}
