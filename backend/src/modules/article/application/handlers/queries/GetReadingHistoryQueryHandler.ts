import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { GetReadingHistoryQuery } from '@modules/article/application/queries/GetReadingHistoryQuery';
import { IReadingHistoryRepository } from '@modules/article/domain/repositories/IReadingHistoryRepository';
import { IArticleRepository } from '@modules/article/domain/repositories/IArticleRepository';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

@provide(GetReadingHistoryQueryHandler, true)
@injectable()
export class GetReadingHistoryQueryHandler
  implements IQueryHandler<GetReadingHistoryQuery, any[]>
{
  constructor(
    @inject('IReadingHistoryRepository')
    private readonly historyRepository: IReadingHistoryRepository,
    @inject('IArticleRepository')
    private readonly articleRepository: IArticleRepository,
  ) {}

  async handle(query: GetReadingHistoryQuery): Promise<any[]> {
    try {
      const history = await this.historyRepository.getHistory(
        new UniqueEntityId(query.userId),
      );

      const entries = await Promise.all(
        history.map(async (entry) => {
          const article = await this.articleRepository.findById(
            entry.articleId,
          );

          if (!article) {
            return null;
          }

          return {
            article,
            timestamp: entry.timestamp.toISOString(),
          };
        }),
      );

      const result = entries.filter(
        (entry): entry is NonNullable<typeof entry> => entry !== null,
      );

      AuditLogger.log({
        user: query.userId,
        action: 'GET_READING_HISTORY',
        resource: 'HISTORY',
        status: 'SUCCESS',
        ipAddress: query.ipAddress,
      });

      return result;
    } catch (error) {
      AuditLogger.log({
        user: query.userId,
        action: 'GET_READING_HISTORY',
        resource: 'HISTORY',
        status: 'FAILURE',
        ipAddress: query.ipAddress,
      });

      throw error instanceof AuthenticationError
        ? error
        : new AuthenticationError('Failed to get reading history');
    }
  }
}
