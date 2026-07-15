export declare class SearchSecurityHelper {
    static sanitizeInput(query: string): string;
    static enforceRbac(userRoles: string[], requiredRoles: string[]): boolean;
}
