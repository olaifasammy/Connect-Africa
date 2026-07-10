import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class UserLoggedOutEvent extends DomainEvent {
    readonly userId: UniqueEntityId;
    constructor(userId: UniqueEntityId);
}
