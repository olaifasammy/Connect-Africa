import { MediaId } from '../../domain/value-objects/MediaId';

export class GetMediaUsageQuery {
  constructor(public readonly mediaId: MediaId) {}
}
