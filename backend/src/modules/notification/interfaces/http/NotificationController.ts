import { Request, Response } from 'express';
import { SendNotificationCommand } from '../../application/commands/SendNotificationCommand';

export class NotificationController {
  async send(req: Request, res: Response): Promise<void> {
    const { recipientId, templateId, channel } = req.body;
    const command = new SendNotificationCommand(recipientId, templateId, channel);
    // Call application service
    res.status(200).json({ success: true, data: { id: '123', status: 'PENDING' } });
  }
}
