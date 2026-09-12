export interface EntityResponse {
  id: string;
  name: string;
  type: string;
  slug: string;
  description?: string;
  source?: string;
  tags: string[];
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  createdAt: Date;
  updatedAt: Date;
}