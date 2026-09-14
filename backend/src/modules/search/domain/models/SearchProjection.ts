import { SearchResourceType } from './SearchDocument';

export interface SearchIdentityProjection {
  readonly resourceId: string;
  readonly resourceType: SearchResourceType;
  readonly canonicalName?: string;
  readonly slug?: string;
  readonly aliases?: readonly string[];
  readonly identifiers?: readonly string[];
}

export interface SearchOntologyProjection {
  readonly ontologyId?: string;
  readonly ontologyName?: string;
  readonly ontologyDescription?: string;
}

export interface SearchEntityTypeProjection {
  readonly entityTypeId?: string;
  readonly entityTypeName?: string;
  readonly entityTypeDescription?: string;
}

export interface SearchEntityProjection {
  readonly identity: SearchIdentityProjection;
  readonly ontology?: SearchOntologyProjection;
  readonly entityType?: SearchEntityTypeProjection;
  readonly description?: string;
  readonly tags?: readonly string[];
  readonly attributes?: Record<string, unknown>;
  readonly status?: string;
  readonly relationshipCount?: number;
  readonly articleCount?: number;
  readonly sourceCount?: number;
}

export interface SearchRelationshipEndpointProjection {
  readonly entityId: string;
  readonly name?: string;
  readonly entityTypeId?: string;
  readonly entityTypeName?: string;
}

export interface SearchRelationshipTypeProjection {
  readonly relationshipTypeId: string;
  readonly name?: string;
  readonly description?: string;
  readonly ontologyId?: string;
  readonly ontologyName?: string;
}

export interface SearchRelationshipProjection {
  readonly identity: SearchIdentityProjection;
  readonly source: SearchRelationshipEndpointProjection;
  readonly relationshipType: SearchRelationshipTypeProjection;
  readonly target: SearchRelationshipEndpointProjection;
}

export interface SearchArticleProjection {
  readonly identity: SearchIdentityProjection;
  readonly title: string;
  readonly slug: string;
  readonly summary?: string;
  readonly searchableText?: string;
  readonly language?: string;
  readonly status?: string;
  readonly authorId?: string;
  readonly publishedAt?: string;
  readonly entityIds?: readonly string[];
  readonly relationshipIds?: readonly string[];
  readonly sourceIds?: readonly string[];
  readonly tags?: readonly string[];
  readonly categories?: readonly string[];
}

export interface SearchSourceProjection {
  readonly identity: SearchIdentityProjection;
  readonly title: string;
  readonly sourceType?: string;
  readonly provenance?: unknown;
}

export interface SearchOntologyResourceProjection {
  readonly identity: SearchIdentityProjection;
  readonly description?: string;
  readonly entityTypeIds?: readonly string[];
  readonly relationshipTypeIds?: readonly string[];
}

export type SearchProjection =
  | {
      readonly resourceType: 'entity';
      readonly data: SearchEntityProjection;
    }
  | {
      readonly resourceType: 'relationship';
      readonly data: SearchRelationshipProjection;
    }
  | {
      readonly resourceType: 'article';
      readonly data: SearchArticleProjection;
    }
  | {
      readonly resourceType: 'source';
      readonly data: SearchSourceProjection;
    }
  | {
      readonly resourceType: 'ontology';
      readonly data: SearchOntologyResourceProjection;
    };
