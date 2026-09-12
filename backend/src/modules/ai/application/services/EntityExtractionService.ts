import { provide } from "inversify-binding-decorators";
import { injectable } from "inversify";
@provide(EntityExtractionService, true)
@injectable()
export class EntityExtractionService {
  extract(content: string): string[] {
    return ['EntityA'];
  }
}
