import { EntityUpdatedEvent } from '../../../entity/domain/events/EntityUpdatedEvent';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
export declare class EntityUpdatedHandler {
    private readonly repository;
    constructor(repository: IGraphRepository);
    handle(event: EntityUpdatedEvent): Promise<void>;
}
