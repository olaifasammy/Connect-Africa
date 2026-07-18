import { Entity } from '../../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
interface AuditMetadataProps {
    key: string;
    value: string;
}
export declare class AuditMetadata extends Entity<AuditMetadataProps> {
    private constructor();
    static create(props: AuditMetadataProps, id?: UniqueEntityId): AuditMetadata;
    get key(): string;
    get value(): string;
}
export {};
