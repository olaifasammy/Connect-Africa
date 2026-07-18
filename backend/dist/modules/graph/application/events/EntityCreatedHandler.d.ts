import { EntityCreatedEvent } from '../../../entity/public';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
export declare class EntityCreatedHandler {
    private readonly repository;
    constructor(repository: IGraphRepository);
    handle(event: EntityCreatedEvent): Promise<void>;
}
