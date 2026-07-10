/**
 * Interface for Unit of Work pattern.
 * Manages atomic operations across repositories.
 */
export interface IUnitOfWork {
  /**
   * Executes a unit of work within an atomic transaction.
   * @param work The function containing repository operations.
   * @returns Promise<T> The result of the unit of work.
   * @throws Error if the transaction fails.
   */
  execute<T>(work: () => Promise<T>): Promise<T>;
}
