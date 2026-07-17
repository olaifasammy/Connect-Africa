import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

export class PromptSanitizationService {
  private readonly purifier: any;

  constructor() {
    const window = new JSDOM('').window;
    this.purifier = createDOMPurify(window as any);
  }

  sanitize(prompt: string): string {
    // Basic sanitization against XSS/Injection
    return this.purifier.sanitize(prompt);
  }
}
