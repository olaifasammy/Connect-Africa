import { ExpansionRequestService } from '../../../ai/public';
import { Media } from '../../domain/models/Media';
export declare class MediaAIService {
    private readonly aiGateway;
    constructor(aiGateway: ExpansionRequestService);
    processMedia(media: Media): Promise<void>;
}
