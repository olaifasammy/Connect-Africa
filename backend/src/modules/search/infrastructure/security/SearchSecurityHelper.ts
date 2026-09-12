import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

@provide(SearchSecurityHelper, true)
@injectable()
export class SearchSecurityHelper {
  static sanitizeInput(query: string): string {
    // Basic sanitization against XSS
    let clean = purify.sanitize(query);
    // Escape specific characters that might impact full-text search syntax if passed unchecked
    clean = clean.replace(/['"\\;]/g, '');
    return clean;
  }

  static enforceRbac(userRoles: string[], requiredRoles: string[]): boolean {
    return requiredRoles.some(role => userRoles.includes(role));
  }
}
