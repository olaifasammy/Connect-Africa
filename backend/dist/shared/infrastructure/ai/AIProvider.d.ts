export declare abstract class AIProvider {
    abstract generate(prompt: string): Promise<string>;
}
