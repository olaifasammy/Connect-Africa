import { useState, useEffect } from 'react';
import { 
  Users, 
  ShieldCheck, 
  UserX, 
  Search, 
  RefreshCw,
  Ban,
  Unlock,
  AlertCircle
} from 'lucide-react';
import { api } from '../../../services/api';
import { MetricCard } from '../components/MetricCard';
import { ResourceTable } from '../components/ResourceTable';
import { AttentionPanel } from '../components/AttentionPanel';

interface UserRow {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles?: string[];
  status: string;
}

export function UsersAdmin() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.get('/auth/users');
      if (res && res.success) {
        setUsers(res.data || []);
      } else {
        setUsers([]);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load user directory.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchUsers();
  }, []);

  const handleBanUser = async (userId: string) => {
    try {
      setError('');
      setNotice('');
      const reason = 'Administrative ban';
      await api.post('/auth/ban', { userId, reason });
      setNotice('User successfully banned.');
      void fetchUsers();
    } catch (err: any) {
      setError(err.message || 'Failed to ban user.');
    }
  };

  const handleUnlockUser = async (userIdToUnlock: string) => {
    try {
      setError('');
      setNotice('');
      await api.post('/auth/unlock', { userIdToUnlock });
      setNotice('User account unlocked.');
      void fetchUsers();
    } catch (err: any) {
      setError(err.message || 'Failed to unlock user.');
    }
  };

  const filteredUsers = users.filter((u) => {
    const term = searchQuery.toLowerCase();
    return (
      u.email.toLowerCase().includes(term) ||
      (u.firstName?.toLowerCase() || '').includes(term) ||
      (u.lastName?.toLowerCase() || '').includes(term)
    );
  });

  const columns = [
    {
      key: 'email',
      label: 'Email / Identity',
      render: (row: UserRow) => (
        <div>
          <span className="font-semibold text-cloud block">{row.email}</span>
          <span className="text-[10px] text-mist/60 font-mono block mt-0.5">{row.id}</span>
        </div>
      ),
    },
    {
      key: 'name',
      label: 'Full Name',
      render: (row: UserRow) => (
        <span className="text-cloud/85">
          {[row.firstName, row.lastName].filter(Boolean).join(' ') || '—'}
        </span>
      ),
    },
    {
      key: 'roles',
      label: 'Roles',
      render: (row: UserRow) => (
        <div className="flex flex-wrap gap-1">
          {row.roles && row.roles.length > 0 ? (
            row.roles.map((r) => (
              <span key={r} className="rounded-full border border-gold/20 bg-gold/[0.04] px-2 py-0.5 text-[9px] font-mono font-semibold text-gold uppercase">
                {r}
              </span>
            ))
          ) : (
            <span className="text-mist/40">—</span>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Account Status',
      render: (row: UserRow) => (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium ${
          row.status === 'ACTIVE' || row.status === 'ACTIVE_ACCOUNT' || row.status === 'VERIFIED'
            ? 'bg-emerald/10 text-emerald border border-emerald/20'
            : 'bg-red-500/10 text-red-400 border border-red-500/20'
        }`}>
          <span className={`h-1.5 w-1.5 rounded-full ${
            row.status === 'ACTIVE' || row.status === 'ACTIVE_ACCOUNT' || row.status === 'VERIFIED' ? 'bg-emerald' : 'bg-red-400'
          }`} />
          {row.status}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row: UserRow) => (
        <div className="flex items-center gap-2">
          {row.status === 'BANNED' || row.status === 'LOCKED' ? (
            <button
              onClick={() => handleUnlockUser(row.id)}
              className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-emerald/20 bg-emerald/[0.04] px-2.5 text-xs font-semibold text-emerald transition hover:bg-emerald/[0.10]"
            >
              <Unlock className="h-3.5 w-3.5" />
              Unlock
            </button>
          ) : (
            <button
              onClick={() => handleBanUser(row.id)}
              className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/[0.04] px-2.5 text-xs font-semibold text-red-400 transition hover:bg-red-500/[0.10]"
            >
              <Ban className="h-3.5 w-3.5" />
              Ban
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <span className="ca-eyebrow">Identity Management</span>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-cloud sm:text-3xl">
            User Directory
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-cloud/45">
            Govern registered Connect-Africa users, inspect access tokens, assign roles, and handle security suspension.
          </p>
        </div>

        <button
          onClick={fetchUsers}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 text-sm font-medium text-cloud transition hover:bg-white/[0.05]"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </section>

      {/* Metrics Row */}
      <div className="grid gap-3 sm:grid-cols-3">
        <MetricCard
          label="Total Users"
          value={users.length || '—'}
          description="Registered platform explorer accounts"
          icon={<Users className="h-4 w-4" />}
        />
        <MetricCard
          label="Administrator Accounts"
          value={users.filter(u => u.roles?.includes('ADMIN') || u.roles?.includes('SUPER_ADMINISTRATOR')).length || '—'}
          description="Privileged administrative roles"
          icon={<ShieldCheck className="h-4 w-4" />}
          status="warning"
        />
        <MetricCard
          label="Suspended Users"
          value={users.filter(u => u.status === 'BANNED' || u.status === 'LOCKED').length || 0}
          description="Banned or locked explorer entities"
          icon={<UserX className="h-4 w-4" />}
          status={users.some(u => u.status === 'BANNED') ? 'critical' : 'default'}
        />
      </div>

      {/* Feedback Panel */}
      {notice && (
        <div className="rounded-xl border border-emerald/20 bg-emerald/[0.04] p-4 text-sm text-emerald">
          {notice}
        </div>
      )}
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-4 text-sm text-red-400 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Search and Table */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cloud/30" />
          <input
            type="text"
            placeholder="Search users by email or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-xl border border-white/[0.07] bg-black/10 pl-10 pr-4 text-sm text-cloud outline-none placeholder:text-cloud/30 transition focus:border-emerald/30 focus:bg-black/20"
          />
        </div>

        <ResourceTable
          columns={columns}
          rows={filteredUsers}
          loading={loading}
          emptyMessage="No matching user accounts found in the registry directory."
        />
      </div>

      <AttentionPanel
        title="Administrative Notice"
        items={[
          {
            id: 'rbac-security',
            severity: 'info',
            title: 'Role-Based Access Compliance',
            description: 'Changes to user roles or suspension states are logged permanently in the system audit logs under security compliance rules.',
          }
        ]}
      />
    </div>
  );
}

export default UsersAdmin;
