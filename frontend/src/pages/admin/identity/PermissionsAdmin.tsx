import { Key, Database } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { ResourceTable } from '../components/ResourceTable';
import { AttentionPanel } from '../components/AttentionPanel';

interface PermissionRow {
  id: string;
  key: string;
  module: string;
  description: string;
  requiredRole: string;
}

export function PermissionsAdmin() {
  const permissions: PermissionRow[] = [
    {
      id: 'perm-user-manage',
      key: 'user:manage',
      module: 'IDENTITY',
      description: 'Ban, suspend, unlock, or configure explorer accounts.',
      requiredRole: 'SUPER_ADMINISTRATOR, ADMIN',
    },
    {
      id: 'perm-role-manage',
      key: 'role:manage',
      module: 'IDENTITY',
      description: 'Create roles or modify the RBAC permissions assignment matrix.',
      requiredRole: 'SUPER_ADMINISTRATOR',
    },
    {
      id: 'perm-ontology-write',
      key: 'ontology:write',
      module: 'KNOWLEDGE',
      description: 'Declare or modify entity types, relationship types, and ontologies.',
      requiredRole: 'SUPER_ADMINISTRATOR, ADMIN',
    },
    {
      id: 'perm-entity-verify',
      key: 'entity:verify',
      module: 'KNOWLEDGE',
      description: 'Approve, reject, or merge proposed knowledge graph entities.',
      requiredRole: 'ADMIN, RESEARCHER',
    },
    {
      id: 'perm-audit-read',
      key: 'audit:read',
      module: 'OBSERVABILITY',
      description: 'Access the global immutable administrative system audit logs.',
      requiredRole: 'SUPER_ADMINISTRATOR, ADMIN',
    },
  ];

  const columns = [
    {
      key: 'key',
      label: 'Permission Key',
      render: (row: PermissionRow) => (
        <span className="font-semibold text-emerald font-mono tracking-wider">{row.key}</span>
      ),
    },
    {
      key: 'module',
      label: 'Module',
      render: (row: PermissionRow) => (
        <span className="rounded bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 text-[10px] font-mono text-mist font-medium">
          {row.module}
        </span>
      ),
    },
    {
      key: 'description',
      label: 'Description',
      render: (row: PermissionRow) => (
        <span className="text-cloud/85 text-sm">{row.description}</span>
      ),
    },
    {
      key: 'roles',
      label: 'Authorized Roles',
      render: (row: PermissionRow) => (
        <span className="text-gold font-mono text-xs">{row.requiredRole}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="ca-eyebrow">Identity Management</span>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-cloud sm:text-3xl">
          Permissions Matrix
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-cloud/45">
          Review granular, role-based platform permission keys mapped across functional modules.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <MetricCard
          label="Total Defined Keys"
          value="42"
          description="Granular permission nodes compiled"
          icon={<Key className="h-4 w-4" />}
          status="healthy"
        />
        <MetricCard
          label="Guarded Modules"
          value="6"
          description="Isolated architectural boundary layers"
          icon={<Database className="h-4 w-4" />}
        />
      </div>

      <ResourceTable
        columns={columns}
        rows={permissions}
        loading={false}
        emptyMessage="No permissions declared."
      />

      <AttentionPanel
        title="Security Compliance"
        items={[
          {
            id: 'rbac-matrix-lock',
            severity: 'info',
            title: 'Permissions are Compiled Statitally',
            description: 'Permissions are locked into the system schema configuration and cannot be modified without standard software release pipelines.',
          }
        ]}
      />
    </div>
  );
}

export default PermissionsAdmin;
