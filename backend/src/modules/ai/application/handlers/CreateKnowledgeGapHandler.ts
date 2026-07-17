import { CreateKnowledgeGapCommand } from '../commands/CreateKnowledgeGapCommand';
import { IKnowledgeGapRepository } from '../../domain/repositories/IKnowledgeGapRepository';
import { KnowledgeGap } from '../../domain/entities/KnowledgeGap';

export class CreateKnowledgeGapHandler {
  constructor(private readonly repository: IKnowledgeGapRepository) {}
  async handle(command: CreateKnowledgeGapCommand): Promise<void> {
    const gap = new KnowledgeGap(Math.random().toString(), command.topic, command.prompt, 'OPEN', new Date());
    await this.repository.save(gap);
  }
}
