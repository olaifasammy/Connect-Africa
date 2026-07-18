import { Entity } from '../../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { ResourceId } from '../value-objects/AuditValueObjects';
interface AuditResourceProps {
    id: ResourceId;
    type: string;
}
export declare class AuditResource extends Entity<AuditResourceProps> {
    private constructor();
    static create(props: AuditResourceProps, id?: UniqueEntityId): AuditResource;
    get resourceId(): ResourceId;
    get type(): string;
}
export {};
