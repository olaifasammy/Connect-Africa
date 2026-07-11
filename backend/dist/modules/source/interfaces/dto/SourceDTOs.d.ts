export interface CreateSourceRequest {
    title: string;
    type: string;
    author: string;
    publishedAt: string;
    url?: string;
    publisher?: string;
}
export interface UpdateSourceRequest {
    title?: string;
    provenance?: any;
}
export interface SourceResponse {
    id: string;
    title: string;
    type: string;
    author: string;
    publishedAt: string;
    url?: string;
    publisher?: string;
    createdAt: string;
}
