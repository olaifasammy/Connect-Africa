// Application
export * from '../application/services/OntologyService';
export * from '../application/services/IOntologyGraphService';
export { OntologyResponseDto, OntologyDto } from '../application/dto/OntologyDto';
export { CreateOntologyDto, UpdateOntologyDto, EntityTypeDto, RelationshipTypeDto, OntologyVersionDto } from '../application/dto/OntologyDtos';

// Domain
export * from '../domain/entities/Ontology';
export * from '../domain/entities/EntityType';
export * from '../domain/entities/RelationshipType';
export * from '../domain/repositories/IOntologyRepository';
export * from '../domain/repositories/IEntityTypeRepository';
export * from '../domain/repositories/IRelationshipTypeRepository';
export * from '../domain/events/OntologyCreatedEvent';
