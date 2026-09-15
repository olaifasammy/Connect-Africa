import { Routes, Route } from 'react-router-dom';
import { AnalyticsAdmin } from '../observability/AnalyticsAdmin';
import { AuditAdmin } from '../observability/AuditAdmin';
import { OperationsAdmin } from '../observability/OperationsAdmin';

export function ObservabilityRoutes() {
  return (
    <Routes>
      <Route path="/analytics" element={<AnalyticsAdmin />} />
      <Route path="/audit" element={<AuditAdmin />} />
      <Route path="/operations" element={<OperationsAdmin />} />
    </Routes>
  );
}

export default ObservabilityRoutes;
