import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { GetMediaByEntityQuery } from './GetMediaByEntityQuery';
import { MediaResponseDto } from '../dtos/MediaResponseDto';
export declare class GetMediaByEntityHandler {
    private readonly mediaRepository;
    constructor(mediaRepository: IMediaRepository);
    handle(query: GetMediaByEntityQuery): Promise<MediaResponseDto[]>;
}
