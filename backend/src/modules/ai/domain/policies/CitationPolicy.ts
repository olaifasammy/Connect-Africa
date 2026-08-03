export interface ICitationPolicy {
  isRequired(): boolean;
}

export class CitationPolicy implements ICitationPolicy {
  isRequired(): boolean {
    return true;
  }
}
