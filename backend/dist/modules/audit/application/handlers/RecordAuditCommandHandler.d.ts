import { RecordAuditCommand } from '../commands/RecordAuditCommand';
import { AuditRecordingService } from '../../domain/services/AuditRecordingService';
export declare class RecordAuditCommandHandler {
    private readonly auditRecordingService;
    constructor(auditRecordingService: AuditRecordingService);
    execute(command: RecordAuditCommand): Promise<void>;
}
