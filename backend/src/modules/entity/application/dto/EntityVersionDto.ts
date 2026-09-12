export interface EntityVersionDto {
  versionId: string;
  entityId: string;
  versionNumber: number;
  name: string;
  type: string;
  slug: string;
  description?: string;
  source?: string;
  tags: string[];
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  createdAt: Date;
}