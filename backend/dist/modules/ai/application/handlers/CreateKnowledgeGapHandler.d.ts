import { CreateKnowledgeGapCommand } from '../commands/CreateKnowledgeGapCommand';
import { IKnowledgeGapRepository } from '../../domain/repositories/IKnowledgeGapRepository';
export declare class CreateKnowledgeGapHandler {
    private readonly repository;
    constructor(repository: IKnowledgeGapRepository);
    handle(command: CreateKnowledgeGapCommand): Promise<void>;
}
