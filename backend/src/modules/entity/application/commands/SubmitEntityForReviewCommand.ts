export class SubmitEntityForReviewCommand {
  constructor(
    public readonly entityId: string,
    public readonly userId: string
  ) {}
}
