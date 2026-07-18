import { DomainEvent } from '../../../../shared/domain/DomainEvent';
export interface AuditLogRequestedEventPayload {
    action: string;
    actorId: string;
    actorType: string;
    ipAddress: string;
    userAgent: string;
    resourceId: string;
    resourceType: string;
    metadata: {
        key: string;
        value: string;
    }[];
}
export declare class AuditLogRequestedEvent extends DomainEvent {
    readonly payload: AuditLogRequestedEventPayload;
    constructor(payload: AuditLogRequestedEventPayload);
}
