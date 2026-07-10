import { IQueryHandler } from '../../../../../shared/application/handlers/IQueryHandler';
import { ViewUsersQuery } from '../../queries/ViewUsersQuery';
import { IUserRepository } from '../../../../auth/domain/repositories/UserRepository';
export declare class ViewUsersQueryHandler implements IQueryHandler<ViewUsersQuery, any> {
    private userRepository;
    constructor(userRepository: IUserRepository);
    handle(query: ViewUsersQuery): Promise<any>;
}
