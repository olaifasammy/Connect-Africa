import { provide } from "inversify-binding-decorators";
import { injectable } from "inversify";
@provide(OntologyDetectionService, true)
@injectable()
export class OntologyDetectionService {
  detect(content: string): string[] {
    return ['OntologyC'];
  }
}
