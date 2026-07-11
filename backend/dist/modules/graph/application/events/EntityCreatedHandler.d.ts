import { EntityCreatedEvent } from '../../../entity/domain/events/EntityCreatedEvent';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
export declare class EntityCreatedHandler {
    private readonly repository;
    constructor(repository: IGraphRepository);
    handle(event: EntityCreatedEvent): Promise<void>;
}
