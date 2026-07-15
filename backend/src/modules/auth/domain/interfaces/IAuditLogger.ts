export interface IAuditLogger {
  log(data: { status: "SUCCESS" | "FAILURE"; action: string; resource: string; user: string; ipAddress?: string }): void;
}
