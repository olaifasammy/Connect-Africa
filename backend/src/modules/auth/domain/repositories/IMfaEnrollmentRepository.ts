import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export interface IMfaEnrollmentRepository {
  save(
    userId: UniqueEntityId,
    secret: string,
  ): Promise<void>;

  get(
    userId: UniqueEntityId,
  ): Promise<string | null>;

  remove(
    userId: UniqueEntityId,
  ): Promise<void>;
}
