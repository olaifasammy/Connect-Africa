import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { AttachMediaCommand } from '../commands/AttachMediaCommand';
import { MediaPermissionService } from '../services/MediaPermissionService';
export declare class AttachMediaHandler {
    private readonly mediaRepository;
    private readonly permissionService;
    constructor(mediaRepository: IMediaRepository, permissionService: MediaPermissionService);
    handle(command: AttachMediaCommand): Promise<void>;
}
