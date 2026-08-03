export interface IOntologyService {
  validateRelationshipType(typeId: string, sourceEntityTypeId: string, targetEntityTypeId: string): Promise<void>;
}

export interface IEventBus {
  publish(event: any): Promise<void>;
}
