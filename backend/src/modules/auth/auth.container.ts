import { provide } from 'inversify-binding-decorators';
import { ContainerModule, interfaces } from 'inversify';
import { AuthController } from './interfaces/AuthController';
// Import handlers and services used by AuthController
// (These would normally have @provide() but to migrate incrementally we bind here)

export const authContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  // Bindings for Auth module
  // All handlers and controllers are now handled via @provide() decorators.
});
