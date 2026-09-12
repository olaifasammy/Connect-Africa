import { provide } from "inversify-binding-decorators";
import { injectable } from "inversify";
@provide(DuplicateDetectionService, true)
@injectable()
export class DuplicateDetectionService {
  isDuplicate(content: string): boolean {
    return false;
  }
}
