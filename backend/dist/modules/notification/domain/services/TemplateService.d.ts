import { TemplateId } from '../value-objects/NotificationValueObjects';
import { NotificationTemplate } from '../entities/NotificationEntities';
export declare class TemplateService {
    getTemplate(id: TemplateId): Promise<NotificationTemplate | null>;
}
