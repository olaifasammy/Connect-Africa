import { IQueryHandler } from '../../../../../shared/application/handlers/IQueryHandler';
import { GetCurrentUserQuery } from '../../../../auth/application/queries/GetCurrentUserQuery';
import { IUserRepository } from '../../../../auth/domain/repositories/UserRepository';
export declare class GetCurrentUserQueryHandler implements IQueryHandler<GetCurrentUserQuery, any> {
    private userRepository;
    constructor(userRepository: IUserRepository);
    handle(query: GetCurrentUserQuery): Promise<any>;
}
