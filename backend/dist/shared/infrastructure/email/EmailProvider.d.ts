export interface EmailOptions {
    to: string;
    subject: string;
    body: string;
}
export declare abstract class EmailProvider {
    abstract send(options: EmailOptions): Promise<void>;
}
