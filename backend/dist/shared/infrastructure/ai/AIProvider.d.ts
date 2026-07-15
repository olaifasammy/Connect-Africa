export declare abstract class AIProvider {
    abstract generate(prompt: string): Promise<string>;
    abstract analyze(input: any): Promise<any>;
}
