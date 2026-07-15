import { IAuditLogger } from '../domain/interfaces/IAuditLogger';
export declare class AuditLogger implements IAuditLogger {
    static instance: IAuditLogger;
    log(data: {
        status: "SUCCESS" | "FAILURE";
        action: string;
        resource: string;
        user: string;
        ipAddress?: string;
    }): void;
    static log(data: {
        status: "SUCCESS" | "FAILURE";
        action: string;
        resource: string;
        user: string;
        ipAddress?: string;
    }): void;
}
