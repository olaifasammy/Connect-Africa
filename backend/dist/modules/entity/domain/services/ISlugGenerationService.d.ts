import { EntityName } from '../value-objects/EntityName';
export interface ISlugGenerationService {
    generate(name: EntityName): string;
}
