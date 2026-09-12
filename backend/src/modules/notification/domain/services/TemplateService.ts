import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { TemplateId } from '../value-objects/NotificationValueObjects';
import { NotificationTemplate } from '../entities/NotificationEntities';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';

@provide(TemplateService, true)
@injectable()
export class TemplateService {
  constructor(@inject('PostgresProvider') private readonly db: PostgresProvider) {}

  async getTemplate(id: TemplateId): Promise<NotificationTemplate | null> {
    const result = await this.db.query(
      'SELECT id, name, content FROM notification_templates WHERE id = $1 LIMIT 1',
      [id.value]
    );

    if (result.rows.length === 0) {
      return new NotificationTemplate(id, 'Default Template', 'Hello, you have a new notification regarding {{title}}.');
    }

    const row = result.rows[0];
    return new NotificationTemplate(
      new TemplateId(row.id),
      row.name,
      row.content
    );
  }

  render(template: NotificationTemplate, data: Record<string, string>): string {
    let content = template.content;
    for (const [key, value] of Object.entries(data)) {
      content = content.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), value);
    }
    return content;
  }
}
