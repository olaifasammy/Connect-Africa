import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class SystemMetric {
  private constructor(
    public readonly id: UniqueEntityId,
    public readonly eventName: string,
    public readonly sourceContext: string,
    public readonly timestamp: Date,
    public readonly metadata: Record<string, any>
  ) {}

  static create(props: {
    eventName: string;
    sourceContext: string;
    metadata: Record<string, any>;
  }): SystemMetric {
    return new SystemMetric(
      new UniqueEntityId(),
      props.eventName,
      props.sourceContext,
      new Date(),
      props.metadata
    );
  }
}
