import { provide } from "inversify-binding-decorators";
import { injectable } from "inversify";
@provide(RelationshipSuggestionService, true)
@injectable()
export class RelationshipSuggestionService {
  suggest(entities: string[]): string[] {
    return ['Relationship1'];
  }
}
