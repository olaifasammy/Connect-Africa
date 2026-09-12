import { provide } from "inversify-binding-decorators";
import { injectable, inject } from "inversify";
import { IOntologyGraphService } from '@modules/ontology/public';

@provide(OntologySuggestionService, true)
@injectable()
export class OntologySuggestionService {
  constructor(@inject('IOntologyGraphService') private readonly ontologyGraphService: IOntologyGraphService) {}

  suggest(content: string): string[] {
    // Integration point: Use ontologyGraphService here
    return ['Concept1'];
  }
}
