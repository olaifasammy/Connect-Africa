import { OntologyVersion } from '../entities/OntologyVersion';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export interface IOntologyVersionRepository {
    save(version: OntologyVersion): Promise<void>;
    findById(id: UniqueEntityId): Promise<OntologyVersion | null>;
    findByOntologyId(ontologyId: UniqueEntityId): Promise<OntologyVersion[]>;
}
