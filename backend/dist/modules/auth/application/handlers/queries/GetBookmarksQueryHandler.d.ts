import { IQueryHandler } from '../../../../../shared/application/handlers/IQueryHandler';
import { GetBookmarksQuery } from '../../../../auth/application/queries/GetBookmarksQuery';
import { IUserBookmarkRepository } from '../../../../auth/domain/repositories/IUserBookmarkRepository';
import { EventBus } from '../../../../../shared/infrastructure/queue/EventBus';
export declare class GetBookmarksQueryHandler implements IQueryHandler<GetBookmarksQuery, any> {
    private bookmarkRepository;
    private eventBus;
    constructor(bookmarkRepository: IUserBookmarkRepository, eventBus: EventBus);
    handle(query: GetBookmarksQuery): Promise<any>;
}
