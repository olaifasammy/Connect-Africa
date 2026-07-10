import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class OntologyId extends UniqueEntityId {
    private constructor();
    static create(value?: string): OntologyId;
}
