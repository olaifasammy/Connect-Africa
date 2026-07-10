import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { OntologyId } from '../value-objects/OntologyId';
export interface RelationshipTypeProps {
    ontologyId: OntologyId;
    name: string;
    description: string;
    sourceEntityTypeId: UniqueEntityId;
    targetEntityTypeId: UniqueEntityId;
}
export declare class RelationshipType extends AggregateRoot<RelationshipTypeProps> {
    private constructor();
    static create(props: RelationshipTypeProps, id?: UniqueEntityId): RelationshipType;
    update(name: string, description: string): void;
    delete(): void;
    get id(): UniqueEntityId;
    get name(): string;
    get description(): string;
    get sourceEntityTypeId(): UniqueEntityId;
    get targetEntityTypeId(): UniqueEntityId;
}
