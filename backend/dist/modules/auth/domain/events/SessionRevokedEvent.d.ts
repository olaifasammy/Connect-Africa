import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class SessionRevokedEvent extends DomainEvent {
    readonly userId: UniqueEntityId;
    readonly sessionId: string;
    constructor(userId: UniqueEntityId, sessionId: string);
}
