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
    if (!props.eventName || typeof props.eventName !== 'string' || props.eventName.trim().length === 0) {
      throw new Error('SystemMetric eventName must be a non-empty string.');
    }
    if (!props.sourceContext || typeof props.sourceContext !== 'string' || props.sourceContext.trim().length === 0) {
      throw new Error('SystemMetric sourceContext must be a non-empty string.');
    }
    if (!props.metadata || typeof props.metadata !== 'object' || Array.isArray(props.metadata)) {
      throw new Error('SystemMetric metadata must be a valid object.');
    }

    return new SystemMetric(
      new UniqueEntityId(),
      props.eventName.trim(),
      props.sourceContext.trim(),
      new Date(),
      props.metadata
    );
  }

  static reconstitute(props: {
    id: UniqueEntityId;
    eventName: string;
    sourceContext: string;
    timestamp: Date;
    metadata: Record<string, any>;
  }): SystemMetric {
    return new SystemMetric(
      props.id,
      props.eventName,
      props.sourceContext,
      props.timestamp,
      props.metadata
    );
  }
}
