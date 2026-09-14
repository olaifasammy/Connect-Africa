import { Routes, Route } from 'react-router-dom';
import { AdminShell } from './components/AdminShell';
import { AdminOverview } from './overview/AdminOverview';
import { KnowledgeHealth } from './overview/KnowledgeHealth';
import { SystemHealth } from './overview/SystemHealth';
import { OperationsFeed } from './overview/OperationsFeed';

import { EntityAdmin } from './entities/EntityAdmin';
import { RelationshipAdmin } from './relationships/RelationshipAdmin';
import { OntologyAdmin } from './ontology/OntologyAdmin';

import { UsersAdmin } from './identity/UsersAdmin';
import { RolesAdmin } from './identity/RolesAdmin';
import { PermissionsAdmin } from './identity/PermissionsAdmin';
import { SessionsAdmin } from './identity/SessionsAdmin';
import { ApiKeysAdmin } from './identity/ApiKeysAdmin';

import { AIAdmin } from './intelligence/AIAdmin';
import { ProviderAdmin } from './intelligence/ProviderAdmin';
import { CrawlAdmin } from './intelligence/CrawlAdmin';
import { KnowledgeGapAdmin } from './intelligence/KnowledgeGapAdmin';
import { PromptAdmin } from './intelligence/PromptAdmin';

import { AnalyticsAdmin } from './observability/AnalyticsAdmin';
import { AuditAdmin } from './observability/AuditAdmin';
import { OperationsAdmin } from './observability/OperationsAdmin';

import { SearchAdmin } from './search/SearchAdmin';
import { SearchDiagnostics } from './search/SearchDiagnostics';
import { SearchIndexHealth } from './search/SearchIndexHealth';

export function AdminDashboardPage() {
  return (
    <AdminShell>
      <section className="ca-container py-6 lg:py-8">
        <Routes>
          <Route path="/" element={<AdminOverview />} />
          <Route path="/overview/knowledge" element={<KnowledgeHealth />} />
          <Route path="/overview/system" element={<SystemHealth />} />
          <Route path="/overview/operations" element={<OperationsFeed />} />
          
          <Route path="/entities" element={<EntityAdmin />} />
          <Route path="/relationships" element={<RelationshipAdmin />} />
          <Route path="/ontology" element={<OntologyAdmin />} />
          
          <Route path="/identity/users" element={<UsersAdmin />} />
          <Route path="/identity/roles" element={<RolesAdmin />} />
          <Route path="/identity/permissions" element={<PermissionsAdmin />} />
          <Route path="/identity/sessions" element={<SessionsAdmin />} />
          <Route path="/identity/api-keys" element={<ApiKeysAdmin />} />
          
          <Route path="/intelligence/ai" element={<AIAdmin />} />
          <Route path="/intelligence/providers" element={<ProviderAdmin />} />
          <Route path="/intelligence/crawl" element={<CrawlAdmin />} />
          <Route path="/intelligence/knowledge-gaps" element={<KnowledgeGapAdmin />} />
          <Route path="/intelligence/prompts" element={<PromptAdmin />} />
          
          <Route path="/observability/analytics" element={<AnalyticsAdmin />} />
          <Route path="/observability/audit" element={<AuditAdmin />} />
          <Route path="/observability/operations" element={<OperationsAdmin />} />
          
          <Route path="/search" element={<SearchAdmin />} />
          <Route path="/search/diagnostics" element={<SearchDiagnostics />} />
          <Route path="/search/index-health" element={<SearchIndexHealth />} />
        </Routes>
      </section>
    </AdminShell>
  );
}

export default AdminDashboardPage;
