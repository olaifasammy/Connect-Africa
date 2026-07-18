import { CrawlTarget } from '../value-objects/ValueObjects';
export interface ICrawlTargetValidator {
    validate(target: CrawlTarget): boolean;
}
export declare class CrawlTargetValidator implements ICrawlTargetValidator {
    validate(target: CrawlTarget): boolean;
}
