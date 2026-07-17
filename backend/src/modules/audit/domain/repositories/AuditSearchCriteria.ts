export interface AuditSearchCriteria {
  userId?: string;
  action?: string;
  resourceId?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}
