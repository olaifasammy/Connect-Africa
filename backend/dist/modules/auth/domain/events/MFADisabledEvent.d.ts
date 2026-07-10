import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class MFADisabledEvent extends DomainEvent {
    readonly userId: UniqueEntityId;
    constructor(userId: UniqueEntityId);
}
