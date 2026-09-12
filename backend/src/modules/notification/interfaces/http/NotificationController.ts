import { provide } from 'inversify-binding-decorators';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { SendNotificationHandler } from '../../application/handlers/SendNotificationHandler';
import { MarkAsReadCommandHandler } from '../../application/handlers/MarkAsReadCommandHandler';
import { DeleteNotificationCommandHandler } from '../../application/handlers/DeleteNotificationCommandHandler';
import { GetInboxQueryHandler } from '../../application/handlers/GetInboxQueryHandler';
import { ChannelType } from '../../domain/value-objects/NotificationValueObjects';

@provide(NotificationController, true)
@injectable()
export class NotificationController {
  constructor(
    @inject(SendNotificationHandler) private readonly sendNotificationHandler: SendNotificationHandler,
    @inject(MarkAsReadCommandHandler) private readonly markAsReadCommandHandler: MarkAsReadCommandHandler,
    @inject(DeleteNotificationCommandHandler) private readonly deleteNotificationCommandHandler: DeleteNotificationCommandHandler,
    @inject(GetInboxQueryHandler) private readonly getInboxQueryHandler: GetInboxQueryHandler
  ) {}

  async send(req: Request, res: Response): Promise<void> {
    const { recipientId, templateId, channel } = req.body;
    
    // Validate channel
    if (!(<any>Object).values(ChannelType).includes(channel)) {
        res.status(400).json({ success: false, message: 'Invalid channel' });
        return;
    }

    const notificationId = await this.sendNotificationHandler.handle({
        recipientId,
        templateId,
        channel: channel as ChannelType
    });
    
    res.status(200).json({ success: true, data: { id: notificationId, status: 'PENDING' } });
  }

  async getInbox(req: Request, res: Response): Promise<void> {
    const userId = req.user!.id.toString(); // Assuming authenticated user ID is available
    const inbox = await this.getInboxQueryHandler.handle(userId);
    res.status(200).json({ success: true, data: inbox });
  }

  async markAsRead(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string;
    await this.markAsReadCommandHandler.handle(id);
    res.status(200).json({ success: true, message: 'Notification marked as read' });
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string;
    await this.deleteNotificationCommandHandler.handle(id);
    res.status(200).json({ success: true, message: 'Notification deleted' });
  }
}
