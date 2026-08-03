import { Queue, Worker, Job } from 'bullmq';
import { EventBus } from './EventBus';
import { appConfig } from '@config/app';

export class BullMqEventBus implements EventBus {
  private queue: Queue;
  private worker: Worker;

  constructor() {
    this.queue = new Queue('domain-events', {
      connection: {
        host: appConfig.redisHost,
        port: appConfig.redisPort,
      },
    });

    this.worker = new Worker('domain-events', async (job: Job) => {
      // Worker logic to handle job dispatching to registered handlers
      console.log(`Processing job: ${job.name}`);
    }, {
      connection: {
        host: appConfig.redisHost,
        port: appConfig.redisPort,
      },
    });
  }

  async publish(event: any): Promise<void> {
    await this.queue.add(event.constructor.name, event);
  }

  async subscribe(eventName: string, handler: (event: any) => Promise<void>): Promise<void> {
    // Registering the handler with the worker
    this.worker.on('completed', async (job: Job) => {
        if (job.name === eventName) {
            await handler(job.data);
        }
    });
  }
}
