import { DomainError } from '../errors/DomainError';

export class ReservedSystemTypesPolicy {
  private readonly RESERVED_TYPES = ['system', 'root', 'base'];

  public validate(typeName: string): void {
    if (this.RESERVED_TYPES.includes(typeName.toLowerCase())) {
      throw new DomainError(`Type name '${typeName}' is a reserved system type.`);
    }
  }
}
