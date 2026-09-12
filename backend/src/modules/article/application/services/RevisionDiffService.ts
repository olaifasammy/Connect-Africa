import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { ArticleProps } from '../../domain/entities/Article';

@provide(RevisionDiffService, true)
@injectable()
export class RevisionDiffService {
  public static diff(current: Omit<ArticleProps, 'version'>, previous: Omit<ArticleProps, 'version'>): Record<string, any> {
    const diff: Record<string, any> = {};
    for (const key in current) {
      if (current[key as keyof typeof current] !== previous[key as keyof typeof previous]) {
        diff[key] = {
          from: previous[key as keyof typeof previous],
          to: current[key as keyof typeof current]
        };
      }
    }
    return diff;
  }
}
