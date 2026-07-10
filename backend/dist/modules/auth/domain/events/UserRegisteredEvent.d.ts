import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class UserRegisteredEvent extends DomainEvent {
    readonly userId: UniqueEntityId;
    readonly email: string;
    constructor(userId: UniqueEntityId, email: string);
}
