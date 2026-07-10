import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { OntologyId } from '../value-objects/OntologyId';
export interface EntityTypeProps {
    ontologyId: OntologyId;
    name: string;
    description: string;
}
export declare class EntityType extends AggregateRoot<EntityTypeProps> {
    private constructor();
    static create(props: EntityTypeProps, id?: UniqueEntityId): EntityType;
    update(name: string, description: string): void;
    delete(): void;
    get id(): UniqueEntityId;
    get name(): string;
    get description(): string;
}
