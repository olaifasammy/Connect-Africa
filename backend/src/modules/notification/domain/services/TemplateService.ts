import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { TemplateId } from '../value-objects/NotificationValueObjects';
import { NotificationTemplate } from '../entities/NotificationEntities';

@provide(TemplateService, true)
@injectable()
export class TemplateService {
  async getTemplate(id: TemplateId): Promise<NotificationTemplate | null> {
    // Template retrieval
    return null;
  }
}
