import { v4 as uuidv4 } from 'uuid';

export class UniqueEntityId {
  private readonly value: string;

  constructor(value?: string) {
    this.value = value || uuidv4();
  }

  public toString(): string {
    return this.value;
  }

  equals(other: UniqueEntityId): boolean {
    return this.value === other.value;
  }
}
