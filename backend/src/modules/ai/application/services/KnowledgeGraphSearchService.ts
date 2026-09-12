import { provide } from "inversify-binding-decorators";
import { injectable } from "inversify";
@provide(KnowledgeGraphSearchService, true)
@injectable()
export class KnowledgeGraphSearchService {
  async search(query: string): Promise<string[]> {
    return ['ResultA', 'ResultB'];
  }
}
