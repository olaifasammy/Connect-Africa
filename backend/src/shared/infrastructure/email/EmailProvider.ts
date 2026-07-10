export interface EmailOptions {
  to: string;
  subject: string;
  body: string;
}

export abstract class EmailProvider {
  abstract send(options: EmailOptions): Promise<void>;
}
