import { Entity } from '../entities/Entity';
export class EntityValidator {
  static validate(entity: Entity): void {
    if (!entity.name.value) throw new Error('Entity name is required.');
    if (!entity.type) throw new Error('Entity type is required.');
  }
}
