export interface AddBookmarkRequest {
  articleId: string;
}

export interface AddToReadingHistoryRequest {
  articleId: string;
}

export interface UpdateReadingProgressRequest {
  articleId: string;
  progress: number;
}

export interface ArticleResponse {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  authorId: string;
  status: string;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleSummaryResponse {
  id: string;
  title: string;
  slug: string;
  summary: string;
  authorId: string;
  status: string;
}
