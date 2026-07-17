import { RecordAuditRequest } from '../dto/RecordAuditDto';

export class RecordAuditCommand {
  constructor(public readonly data: RecordAuditRequest) {}
}
