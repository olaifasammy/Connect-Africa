import { IOntologyRepository } from '../../ontology/domain/repositories/IOntologyRepository';
import { Ontology } from '../../ontology/domain/entities/Ontology';
import { OntologyId } from '../../ontology/domain/value-objects/OntologyId';
import { PostgresProvider } from '../../../shared/infrastructure/database/PostgresProvider';
export declare class PostgresOntologyRepository implements IOntologyRepository {
    private readonly postgresProvider;
    constructor(postgresProvider: PostgresProvider);
    save(ontology: Ontology): Promise<void>;
    findById(id: OntologyId): Promise<Ontology | null>;
    findByName(name: string): Promise<Ontology | null>;
    findAll(limit: number, offset: number): Promise<Ontology[]>;
    exists(name: string): Promise<boolean>;
}
