import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { EntityName } from '../value-objects/EntityName';
import { ISlugGenerationService } from './ISlugGenerationService';

@provide(SlugGenerationService, true)
@injectable()
export class SlugGenerationService
  implements ISlugGenerationService
{
  generate(name: EntityName): string {
    const normalized = name.value
      .normalize('NFKC')
      .toLocaleLowerCase()
      .normalize('NFD')
      .replace(/\p{M}+/gu, '')
      .replace(/[^\p{L}\p{N}]+/gu, '-')
      .replace(/^-+|-+$/g, '');

    return normalized;
  }
}