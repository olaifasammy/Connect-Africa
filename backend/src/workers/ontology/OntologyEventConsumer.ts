import { Worker, Job } from 'bullmq';
import { appConfig } from '@config/app';
import { logger } from '../../shared/logger/Logger';

export class OntologyEventConsumer {
  private worker: Worker;

  constructor() {
    this.worker = new Worker('domain-events', async (job: Job) => {
      await this.process(job);
    }, {
      connection: {
        host: appConfig.redisHost,
        port: appConfig.redisPort,
      },
    });
  }

  private async process(job: Job): Promise<void> {
    if (job.name === 'OntologyCreatedEvent') {
      logger.info('Processing OntologyCreatedEvent', { data: job.data });
      // Implement specific logic for ontology creation event (e.g., notification, indexing)
    }
  }
}
