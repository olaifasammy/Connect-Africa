import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'search-service' },
  transports: [
    new winston.transports.Console()
  ]
});

export class SearchLogger {
  static logFailedIndexing(docId: string, error: Error): void {
    logger.error('Failed indexing document', { docId, error: error.message, stack: error.stack });
  }

  static logFailedSearch(query: string, error: Error): void {
    logger.error('Failed executing search query', { query, error: error.message, stack: error.stack });
  }

  static logPerformance(operation: string, durationMs: number): void {
    logger.info('Search operation performance', { operation, durationMs });
    if (durationMs > 1000) {
      logger.warn('Slow search query detected', { operation, durationMs });
    }
  }
}
