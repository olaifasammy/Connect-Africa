export interface ITotpProvider {
    generateSecret(): string;
    generateUrl(secret: string, email: string): string;
    verifyCode(secret: string, code: string): boolean;
}
