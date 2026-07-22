export interface IGraphContextRetrievalService {
  getContext(entityId: string): Promise<any>;
}
