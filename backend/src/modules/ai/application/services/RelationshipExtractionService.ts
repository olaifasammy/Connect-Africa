import { provide } from "inversify-binding-decorators";
import { injectable } from "inversify";
@provide(RelationshipExtractionService, true)
@injectable()
export class RelationshipExtractionService {
  extract(content: string): string[] {
    return ['RelationshipB'];
  }
}
