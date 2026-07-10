import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export interface OntologyVersionProps {
    version: number;
    isPublished: boolean;
    createdAt: Date;
}
export declare class OntologyVersion extends AggregateRoot<OntologyVersionProps> {
    private constructor();
    static create(props: OntologyVersionProps, id?: UniqueEntityId): OntologyVersion;
    get version(): number;
    get isPublished(): boolean;
    publish(): void;
    get createdAt(): Date;
}
