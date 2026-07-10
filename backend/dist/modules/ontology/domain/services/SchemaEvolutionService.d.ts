import { Ontology } from '../entities/Ontology';
import { OntologyVersion } from '../entities/OntologyVersion';
export declare class SchemaEvolutionService {
    evolve(ontology: Ontology, newVersion: number): OntologyVersion;
}
