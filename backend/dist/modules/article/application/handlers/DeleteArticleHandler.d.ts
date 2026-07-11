import { DeleteArticleCommand } from '../commands/DeleteArticleCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
export declare class DeleteArticleHandler {
    private readonly repository;
    constructor(repository: IArticleRepository);
    handle(command: DeleteArticleCommand): Promise<void>;
}
