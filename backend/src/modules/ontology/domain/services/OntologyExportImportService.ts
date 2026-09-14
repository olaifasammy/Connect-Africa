import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Ontology } from '../entities/Ontology';
import { DomainError } from '../errors/DomainError';

export interface OntologyJsonLdSchema {
  '@context': string;
  '@type': string;
  id: string;
  name: string;
  description: string;
  version: number;
  entityTypes: Array<{ name: string; description: string }>;
  relationshipTypes: Array<{ name: string; description: string; source: string; target: string }>;
  exportedAt: string;
}

@provide(OntologyExportImportService, true)
@injectable()
export class OntologyExportImportService {
  public exportToJsonLd(
    ontology: Ontology,
    entityTypes: Array<{ name: string; description: string }> = [],
    relationshipTypes: Array<{ name: string; description: string; source: string; target: string }> = []
  ): OntologyJsonLdSchema {
    if (!ontology) {
      throw new DomainError('Ontology is required for JSON-LD export.');
    }

    return {
      '@context': 'https://schema.connectafrica.org/ontology/v2',
      '@type': 'OntologyDefinition',
      id: ontology.id.toString(),
      name: ontology.name,
      description: ontology.description,
      version: ontology.version,
      entityTypes,
      relationshipTypes,
      exportedAt: new Date().toISOString(),
    };
  }

  public importFromJsonLd(data: any): { name: string; description: string; version: number } {
    if (!data || typeof data !== 'object') {
      throw new DomainError('Invalid import payload: object expected.');
    }

    if (!data.name || typeof data.name !== 'string') {
      throw new DomainError('Import validation failed: Ontology name is required.');
    }

    return {
      name: data.name.trim(),
      description: typeof data.description === 'string' ? data.description.trim() : '',
      version: typeof data.version === 'number' ? data.version : 1,
    };
  }
}
