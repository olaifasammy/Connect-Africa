export class ContextBuilder {
  build(contextData: Record<string, unknown>): string {
    return JSON.stringify(contextData);
  }
}
