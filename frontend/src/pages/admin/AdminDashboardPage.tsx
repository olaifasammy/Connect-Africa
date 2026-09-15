import { Routes, Route } from 'react-router-dom';
import { AdminShell } from './components/AdminShell';
import { AdminOverview } from './overview/AdminOverview';
import { OverviewRoutes } from './routing/OverviewRoutes';
import { EntityRelationshipRoutes } from './routing/EntityRelationshipRoutes';
import { IdentityRoutes } from './routing/IdentityRoutes';
import { IntelligenceRoutes } from './routing/IntelligenceRoutes';
import { ObservabilityRoutes } from './routing/ObservabilityRoutes';
import { SearchManagementRoutes } from './routing/SearchManagementRoutes';

export function AdminDashboardPage() {
  return (
    <AdminShell>
      <section className="ca-container py-6 lg:py-8">
        <Routes>
          <Route path="/" element={<AdminOverview />} />
          <Route path="/overview/*" element={<OverviewRoutes />} />
          <Route path="/*" element={<EntityRelationshipRoutes />} />
          <Route path="/identity/*" element={<IdentityRoutes />} />
          <Route path="/intelligence/*" element={<IntelligenceRoutes />} />
          <Route path="/observability/*" element={<ObservabilityRoutes />} />
          <Route path="/search/*" element={<SearchManagementRoutes />} />
        </Routes>
      </section>
    </AdminShell>
  );
}

export default AdminDashboardPage;
