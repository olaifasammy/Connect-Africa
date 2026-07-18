import { ArticleUpdatedEvent } from '../../../article/public';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
export declare class ArticleUpdatedHandler {
    private readonly repository;
    constructor(repository: IGraphRepository);
    handle(event: ArticleUpdatedEvent): Promise<void>;
}
