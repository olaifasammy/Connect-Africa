export class BrowserResponseService {
  format(content: string): string {
    return `<html><body>${content}</body></html>`;
  }
}
