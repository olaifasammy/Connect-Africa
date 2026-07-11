import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare enum MediaType {
    IMAGE = "IMAGE",
    DOCUMENT = "DOCUMENT",
    VIDEO = "VIDEO"
}
export interface MediaLinkProps {
    mediaId: UniqueEntityId;
    type: MediaType;
    caption?: string;
    isFeatured: boolean;
}
export declare class MediaLink {
    readonly props: MediaLinkProps;
    constructor(props: MediaLinkProps);
}
