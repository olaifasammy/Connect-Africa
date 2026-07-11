import { ArticleUpdatedEvent } from '../../../article/domain/events/ArticleUpdatedEvent';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
export declare class ArticleUpdatedHandler {
    private readonly repository;
    constructor(repository: IGraphRepository);
    handle(event: ArticleUpdatedEvent): Promise<void>;
}
