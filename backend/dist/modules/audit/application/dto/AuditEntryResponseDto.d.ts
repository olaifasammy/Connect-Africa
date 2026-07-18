export interface AuditEntryResponseDto {
    id: string;
    correlationId: string;
    actor: {
        id: string;
        type: string;
    };
    resource: {
        id: string;
        type: string;
    };
    action: string;
    timestamp: string;
    metadata: {
        key: string;
        value: string;
    }[];
}
