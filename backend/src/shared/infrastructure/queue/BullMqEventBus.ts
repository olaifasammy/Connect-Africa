import { injectable } from 'inversify';
import { Job, Queue, Worker } from 'bullmq';

import { appConfig } from '@config/app';
import { logger } from '@shared/logger/Logger';

import { EventBus } from './EventBus';

type EventHandler = (event: any) => Promise<void>;

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 250;

export interface BullMqRedisConnectionOptions {
  host: string;
  port: number;
  lazyConnect: boolean;
  maxRetriesPerRequest?: number | null;
  retryStrategy?: (retries: number) => number | null;
}

@injectable()
export class BullMqEventBus implements EventBus {
  private queue: Queue | null = null;
  private worker: Worker | null = null;

  private readonly handlers =
    new Map<string, EventHandler[]>();

  private queueFailures = 0;
  private workerFailures = 0;

  private degraded = false;
  private shutdownStarted = false;

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    try {
      this.queue = new Queue(
        'domain-events',
        {
          connection:
            this.createConnectionOptions(
              'Queue',
            ),
        },
      );

      this.queue.on(
        'error',
        (error) => {
          this.handleInfrastructureError(
            'Queue',
            error,
          );
        },
      );

      this.worker = new Worker(
        'domain-events',
        async (job: Job) => {
          if (this.degraded) {
            return;
          }

          logger.info(
            `Processing job: ${job.name}`,
          );
        },
        {
          connection:
            this.createConnectionOptions(
              'Worker',
            ),
        },
      );

      this.worker.on(
        'ready',
        () => {
          this.workerFailures = 0;

          logger.info(
            'BullMQ worker connection ready.',
          );
        },
      );

      this.worker.on(
        'error',
        (error) => {
          this.handleInfrastructureError(
            'Worker',
            error,
          );
        },
      );

      this.worker.on(
        'completed',
        async (job: Job) => {
          if (this.degraded) {
            return;
          }

          const eventHandlers =
            this.handlers.get(
              job.name,
            );

          if (
            !eventHandlers?.length
          ) {
            return;
          }

          for (
            const handler
            of eventHandlers
          ) {
            try {
              await handler(
                job.data,
              );
            } catch (error) {
              logger.error(
                `Error in event subscription handler for ${job.name}.`,
                {
                  error:
                    error instanceof Error
                      ? error.message
                      : String(error),
                  stack:
                    error instanceof Error
                      ? error.stack
                      : undefined,
                },
              );
            }
          }
        },
      );

      logger.info(
        'BullMQ EventBus initialized.',
      );
    } catch (error) {
      this.enterDegradedMode(
        'Failed to initialize BullMQ EventBus.',
        error,
      );
    }
  }

  private createConnectionOptions(
    component: string,
  ): BullMqRedisConnectionOptions {
    return {
      host: appConfig.redisHost,
      port: appConfig.redisPort,
      lazyConnect: true,

      /*
       * BullMQ workers require null here so blocking
       * commands are not aborted by ioredis request
       * retry limits.
       *
       * Connection establishment itself is bounded
       * by retryStrategy below.
       */
      maxRetriesPerRequest: null,

      retryStrategy: (
        retries: number,
      ): number | null => {
        if (
          retries > MAX_RETRIES
        ) {
          logger.error(
            `BullMQ ${component} Redis connection retry limit reached.`,
            {
              component,
              retries:
                retries - 1,
              maxRetries:
                MAX_RETRIES,
            },
          );

          this.enterDegradedMode(
            `BullMQ ${component} Redis connection failed after ${MAX_RETRIES} retries.`,
          );

          return null;
        }

        logger.warn(
          `BullMQ ${component} Redis connection retry scheduled.`,
          {
            component,
            attempt: retries,
            maxAttempts:
              MAX_RETRIES,
            delayMs:
              RETRY_DELAY_MS,
          },
        );

        return RETRY_DELAY_MS;
      },
    };
  }

  private handleInfrastructureError(
    component: string,
    error: unknown,
  ): void {
    if (
      this.degraded ||
      this.shutdownStarted
    ) {
      return;
    }

    const message =
      error instanceof Error
        ? error.message
        : String(error);

    const stack =
      error instanceof Error
        ? error.stack
        : undefined;

    if (component === 'Queue') {
      this.queueFailures += 1;
    } else {
      this.workerFailures += 1;
    }

    const failures =
      component === 'Queue'
        ? this.queueFailures
        : this.workerFailures;

    logger.warn(
      `BullMQ ${component} infrastructure error.`,
      {
        component,
        attempt: failures,
        maxAttempts:
          MAX_RETRIES,
        error: message,
        stack,
      },
    );

    if (
      failures >= MAX_RETRIES
    ) {
      this.enterDegradedMode(
        `BullMQ ${component} failed ${MAX_RETRIES} consecutive times; entering degraded mode.`,
        error,
      );
    }
  }

  private enterDegradedMode(
    message: string,
    error?: unknown,
  ): void {
    if (
      this.degraded ||
      this.shutdownStarted
    ) {
      return;
    }

    this.degraded = true;

    logger.error(
      message,
      {
        degraded: true,
        error:
          error instanceof Error
            ? error.message
            : error
              ? String(error)
              : undefined,
        stack:
          error instanceof Error
            ? error.stack
            : undefined,
      },
    );

    void this.closeInfrastructure();
  }

  private async closeInfrastructure(): Promise<void> {
    if (
      this.shutdownStarted
    ) {
      return;
    }

    this.shutdownStarted = true;

    const worker =
      this.worker;

    const queue =
      this.queue;

    this.worker = null;
    this.queue = null;

    if (worker) {
      try {
        await worker.close();
      } catch (error) {
        logger.warn(
          'Failed to close degraded BullMQ worker.',
          {
            error:
              error instanceof Error
                ? error.message
                : String(error),
          },
        );
      }
    }

    if (queue) {
      try {
        await queue.close();
      } catch (error) {
        logger.warn(
          'Failed to close degraded BullMQ queue.',
          {
            error:
              error instanceof Error
                ? error.message
                : String(error),
          },
        );
      }
    }

    logger.warn(
      'BullMQ EventBus is running in degraded mode; application remains available.',
    );
  }

  private getEventName(
    event: any,
  ): string | undefined {
    if (
      typeof event === 'string'
    ) {
      return event;
    }

    if (
      typeof event === 'function'
    ) {
      return event.name;
    }

    return event?.constructor?.name;
  }

  async publish(
    event: any,
  ): Promise<void> {
    if (
      this.degraded ||
      !this.queue
    ) {
      logger.warn(
        'EventBus unavailable; event publication skipped.',
        {
          event:
            event?.constructor?.name,
          degraded:
            this.degraded,
        },
      );

      return;
    }

    try {
      await this.queue.add(
        event.constructor.name,
        event,
      );
    } catch (error) {
      logger.warn(
        'Failed to publish event to BullMQ.',
        {
          event:
            event?.constructor?.name,
          error:
            error instanceof Error
              ? error.message
              : String(error),
          stack:
            error instanceof Error
              ? error.stack
              : undefined,
        },
      );
    }
  }

  async subscribe(
    event: any,
    handler: EventHandler,
  ): Promise<void> {
    const eventName =
      this.getEventName(event);

    if (!eventName) {
      logger.warn(
        'Cannot subscribe to event: unable to determine event name.',
      );

      return;
    }

    const existingHandlers =
      this.handlers.get(
        eventName,
      ) ?? [];

    existingHandlers.push(
      handler,
    );

    this.handlers.set(
      eventName,
      existingHandlers,
    );
  }
}