import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { SearchMediaQuery } from '../queries/SearchMediaQuery';
import { MediaResponseDto } from '../dtos/MediaResponseDto';
export declare class SearchMediaHandler {
    private readonly mediaRepository;
    constructor(mediaRepository: IMediaRepository);
    handle(query: SearchMediaQuery): Promise<MediaResponseDto[]>;
}
