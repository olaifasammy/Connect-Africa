import { useState, useEffect } from 'react';
import {
  Loader2,
  UserX,
  UserCheck,
  Award,
} from 'lucide-react';
import { authAdminApi } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';

interface UserItem {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  status?: string;
  createdAt?: string;
}

const availableRoles = [
  'USER',
  'AUTHOR',
  'EDITOR',
  'REVIEWER',
];

export function UsersAdmin() {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<Record<string, string>>({});

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await authAdminApi.listUsers();
      const mapped: UserItem[] = (data || []).map((u: any) => ({
        id: u.id || u._id,
        email: u.email || 'unknown@connect-africa.org',
        firstName: u.firstName || u.first_name,
        lastName: u.lastName || u.last_name,
        role: u.role || u.roles?.[0] || 'USER',
        status: u.accountStatus || u.status || 'ACTIVE',
        createdAt: u.createdAt,
      }));
      setUsers(mapped);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch users from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchUsers();
  }, []);

  const handleAssignRole = async (userId: string) => {
    const newRole = selectedRole[userId];
    if (!newRole) return;
    setError(null);
    setSuccess(null);
    try {
      await authAdminApi.assignRole(userId, newRole);
      setSuccess(`Successfully assigned role ${newRole} to user.`);
      await fetchUsers();
    } catch (err: any) {
      setError(err.message || 'Failed to assign role. Administrators cannot assign ADMINISTRATOR or SUPER_ADMINISTRATOR roles.');
    }
  };

  const handleBan = async (userId: string) => {
    if (!window.confirm('Are you sure you want to ban this user?')) return;
    setError(null);
    setSuccess(null);
    try {
      await authAdminApi.banUser(userId);
      setSuccess('User successfully banned.');
      await fetchUsers();
    } catch (err: any) {
      setError(err.message || 'Failed to ban user.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-cloud sm:text-3xl">
              User Accounts Governance
            </h1>
            <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[10px] font-semibold text-gold">
              Admin Restricted
            </span>
          </div>
          <p className="mt-1 text-sm text-cloud/55">
            Manage user accounts, platform roles, and account status across Connect-Africa.
          </p>
        </div>
      </div>

      {!isAdmin && (
        <div role="alert" className="ca-msg-error p-4 text-xs">
          Access Restricted: User management is locked to Administrators and Super Administrators.
        </div>
      )}

      {error && (
        <div role="alert" className="ca-msg-error p-4 text-xs">
          {error}
        </div>
      )}

      {success && (
        <div role="status" className="ca-msg-success p-4 text-xs">
          {success}
        </div>
      )}

      {/* Users Table */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#10201A]/60 p-6 backdrop-blur-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 gap-3 text-xs text-mist">
            <Loader2 className="h-5 w-5 animate-spin text-gold" />
            Loading users from database...
          </div>
        ) : users.length === 0 ? (
          <div className="py-16 text-center text-xs text-mist">
            No user accounts found in database.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-cloud">
              <thead>
                <tr className="border-b border-white/[0.07] text-[10px] font-semibold uppercase tracking-[0.15em] text-mist/60">
                  <th className="pb-3.5 font-medium">User Account</th>
                  <th className="pb-3.5 font-medium">Current Role</th>
                  <th className="pb-3.5 font-medium">Status</th>
                  <th className="pb-3.5 font-medium">Assign Role</th>
                  <th className="pb-3.5 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {users.map((u) => (
                  <tr key={u.id} className="group transition hover:bg-white/[0.02]">
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold">
                          {u.email[0]?.toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-cloud group-hover:text-gold transition">
                            {[u.firstName, u.lastName].filter(Boolean).join(' ') || u.email}
                          </p>
                          <p className="text-[10px] text-mist">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="inline-flex items-center gap-1 rounded-full border border-gold/20 bg-gold/[0.04] px-2.5 py-0.5 text-[10px] font-semibold text-gold">
                        <Award className="h-3 w-3" />
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span
                        className={[
                          'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-medium',
                          u.status === 'ACTIVE'
                            ? 'bg-emerald/10 text-emerald border border-emerald/20'
                            : 'bg-terra/10 text-terra border border-terra/20',
                        ].join(' ')}
                      >
                        {u.status === 'ACTIVE' ? <UserCheck className="h-3 w-3" /> : <UserX className="h-3 w-3" />}
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4">
                      {isAdmin && (
                        <div className="flex items-center gap-2">
                          <select
                            aria-label={`Select new role for user ${u.email}`}
                            value={selectedRole[u.id] || ''}
                            onChange={(e) =>
                              setSelectedRole({ ...selectedRole, [u.id]: e.target.value })
                            }
                            className="rounded-lg border border-white/[0.08] bg-ink px-2 py-1 text-xs text-cloud focus:outline-none focus:border-gold/40"
                          >
                            <option value="">Select role...</option>
                            {availableRoles.map((r) => (
                              <option key={r} value={r}>
                                {r}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() => handleAssignRole(u.id)}
                            className="rounded-lg bg-gold/15 px-3 py-1 text-[11px] font-semibold text-gold transition hover:bg-gold/25 border border-gold/30"
                          >
                            Save
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 text-right">
                      {isAdmin && (
                        <button
                          type="button"
                          onClick={() => handleBan(u.id)}
                          className="inline-flex items-center gap-1 rounded-lg border border-terra/20 bg-terra/[0.04] px-3 py-1 text-[11px] font-semibold text-terra transition hover:bg-terra/[0.15]"
                        >
                          <UserX className="h-3 w-3" />
                          Ban
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default UsersAdmin;
