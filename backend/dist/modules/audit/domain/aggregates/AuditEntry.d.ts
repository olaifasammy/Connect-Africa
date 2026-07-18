import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import { AuditId, CorrelationId, Timestamp } from '../value-objects/AuditValueObjects';
import { AuditActor } from '../entities/AuditActor';
import { AuditResource } from '../entities/AuditResource';
import { AuditMetadata } from '../entities/AuditMetadata';
interface AuditEntryProps {
    action: string;
    actor: AuditActor;
    resource: AuditResource;
    metadata: AuditMetadata[];
    correlationId: CorrelationId;
    timestamp: Timestamp;
}
export declare class AuditEntry extends AggregateRoot<AuditEntryProps> {
    private constructor();
    static create(props: AuditEntryProps, id?: AuditId): AuditEntry;
    get action(): string;
    get actor(): AuditActor;
    get resource(): AuditResource;
    get metadata(): AuditMetadata[];
    get correlationId(): CorrelationId;
    get timestamp(): Timestamp;
}
export {};
