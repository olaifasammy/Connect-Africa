import { IQueryHandler } from '../../../../../shared/application/handlers/IQueryHandler';
import { ListUsersQuery } from '../../../../auth/application/queries/ListUsersQuery';
import { IUserRepository } from '../../../../auth/domain/repositories/UserRepository';
export declare class ListUsersQueryHandler implements IQueryHandler<ListUsersQuery, any> {
    private userRepository;
    constructor(userRepository: IUserRepository);
    handle(query: ListUsersQuery): Promise<any>;
}
