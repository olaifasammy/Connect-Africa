import { IQueryHandler } from '../../../../../shared/application/handlers/IQueryHandler';
import { GetBookmarksQuery } from '../../../../auth/application/queries/GetBookmarksQuery';
import { IUserBookmarkRepository } from '../../../../auth/domain/repositories/IUserBookmarkRepository';
export declare class GetBookmarksQueryHandler implements IQueryHandler<GetBookmarksQuery, any> {
    private bookmarkRepository;
    constructor(bookmarkRepository: IUserBookmarkRepository);
    handle(query: GetBookmarksQuery): Promise<any>;
}
