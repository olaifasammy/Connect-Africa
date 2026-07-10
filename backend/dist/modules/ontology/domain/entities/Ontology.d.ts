import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import { OntologyId } from '../value-objects/OntologyId';
interface OntologyProps {
    name: string;
    description: string;
    version: number;
    isPublished: boolean;
    isArchived: boolean;
}
export declare class Ontology extends AggregateRoot<OntologyProps> {
    private constructor();
    private validate;
    static create(props: OntologyProps, id?: OntologyId): Ontology;
    update(name: string, description: string): void;
    publish(): void;
    archive(): void;
    get id(): OntologyId;
    get name(): string;
    get description(): string;
    get version(): number;
    get isPublished(): boolean;
    get isArchived(): boolean;
}
export {};
