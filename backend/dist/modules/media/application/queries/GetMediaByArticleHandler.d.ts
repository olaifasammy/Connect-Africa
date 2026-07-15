import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { GetMediaByArticleQuery } from './GetMediaByArticleQuery';
import { MediaResponseDto } from '../dtos/MediaResponseDto';
export declare class GetMediaByArticleHandler {
    private readonly mediaRepository;
    constructor(mediaRepository: IMediaRepository);
    handle(query: GetMediaByArticleQuery): Promise<MediaResponseDto[]>;
}
