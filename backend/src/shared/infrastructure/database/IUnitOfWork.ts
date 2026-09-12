/**
 * Interface for the Unit of Work pattern.
 *
 * Executes a set of operations atomically within one database transaction.
 */
export interface IUnitOfWork {
  /**
   * Executes work within an atomic transaction.
   *
   * All transaction-aware repository/database operations executed
   * through the infrastructure during `work` participate in the
   * same transaction.
   *
   * @param work The operation to execute.
   * @returns The result produced by the operation.
   * @throws Error if the transaction fails.
   */
  execute<T>(work: () => Promise<T>): Promise<T>;
}
