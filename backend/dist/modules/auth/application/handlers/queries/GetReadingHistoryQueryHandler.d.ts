import { IQueryHandler } from '../../../../../shared/application/handlers/IQueryHandler';
import { GetReadingHistoryQuery } from '../../../../auth/application/queries/GetReadingHistoryQuery';
import { IReadingHistoryRepository } from '../../../../auth/domain/repositories/IReadingHistoryRepository';
export declare class GetReadingHistoryQueryHandler implements IQueryHandler<GetReadingHistoryQuery, any> {
    private historyRepository;
    constructor(historyRepository: IReadingHistoryRepository);
    handle(query: GetReadingHistoryQuery): Promise<any>;
}
