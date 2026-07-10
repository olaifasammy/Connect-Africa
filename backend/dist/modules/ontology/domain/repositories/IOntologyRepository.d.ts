import { Ontology } from '../entities/Ontology';
import { OntologyId } from '../value-objects/OntologyId';
export interface IOntologyRepository {
    save(ontology: Ontology): Promise<void>;
    findById(id: OntologyId): Promise<Ontology | null>;
    findByName(name: string): Promise<Ontology | null>;
    findAll(limit: number, offset: number): Promise<Ontology[]>;
    exists(name: string): Promise<boolean>;
}
