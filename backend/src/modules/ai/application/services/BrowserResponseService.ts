import { provide } from "inversify-binding-decorators";
import { injectable } from "inversify";
@provide(BrowserResponseService, true)
@injectable()
export class BrowserResponseService {
  format(content: string): string {
    return `<html><body>${content}</body></html>`;
  }
}
