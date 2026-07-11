import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class SourceId extends UniqueEntityId {
}
export declare enum SourceType {
    WEB = "WEB",
    BOOK = "BOOK",
    ACADEMIC_PAPER = "ACADEMIC_PAPER",
    INTERVIEW = "INTERVIEW",
    OTHER = "OTHER"
}
export declare class Provenance {
    readonly author: string;
    readonly publishedAt: Date;
    readonly url?: string | undefined;
    readonly publisher?: string | undefined;
    constructor(author: string, publishedAt: Date, url?: string | undefined, publisher?: string | undefined);
}
