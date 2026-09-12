import 'reflect-metadata';

import { container } from '@bootstrap/container/container';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { AuditLogRequestedEvent } from '@modules/audit/public';

/**
 * Decorator to automatically log audit events for command/query handlers.
 *
 * Resource ID resolution order:
 * 1. Result.id when the handler returns a resource.
 * 2. command.id for commands operating on an existing resource.
 * 3. command.entityTypeId for entity-type scoped commands such as
 *    CreateEntityTypePropertyCommand.
 * 4. command.entityId for entity-scoped commands.
 * 5. AUTH as the final legacy fallback.
 */
export function Audit(action: string, resource: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const eventBus = container.get<EventBus>('EventBus');

      const command = args[0] ?? {};
      const userId = args[1] || 'SYSTEM';
      const ipAddress = args[2] || '0.0.0.0';

      const resolveResourceId = (result: any): string => {
        const resultId = result?.id?.toString();

        if (resultId) {
          return resultId;
        }

        const commandId =
          command?.id?.toString() ||
          command?.entityTypeId?.toString() ||
          command?.entityId?.toString();

        return commandId || 'AUTH';
      };

      try {
        const result = await originalMethod.apply(
          this,
          args,
        );

        await eventBus.publish(
          new AuditLogRequestedEvent({
            action,
            actorId: userId,
            actorType: 'USER',
            ipAddress,
            userAgent: 'unknown',
            resourceId: resolveResourceId(result),
            resourceType: resource,
            metadata: [
              {
                key: 'status',
                value: 'SUCCESS',
              },
            ],
          }),
        );

        return result;
      } catch (error: any) {
        await eventBus.publish(
          new AuditLogRequestedEvent({
            action,
            actorId: userId,
            actorType: 'USER',
            ipAddress,
            userAgent: 'unknown',
            resourceId: resolveResourceId(undefined),
            resourceType: resource,
            metadata: [
              {
                key: 'status',
                value: 'FAILURE',
              },
              {
                key: 'error',
                value:
                  error instanceof Error
                    ? error.message
                    : String(error),
              },
            ],
          }),
        );

        throw error;
      }
    };

    return descriptor;
  };
}