import { provide } from "inversify-binding-decorators";
import { injectable } from "inversify";
@provide(MissingArticleDetectionService, true)
@injectable()
export class MissingArticleDetectionService {
  detect(content: string): string[] {
    return ['MissingArticleD'];
  }
}
