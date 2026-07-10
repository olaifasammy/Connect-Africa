import { IQueryHandler } from '../../../../../shared/application/handlers/IQueryHandler';
import { GetUserSessionsQuery } from '../../../../auth/application/queries/GetUserSessionsQuery';
import { ISessionRepository } from '../../../../auth/domain/repositories/ISessionRepository';
export declare class GetUserSessionsQueryHandler implements IQueryHandler<GetUserSessionsQuery, any> {
    private sessionRepository;
    constructor(sessionRepository: ISessionRepository);
    handle(query: GetUserSessionsQuery): Promise<any>;
}
