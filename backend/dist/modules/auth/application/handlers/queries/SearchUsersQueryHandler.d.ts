import { IQueryHandler } from '../../../../../shared/application/handlers/IQueryHandler';
import { SearchUsersQuery } from '../../queries/SearchUsersQuery';
import { IUserRepository } from '../../../../auth/domain/repositories/UserRepository';
export declare class SearchUsersQueryHandler implements IQueryHandler<SearchUsersQuery, any> {
    private userRepository;
    constructor(userRepository: IUserRepository);
    handle(query: SearchUsersQuery): Promise<any>;
}
