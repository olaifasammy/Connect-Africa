import { Entity } from '../../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { UserId, IPAddress, UserAgent } from '../value-objects/AuditValueObjects';
interface AuditActorProps {
    userId: UserId;
    actorType: string;
    ipAddress: IPAddress;
    userAgent: UserAgent;
}
export declare class AuditActor extends Entity<AuditActorProps> {
    private constructor();
    static create(props: AuditActorProps, id?: UniqueEntityId): AuditActor;
    get userId(): UserId;
    get actorType(): string;
    get ipAddress(): IPAddress;
    get userAgent(): UserAgent;
}
export {};
