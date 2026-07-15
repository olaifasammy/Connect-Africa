import { AIProvider } from '../../../../shared/infrastructure/ai/AIProvider';
import { Media } from '../../domain/models/Media';
export declare class MediaAIService {
    private readonly aiProvider;
    constructor(aiProvider: AIProvider);
    processMedia(media: Media): Promise<void>;
}
