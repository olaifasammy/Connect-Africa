import { Routes, Route } from 'react-router-dom';
import { UsersAdmin } from '../identity/UsersAdmin';
import { RolesAdmin } from '../identity/RolesAdmin';
import { PermissionsAdmin } from '../identity/PermissionsAdmin';
import { SessionsAdmin } from '../identity/SessionsAdmin';
import { ApiKeysAdmin } from '../identity/ApiKeysAdmin';

export function IdentityRoutes() {
  return (
    <Routes>
      <Route path="/users" element={<UsersAdmin />} />
      <Route path="/roles" element={<RolesAdmin />} />
      <Route path="/permissions" element={<PermissionsAdmin />} />
      <Route path="/sessions" element={<SessionsAdmin />} />
      <Route path="/api-keys" element={<ApiKeysAdmin />} />
    </Routes>
  );
}

export default IdentityRoutes;
