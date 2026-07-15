import { ValueObject } from '../../../../shared/domain/ValueObject';
export declare enum MediaStatusType {
    PENDING = "pending",
    PROCESSING = "processing",
    READY = "ready",
    FAILED = "failed",
    PUBLISHED = "published",
    ARCHIVED = "archived"
}
interface MediaStatusProps {
    value: MediaStatusType;
}
export declare class MediaStatus extends ValueObject<MediaStatusProps> {
    private constructor();
    static create(value: MediaStatusType): MediaStatus;
    static fromString(value: string): MediaStatus;
    get value(): MediaStatusType;
}
export {};
