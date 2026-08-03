import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { AttachMediaCommand } from '../commands/AttachMediaCommand';
import { MediaId } from '../../domain/value-objects/MediaId';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { AuditLogger } from '@shared/infrastructure/logging/AuditLogger';
import { MediaPermissionService } from '../services/MediaPermissionService';

export class AttachMediaHandler {
  constructor(
    private readonly mediaRepository: IMediaRepository,
    private readonly permissionService: MediaPermissionService
  ) {}

  async handle(command: AttachMediaCommand): Promise<void> {
    const { mediaId, resourceType, resourceId } = command.data;
    const mediaEntityId = new UniqueEntityId(mediaId);
    
    // 1. Validate Permission
    const hasPermission = await this.permissionService.canAccess(new UniqueEntityId('system'), mediaEntityId);
    if (!hasPermission) {
      throw new Error('Unauthorized');
    }

    // 2. Attach
    await this.mediaRepository.attach(
      new MediaId(mediaId),
      resourceType,
      new UniqueEntityId(resourceId)
    );

    // 3. Audit
    AuditLogger.log({
      user: 'system',
      action: 'ATTACH_MEDIA',
      resource: mediaId,
      status: 'SUCCESS',
    });
  }
}
