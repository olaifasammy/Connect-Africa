import { AIProvider } from '@shared/infrastructure/ai/AIProvider';
import { Media } from '../../domain/models/Media';

export class MediaAIService {
  constructor(private readonly aiProvider: AIProvider) {}

  async processMedia(media: Media): Promise<void> {
    // TODO: Implement AI features (Captioning, OCR, Detection, Moderation, Tagging)
    // Dependency: Await implementation of the AI Bounded Context.
    await this.aiProvider.analyze(media.filePath);
  }
}
