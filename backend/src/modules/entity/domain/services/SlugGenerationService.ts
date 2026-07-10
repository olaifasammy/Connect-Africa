import { EntityName } from '../value-objects/EntityName';
import { ISlugGenerationService } from './ISlugGenerationService';

export class SlugGenerationService implements ISlugGenerationService {
  generate(name: EntityName): string {
    return name.value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
}
