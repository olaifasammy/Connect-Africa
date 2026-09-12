import { CrawlTarget } from '../value-objects/ValueObjects';

export interface ICrawlTargetValidator {
  validate(target: CrawlTarget): boolean;
}

export class CrawlTargetValidator implements ICrawlTargetValidator {
  validate(target: CrawlTarget): boolean {
    return target.url.startsWith('http');
  }
}
