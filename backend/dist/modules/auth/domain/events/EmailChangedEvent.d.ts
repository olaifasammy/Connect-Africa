import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class EmailChangedEvent extends DomainEvent {
    readonly userId: UniqueEntityId;
    readonly newEmail: string;
    constructor(userId: UniqueEntityId, newEmail: string);
}
