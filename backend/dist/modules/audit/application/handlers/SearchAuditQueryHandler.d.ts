import { SearchAuditQuery } from '../queries/SearchAuditQuery';
import { AuditSearchService } from '../../domain/services/AuditSearchService';
import { AuditEntryResponseDto } from '../dto/AuditEntryResponseDto';
export declare class SearchAuditQueryHandler {
    private readonly auditSearchService;
    constructor(auditSearchService: AuditSearchService);
    execute(query: SearchAuditQuery): Promise<AuditEntryResponseDto[]>;
}
