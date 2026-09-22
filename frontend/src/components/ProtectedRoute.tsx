import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ErrorPage } from '../pages/ErrorPage';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export const AdminRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname, message: 'Please sign in with an administrator account.' }} replace />;
  }

  if (!isAdmin) {
    return (
      <ErrorPage
        statusCode={403}
        errorTitle="Access Denied"
        errorMessage="The Administration Control Center is restricted to authorized platform administrators and super administrators."
        breadcrumbs={[
          'INIT: Access Control Enforcement',
          'VERIFY: User Session Authentication Token',
          'CHECK: Role Matrix Validation (ADMINISTRATOR, SUPER_ADMINISTRATOR)',
          'RESULT: Insufficient Authorization Privileges (403 Forbidden)',
        ]}
        stackTrace="Error: AccessDeniedException: User account lacks required role permissions\n    at Guard.verifyAdminRole (frontend/src/components/ProtectedRoute.tsx:32:11)\n    at Route.dispatch (node_modules/react-router/dist/index.js:189:22)"
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
