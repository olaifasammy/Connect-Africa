import { CardinalityRule } from '../value-objects/CardinalityRule';
import { DomainError } from '../errors/DomainError';

export class CardinalityPolicy {
  public validate(count: number, rule: CardinalityRule): void {
    if (rule.max !== null && count > rule.max) {
      throw new DomainError(`Cardinality exceeded. Max allowed is ${rule.max}.`);
    }
    if (count < rule.min) {
      throw new DomainError(`Cardinality not met. Min required is ${rule.min}.`);
    }
  }
}
