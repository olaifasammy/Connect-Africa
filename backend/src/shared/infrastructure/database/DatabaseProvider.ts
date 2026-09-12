/**
 * Abstract provider for database connectivity.
 * Ensures all database implementations support lifecycle management and health checks.
 */
export abstract class DatabaseProvider {
  /**
   * Establishes a connection to the database.
   */
  abstract connect(): Promise<void>;

  /**
   * Closes the connection to the database.
   */
  abstract disconnect(): Promise<void>;

  /**
   * Performs a health check on the database connection.
   * @returns Promise<boolean> True if the connection is healthy, false otherwise.
   */
  abstract healthCheck(): Promise<boolean>;
}
