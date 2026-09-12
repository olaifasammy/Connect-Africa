import { provide } from "inversify-binding-decorators";
import { injectable } from "inversify";
@provide(EntitySuggestionService, true)
@injectable()
export class EntitySuggestionService {
  suggest(content: string): string[] {
    return ['Entity1', 'Entity2'];
  }
}
