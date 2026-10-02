import { Entity } from '../entities/Entity';

export class EntityQualityCalculator {
  public static calculate(entity: Entity): number {
    let score = 0;

    // 1. Has non-empty name (+15)
    if (entity.name && entity.name.value.trim().length > 0) {
      score += 15;
    }

    // 2. Has description (+20 if > 50 chars, otherwise +10 if any)
    const description = entity.metadata.description?.trim() || '';
    if (description.length > 50) {
      score += 20;
    } else if (description.length > 0) {
      score += 10;
    }

    // 3. Has slug (+10)
    if (entity.metadata.slug && entity.metadata.slug.trim().length > 0) {
      score += 10;
    }

    // 4. Has tags (+10 if >= 1 tag)
    if (entity.metadata.tags && entity.metadata.tags.length > 0) {
      score += 10;
    }

    // 5. Has source / citation metadata (+15)
    if (entity.metadata.source && entity.metadata.source.trim().length > 0) {
      score += 15;
    }

    // 6. Has showcase content (README / MDX) (+15)
    if (entity.metadata.showcaseContent && entity.metadata.showcaseContent.trim().length > 0) {
      score += 15;
    }

    // 7. Has extra attributes or business profile (+15 if any of them is populated)
    const hasAttributes = Object.keys(entity.metadata.attributes || {}).length > 0;
    const hasBusinessProfile = Object.keys(entity.metadata.businessProfile || {}).length > 0;
    if (hasAttributes || hasBusinessProfile) {
      score += 15;
    }

    // Ensure score is bounded between 0 and 100
    return Math.min(100, Math.max(0, score));
  }
}
