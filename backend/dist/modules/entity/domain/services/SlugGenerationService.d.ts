import { EntityName } from '../value-objects/EntityName';
import { ISlugGenerationService } from './ISlugGenerationService';
export declare class SlugGenerationService implements ISlugGenerationService {
    generate(name: EntityName): string;
}
