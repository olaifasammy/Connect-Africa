export interface ArticleSeoProps {
  metaTitle?: string;
  metaDescription?: string;
  openGraphMetadata?: Record<string, string>;
  canonicalUrl?: string;
}

export class ArticleSeo {
  constructor(public readonly props: ArticleSeoProps) {}
}
