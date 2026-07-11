import { SubmitForReviewCommand } from '../commands/SubmitForReviewCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
export declare class SubmitForReviewHandler {
    private readonly repository;
    constructor(repository: IArticleRepository);
    handle(command: SubmitForReviewCommand): Promise<void>;
}
