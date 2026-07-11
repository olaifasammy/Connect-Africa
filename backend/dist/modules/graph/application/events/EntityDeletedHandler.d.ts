import { EntityDeletedEvent } from '../../../entity/domain/events/EntityDeletedEvent';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
export declare class EntityDeletedHandler {
    private readonly repository;
    constructor(repository: IGraphRepository);
    handle(event: EntityDeletedEvent): Promise<void>;
}
