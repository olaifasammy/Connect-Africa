import { ValueObject } from '../../../../shared/domain/ValueObject';
export interface CardinalityRuleProps {
    min: number;
    max: number | null;
}
export declare class CardinalityRule extends ValueObject<CardinalityRuleProps> {
    private constructor();
    static create(props: CardinalityRuleProps): CardinalityRule;
    get min(): number;
    get max(): number | null;
}
