import { Shield, Key } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { ResourceTable } from '../components/ResourceTable';
import { AttentionPanel } from '../components/AttentionPanel';

interface RoleRow {
  id: string;
  name: string;
  description: string;
  permissionsCount: number;
  assignedUsers: number;
}

export function RolesAdmin() {
  const roles: RoleRow[] = [
    {
      id: 'role-super-admin',
      name: 'SUPER_ADMINISTRATOR',
      description: 'Full uninhibited master access across all platform services, schemas, and configurations.',
      permissionsCount: 42,
      assignedUsers: 1,
    },
    {
      id: 'role-admin',
      name: 'ADMIN',
      description: 'Administrative access for ontology, relationship, entity governance, and operations control.',
      permissionsCount: 31,
      assignedUsers: 2,
    },
    {
      id: 'role-researcher',
      name: 'RESEARCHER',
      description: 'Access to research and draft entities, suggest ontology changes, and verify sources.',
      permissionsCount: 15,
      assignedUsers: 5,
    },
    {
      id: 'role-user',
      name: 'USER',
      description: 'Standard explorer account to read insights, bookmark entities, and trace graphs.',
      permissionsCount: 4,
      assignedUsers: 124,
    },
  ];

  const columns = [
    {
      key: 'name',
      label: 'Role Name',
      render: (row: RoleRow) => (
        <span className="font-semibold text-gold font-mono tracking-wider">{row.name}</span>
      ),
    },
    {
      key: 'description',
      label: 'Description',
      render: (row: RoleRow) => (
        <span className="text-cloud/80 text-sm">{row.description}</span>
      ),
    },
    {
      key: 'permissions',
      label: 'Permissions',
      render: (row: RoleRow) => (
        <span className="rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-xs font-mono font-bold text-sage">
          {row.permissionsCount} active
        </span>
      ),
    },
    {
      key: 'assigned',
      label: 'Assigned Users',
      render: (row: RoleRow) => (
        <span className="text-cloud font-semibold font-mono">{row.assignedUsers}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="ca-eyebrow">Identity Management</span>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-cloud sm:text-3xl">
          Role Registry (RBAC)
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-cloud/45">
          Review system-wide roles, count associated permissions, and govern individual permission assignments.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <MetricCard
          label="Total System Roles"
          value={roles.length}
          description="Active custom user-group roles"
          icon={<Shield className="h-4 w-4" />}
        />
        <MetricCard
          label="Global Permissions Matrix"
          value="42"
          description="Individual permissions mapped across roles"
          icon={<Key className="h-4 w-4" />}
          status="healthy"
        />
      </div>

      <ResourceTable
        columns={columns}
        rows={roles}
        loading={false}
        emptyMessage="No platform roles declared."
      />

      <AttentionPanel
        title="Role Integrity Rules"
        items={[
          {
            id: 'role-mapping',
            severity: 'info',
            title: 'Hierarchical Integrity',
            description: 'Permissions cascade downwards. Assigning a higher role automatically inherits standard explorer permissions.',
          }
        ]}
      />
    </div>
  );
}

export default RolesAdmin;
