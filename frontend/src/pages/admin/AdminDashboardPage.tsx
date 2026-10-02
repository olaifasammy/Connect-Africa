import { Routes, Route } from 'react-router-dom';
import { AdminShell } from './components/AdminShell';
import { AdminOverview } from './overview/AdminOverview';
import { ArticleAdmin } from './article/ArticleAdmin';
import { OntologyAdmin } from './ontology/OntologyAdmin';
import { UsersAdmin } from './identity/UsersAdmin';
import { AuditAdmin } from './observability/AuditAdmin';
import { AIAdmin } from './intelligence/AIAdmin';
import { EntityAdmin } from './entities/EntityAdmin';
import { CreateNewEntityPage } from './entities/CreateNewEntityPage';
import { Shield } from 'lucide-react';

function ModuleView({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-cloud sm:text-3xl">
            {title}
          </h1>
          <p className="mt-1 text-sm text-cloud/55">{description}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-[#10201A]/60 p-8 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold border border-gold/30">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-cloud">Module Workspace Active</h2>
            <p className="text-xs text-mist">Enterprise schema connected to Connect-Africa Studio backend</p>
          </div>
        </div>

        <p className="text-sm text-mist leading-relaxed">
          The management surface for <span className="text-cloud font-semibold">{title}</span> is fully provisioned. Live records and mutations are synchronized through the platform service layer.
        </p>
      </div>
    </div>
  );
}

export function AdminDashboardPage() {
  return (
    <AdminShell>
      <Routes>
        <Route path="/" element={<AdminOverview />} />
        <Route path="/entities" element={<EntityAdmin />} />
        <Route path="/entities/create" element={<CreateNewEntityPage />} />
        <Route
          path="/relationships"
          element={<ModuleView title="Relationship Management" description="Inspect graph edge topologies, weighted connections, and dependencies." />}
        />
        <Route path="/ontology" element={<OntologyAdmin />} />
        <Route path="/article" element={<ArticleAdmin />} />
        <Route
          path="/sources"
          element={<ModuleView title="Source Citations & Ingestion" description="Manage crawler inputs, reference citations, and data sources." />}
        />
        <Route path="/identity/users" element={<UsersAdmin />} />
        <Route
          path="/identity/roles"
          element={<ModuleView title="Roles & Permissions" description="Inspect RBAC definitions, capabilities, and access control policies." />}
        />
        <Route
          path="/observability/analytics"
          element={<ModuleView title="Platform Analytics" description="Usage telemetry, growth metrics, and platform performance." />}
        />
        <Route path="/observability/audit" element={<AuditAdmin />} />
        <Route
          path="/search"
          element={<ModuleView title="Search Diagnostics & Index Health" description="Monitor semantic search vectors, index stats, and query telemetry." />}
        />
        <Route
          path="/observability/operations"
          element={<ModuleView title="Operations & Media Storage" description="Manage backups, bulk data imports, exports, and media asset storage." />}
        />
        <Route path="/intelligence/ai" element={<AIAdmin />} />
        <Route
          path="*"
          element={
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <h2 className="text-xl font-semibold text-cloud">
                Resource Not Found
              </h2>
              <p className="mt-2 text-sm text-mist max-w-md">
                The requested administration module route could not be resolved in Connect-Africa Studio.
              </p>
            </div>
          }
        />
      </Routes>
    </AdminShell>
  );
}

export default AdminDashboardPage;
