import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export enum MediaType {
  IMAGE = 'IMAGE',
  DOCUMENT = 'DOCUMENT',
  VIDEO = 'VIDEO',
}

export interface MediaLinkProps {
  mediaId: UniqueEntityId;
  type: MediaType;
  caption?: string;
  isFeatured: boolean;
}

export class MediaLink {
  constructor(public readonly props: MediaLinkProps) {}
}
