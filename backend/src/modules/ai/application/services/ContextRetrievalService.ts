export class ContextRetrievalService {
  async retrieve(content: string): Promise<string> {
    return `Context for ${content}`;
  }
}
