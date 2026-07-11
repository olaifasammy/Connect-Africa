import { UpdateArticleCommand } from '../commands/UpdateArticleCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
export declare class UpdateArticleHandler {
    private readonly repository;
    constructor(repository: IArticleRepository);
    handle(command: UpdateArticleCommand): Promise<void>;
}
