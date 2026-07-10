import { IQueryHandler } from '../../../../../shared/application/handlers/IQueryHandler';
import { GetProfileQuery } from '../../../../auth/application/queries/GetProfileQuery';
import { IUserProfileRepository } from '../../../../auth/domain/repositories/IUserProfileRepository';
export declare class GetProfileQueryHandler implements IQueryHandler<GetProfileQuery, any> {
    private profileRepository;
    constructor(profileRepository: IUserProfileRepository);
    handle(query: GetProfileQuery): Promise<any>;
}
