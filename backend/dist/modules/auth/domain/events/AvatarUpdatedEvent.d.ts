import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class AvatarUpdatedEvent extends DomainEvent {
    readonly userId: UniqueEntityId;
    readonly avatarUrl: string;
    constructor(userId: UniqueEntityId, avatarUrl: string);
}
