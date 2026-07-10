export abstract class AIProvider {
  abstract generate(prompt: string): Promise<string>;
}
