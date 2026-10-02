import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { GetEntitySchemaQuery } from '../queries/GetEntitySchemaQuery';

@provide(GetEntitySchemaQueryHandler, true)
@injectable()
export class GetEntitySchemaQueryHandler {
  async handle(query: GetEntitySchemaQuery): Promise<Record<string, unknown>> {
    return {
      fields: [
        { name: 'name', label: 'Name', type: 'text', required: true, maxLength: 255 },
        { name: 'type', label: 'Type', type: 'select', required: true, maxLength: 255, options: ['Person', 'Place', 'Organization', 'Work', 'Concept', 'Event'] },
        { name: 'description', label: 'Description', type: 'textarea', required: false, maxLength: 2000 },
        { name: 'source', label: 'Source', type: 'text', required: false, maxLength: 255 },
        { name: 'tags', label: 'Tags', type: 'tags', required: false, maxLength: 100 },
        { name: 'attributes', label: 'Attributes', type: 'json', required: false },
      ],
    };
  }
}
