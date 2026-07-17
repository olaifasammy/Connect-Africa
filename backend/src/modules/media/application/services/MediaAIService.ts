import { ExpansionRequestService } from '@modules/ai/public';
import { Media } from '../../domain/models/Media';

export class MediaAIService {
  constructor(private readonly aiGateway: ExpansionRequestService) {}

  async processMedia(media: Media): Promise<void> {
    // Utilize AI Bounded Context via Gateway/Service
    const description = await this.aiGateway.requestExpansion(`Describe this media: ${media.filePath}`);
    console.log(`[MEDIA_AI] Processed media ${media.id}: ${description}`);
  }
}
