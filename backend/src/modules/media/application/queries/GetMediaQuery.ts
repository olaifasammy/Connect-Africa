import { MediaId } from '../../domain/value-objects/MediaId';

export class GetMediaQuery {
  constructor(public readonly id: MediaId) {}
}
