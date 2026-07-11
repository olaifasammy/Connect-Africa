export interface ArticleSeoProps {
    metaTitle?: string;
    metaDescription?: string;
    openGraphMetadata?: Record<string, string>;
    canonicalUrl?: string;
}
export declare class ArticleSeo {
    readonly props: ArticleSeoProps;
    constructor(props: ArticleSeoProps);
}
