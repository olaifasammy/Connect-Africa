import { MediaSearchDto } from '../dtos/MediaSearchDto';

export class SearchMediaQuery {
  constructor(public readonly data: MediaSearchDto) {}
}
