export interface IAuditLogger {
  log(action: string, metadata: Record<string, any>): Promise<void>;
}
