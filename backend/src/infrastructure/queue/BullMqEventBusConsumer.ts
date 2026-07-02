import { Worker, Job } from 'bullmq';
import { appConfig } from '@config/app';
import { logger } from '@shared/logger/Logger';

export class BullMqEventBusConsumer {
  private worker: Worker;

  constructor() {
    this.worker = new Worker('domain-events', async (job: Job) => {
      logger.info(`Processing event: ${job.name}`, job.data);
      // Enterprise handling: Retry strategy is configured via BullMQ options, idempotency via job ID
      switch (job.name) {
        case 'UserLoggedInEvent':
          // Handle logic
          break;
        default:
          logger.warn(`Unhandled event: ${job.name}`);
      }
    }, {
      connection: { host: appConfig.redisUrl, port: 6379 },
      limiter: { max: 1000, duration: 5000 }
    });

    this.worker.on('failed', (job, err) => {
        logger.error(`Job ${job?.id} failed: ${err.message}`);
    });
  }

  async shutdown(): Promise<void> {
    await this.worker.close();
  }
}
