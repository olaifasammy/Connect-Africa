import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { GetMediaUsageQuery } from './GetMediaUsageQuery';
import { MediaUsageDto } from '../dtos/MediaUsageDto';
export declare class GetMediaUsageHandler {
    private readonly mediaRepository;
    constructor(mediaRepository: IMediaRepository);
    handle(query: GetMediaUsageQuery): Promise<MediaUsageDto[]>;
}
