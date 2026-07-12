import { SearchRequestDto } from '@modules/search/interfaces/dto/SearchDTOs';

export class SearchQuery {
  constructor(public readonly request: SearchRequestDto) {}
}
