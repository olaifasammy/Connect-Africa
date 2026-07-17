import { TemplateId } from '../value-objects/NotificationValueObjects';
import { NotificationTemplate } from '../entities/NotificationEntities';

export class TemplateService {
  async getTemplate(id: TemplateId): Promise<NotificationTemplate | null> {
    // Template retrieval
    return null;
  }
}
