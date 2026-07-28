import { IOntologyGraphService } from '@modules/ontology/public';

export class OntologySuggestionService {
  constructor(private readonly ontologyGraphService: IOntologyGraphService) {}

  suggest(content: string): string[] {
    // Integration point: Use ontologyGraphService here
    return ['Concept1'];
  }
}
