import { ValueObject } from '@shared/domain/ValueObject';

export interface CardinalityRuleProps {
  min: number;
  max: number | null;
}

export class CardinalityRule
  extends ValueObject<CardinalityRuleProps>
{
  private constructor(
    props: CardinalityRuleProps,
  ) {
    super(props);
  }

  public static create(
    props: CardinalityRuleProps,
  ): CardinalityRule {
    if (!Number.isInteger(props.min) || props.min < 0) {
      throw new Error(
        'Min cardinality must be an integer greater than or equal to 0.',
      );
    }

    if (
      props.max !== null &&
      (!Number.isInteger(props.max) ||
        props.max < props.min)
    ) {
      throw new Error(
        'Max cardinality must be null or an integer greater than or equal to min cardinality.',
      );
    }

    return new CardinalityRule({
      min: props.min,
      max: props.max,
    });
  }

  get min(): number {
    return this.props.min;
  }

  get max(): number | null {
    return this.props.max;
  }
}