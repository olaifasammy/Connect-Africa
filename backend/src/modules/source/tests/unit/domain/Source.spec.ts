import { Source } from '@modules/source/domain/entities/Source';
import { SourceId, SourceType, Provenance } from '@modules/source/domain/value-objects/SourceValueObjects';

describe('Source Aggregate', () => {
  it('should create a new source', () => {
    const props = {
      title: 'Test Source',
      type: SourceType.WEB,
      provenance: new Provenance('Author', new Date()),
      createdAt: new Date(),
    };
    const source = Source.create(props);
    expect(source.title).toBe('Test Source');
    expect(source.type).toBe(SourceType.WEB);
  });
});
