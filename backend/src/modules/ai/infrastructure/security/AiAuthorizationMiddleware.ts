import { authorizeRole } from '@shared/interfaces/http/middleware/AuthorizationMiddleware';
import { Roles } from '@modules/auth/public';

// Reusing existing infrastructure
export const AiAuthorizationMiddleware = authorizeRole(Roles.ADMIN);
