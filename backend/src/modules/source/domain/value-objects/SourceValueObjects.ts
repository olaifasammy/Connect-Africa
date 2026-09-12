import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class SourceId extends UniqueEntityId {}

export enum SourceType {
  WEB = 'WEB',
  BOOK = 'BOOK',
  ACADEMIC_PAPER = 'ACADEMIC_PAPER',
  INTERVIEW = 'INTERVIEW',
  OTHER = 'OTHER'
}

export class Provenance {
  constructor(
    public readonly author: string,
    public readonly publishedAt: Date,
    public readonly url?: string,
    public readonly publisher?: string
  ) {}
}
