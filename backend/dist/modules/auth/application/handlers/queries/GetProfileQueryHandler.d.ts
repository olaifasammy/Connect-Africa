import { IQueryHandler } from '../../../../../shared/application/handlers/IQueryHandler';
import { GetProfileQuery } from '../../../../auth/application/queries/GetProfileQuery';
import { IUserProfileRepository } from '../../../../auth/domain/repositories/IUserProfileRepository';
import { EventBus } from '../../../../../shared/infrastructure/queue/EventBus';
export declare class GetProfileQueryHandler implements IQueryHandler<GetProfileQuery, any> {
    private profileRepository;
    private eventBus;
    constructor(profileRepository: IUserProfileRepository, eventBus: EventBus);
    handle(query: GetProfileQuery): Promise<any>;
}
