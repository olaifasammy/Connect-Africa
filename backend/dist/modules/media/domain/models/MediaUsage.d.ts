import { Entity } from '../../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
interface MediaUsageProps {
    mediaId: UniqueEntityId;
    resourceType: string;
    resourceId: UniqueEntityId;
    usedAt: Date;
}
export declare class MediaUsage extends Entity<MediaUsageProps> {
    static create(props: MediaUsageProps, id?: UniqueEntityId): MediaUsage;
    get mediaId(): UniqueEntityId;
    get resourceType(): string;
    get resourceId(): UniqueEntityId;
    get usedAt(): Date;
}
export {};
