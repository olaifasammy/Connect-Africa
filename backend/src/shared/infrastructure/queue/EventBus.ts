export abstract class EventBus {
  abstract publish(event: any): Promise<void>;
  abstract subscribe(event: any, handler: (event: any) => Promise<void>): Promise<void>;
}
