import { IQuery } from '@shared/application/queries/IQuery';

export class GetRelationshipQuery implements IQuery {
  constructor(public readonly id: string) {}
}

export class ListRelationshipsQuery implements IQuery {
  constructor(
    public readonly limit: number,
    public readonly offset: number
  ) {}
}

export class GetRelationshipsForEntityQuery implements IQuery {
  constructor(public readonly entityId: string) {}
}

export class GetIncomingRelationshipsQuery implements IQuery {
  constructor(public readonly targetEntityId: string) {}
}

export class GetOutgoingRelationshipsQuery implements IQuery {
  constructor(public readonly sourceEntityId: string) {}
}

export class SearchRelationshipsQuery implements IQuery {
  constructor(public readonly query: string) {}
}

export class GetRelationshipVersionQuery implements IQuery {
  constructor(
    public readonly relationshipId: string,
    public readonly versionNumber: number
  ) {}
}
