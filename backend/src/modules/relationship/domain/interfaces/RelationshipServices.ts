export interface IOntologyService {
  validateRelationshipType(typeId: string): Promise<void>;
}

export interface IEventBus {
  publish(event: any): Promise<void>;
}

export interface IAuditLogger {
  log(action: string, metadata: Record<string, any>): Promise<void>;
}
