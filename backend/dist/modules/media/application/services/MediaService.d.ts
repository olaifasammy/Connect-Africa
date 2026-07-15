import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { Media } from '../../domain/models/Media';
export declare class MediaService {
    private readonly mediaRepository;
    constructor(mediaRepository: IMediaRepository);
    getMedia(id: string): Promise<Media | null>;
}
