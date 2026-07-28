// Service Interfaces
export { IOntologyService } from '../application/services/IOntologyService';
export { IOntologyGraphService } from '../application/services/IOntologyGraphService';

// Data Transfer Objects
export { OntologyResponseDto, OntologyDto } from '../application/dto/OntologyDto';
export { 
  CreateOntologyDto, 
  UpdateOntologyDto, 
  EntityTypeDto, 
  RelationshipTypeDto, 
  OntologyVersionDto 
} from '../application/dto/OntologyDtos';

// Events
export { OntologyCreatedEvent } from '../domain/events/OntologyCreatedEvent';
