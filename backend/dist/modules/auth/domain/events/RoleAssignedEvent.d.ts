import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class RoleAssignedEvent extends DomainEvent {
    readonly userId: UniqueEntityId;
    readonly roleId: string;
    constructor(userId: UniqueEntityId, roleId: string);
}
