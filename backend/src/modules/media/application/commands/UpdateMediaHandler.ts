import { inject } from 'inversify';
import { IMediaRepository } from '../../domain/repositories/IMediaRepository';
import { UpdateMediaCommand } from '../commands/UpdateMediaCommand';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { AuditLogRequestedEvent } from '@modules/audit/public';

export class UpdateMediaHandler {
  constructor(
    @inject('IMediaRepository') private readonly mediaRepository: IMediaRepository,
    @inject('EventBus') private readonly eventBus: EventBus
  ) {}

  async handle(command: UpdateMediaCommand): Promise<void> {
    const mediaId = new UniqueEntityId(command.data.id);
    try {
      const media = await this.mediaRepository.findById(mediaId);
      if (!media) {
        throw new Error('Media not found');
      }
      
      const previousState = media.getProps();
      media.update(command.data);
      const newState = media.getProps();
      
      await this.mediaRepository.save(media);
      
      await this.eventBus.publish(new AuditLogRequestedEvent({
        action: 'UPDATE_MEDIA',
        actorId: command.userId,
        actorType: 'USER',
        ipAddress: '127.0.0.1',
        userAgent: 'unknown',
        resourceId: media.id.toString(),
        resourceType: 'MEDIA',
        previousState: previousState,
        newState: newState,
        metadata: [{ key: 'status', value: 'SUCCESS' }]
      }));
    } catch (error) {
      await this.eventBus.publish(new AuditLogRequestedEvent({
        action: 'UPDATE_MEDIA',
        actorId: command.userId,
        actorType: 'USER',
        ipAddress: '127.0.0.1',
        userAgent: 'unknown',
        resourceId: command.data.id,
        resourceType: 'MEDIA',
        metadata: [{ key: 'status', value: 'FAILURE' }]
      }));
      throw error;
    }
  }
}
