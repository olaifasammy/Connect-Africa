import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { GetMediaQuery } from '../queries/GetMediaQuery';
import { MediaResponseDto } from '../dtos/MediaResponseDto';
export declare class GetMediaHandler {
    private readonly mediaRepository;
    constructor(mediaRepository: IMediaRepository);
    handle(query: GetMediaQuery): Promise<MediaResponseDto | null>;
}
