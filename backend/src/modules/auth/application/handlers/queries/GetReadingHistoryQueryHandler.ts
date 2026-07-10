import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { GetReadingHistoryQuery } from '@modules/auth/application/queries/GetReadingHistoryQuery';
import { IReadingHistoryRepository } from '@modules/auth/domain/repositories/IReadingHistoryRepository';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class GetReadingHistoryQueryHandler implements IQueryHandler<GetReadingHistoryQuery, any> {
  constructor(private historyRepository: IReadingHistoryRepository) {}

  async handle(query: GetReadingHistoryQuery): Promise<any> {
    try {
      const history = await this.historyRepository.getHistory(new UniqueEntityId(query.userId));
      
      AuditLogger.log({
        user: query.userId,
        action: 'GET_READING_HISTORY',
        resource: 'HISTORY',
        status: 'SUCCESS',
        ipAddress: query.ipAddress
      });
      
      return history;
    } catch (error) {
      AuditLogger.log({
        user: query.userId,
        action: 'GET_READING_HISTORY',
        resource: 'HISTORY',
        status: 'FAILURE',
        ipAddress: query.ipAddress
      });
      throw error instanceof AuthenticationError ? error : new AuthenticationError('Failed to get reading history');
    }
  }
}
