import { CardinalityRule } from '../value-objects/CardinalityRule';
export declare class CardinalityPolicy {
    validate(count: number, rule: CardinalityRule): void;
}
