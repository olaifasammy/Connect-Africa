export interface INotificationRepository {
  save(notification: any): Promise<void>;
  findById(id: string): Promise<any>;
}
