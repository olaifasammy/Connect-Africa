export type PaginationStrategy = 'offset' | 'cursor';

export interface OffsetPaginationRequest {
  strategy: 'offset';
  page: number;
  limit: number;
}

export interface CursorPaginationRequest {
  strategy: 'cursor';
  limit: number;
  cursor?: string;
}

export type PaginationRequest =
  | OffsetPaginationRequest
  | CursorPaginationRequest;

export interface OffsetPaginationMeta {
  strategy: 'offset';
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface CursorPaginationMeta {
  strategy: 'cursor';
  limit: number;
  nextCursor?: string;
  previousCursor?: string;
  hasNext: boolean;
  hasPrevious: boolean;
}

export type PaginationMeta =
  | OffsetPaginationMeta
  | CursorPaginationMeta;

export interface PaginatedResult<T> {
  items: T[];
  pagination: PaginationMeta;
}