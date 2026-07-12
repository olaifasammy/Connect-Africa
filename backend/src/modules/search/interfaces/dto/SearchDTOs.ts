export interface SearchRequestDto {
  query: string;
  page?: number;
  limit?: number;
  filters?: Record<string, any>;
  sortBy?: 'relevance' | 'alphabetical' | 'dateCreated' | 'dateUpdated' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResultDto {
  id: string;
  title: string;
  resourceType: string;
  snippet: string;
  score: number;
}

export interface SearchResponseDto {
  results: SearchResultDto[];
  total: number;
  page: number;
  limit: number;
}
