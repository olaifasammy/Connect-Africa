import { useState, useEffect } from 'react';
import { Key, Shield, RefreshCw, Plus, Trash, AlertCircle } from 'lucide-react';
import { api } from '../../../services/api';
import { MetricCard } from '../components/MetricCard';
import { ResourceTable } from '../components/ResourceTable';
import { AttentionPanel } from '../components/AttentionPanel';

interface ApiKeyRow {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  expiresAt: string | null;
}

export function ApiKeysAdmin() {
  const [keys, setKeys] = useState<ApiKeyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [newKeyName, setNewKeyName] = useState('');
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const fetchKeys = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.get('/auth/api-keys').catch(() => null);
      if (res && res.success) {
        setKeys(res.data || []);
      } else {
        setKeys([]);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load API keys.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchKeys();
  }, []);

  const handleCreateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    try {
      setError('');
      setNotice('');
      setCreatedKey(null);
      const res = await api.post('/auth/api-keys', { name: newKeyName });
      if (res && res.success) {
        setCreatedKey(res.data.key);
        setNotice(`API Key "${newKeyName}" successfully created.`);
        setNewKeyName('');
        void fetchKeys();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create API key.');
    }
  };

  const handleRevokeKey = async (id: string) => {
    try {
      setError('');
      setNotice('');
      await api.delete(`/auth/api-keys/${encodeURIComponent(id)}`);
      setNotice('API Key successfully revoked.');
      void fetchKeys();
    } catch (err: any) {
      setError(err.message || 'Failed to revoke API key.');
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Key Name',
      render: (row: ApiKeyRow) => (
        <span className="font-semibold text-cloud block">{row.name}</span>
      ),
    },
    {
      key: 'prefix',
      label: 'Prefix',
      render: (row: ApiKeyRow) => (
        <span className="font-mono text-gold text-xs">{row.prefix}***</span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Created',
      render: (row: ApiKeyRow) => (
        <span className="text-mist text-xs">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row: ApiKeyRow) => (
        <button
          onClick={() => handleRevokeKey(row.id)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/[0.04] text-red-400 transition hover:bg-red-500/[0.10]"
          title="Revoke Key"
        >
          <Trash className="h-4 w-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <span className="ca-eyebrow">Identity Management</span>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-cloud sm:text-3xl">
            API Keys
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-cloud/45">
            Issue and govern cryptographically secure API keys to connect external data providers and indexers.
          </p>
        </div>

        <button
          onClick={fetchKeys}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 text-sm font-medium text-cloud transition hover:bg-white/[0.05]"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </section>

      <div className="grid gap-3 sm:grid-cols-2">
        <MetricCard
          label="Active API Keys"
          value={keys.length || 0}
          description="Issued cryptographic tokens"
          icon={<Key className="h-4 w-4" />}
        />
        <MetricCard
          label="Key Authentication"
          value="HMAC-SHA256"
          description="Security validation standard"
          icon={<Shield className="h-4 w-4" />}
          status="healthy"
        />
      </div>

      {/* Creation Form */}
      <form onSubmit={handleCreateKey} className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-5 space-y-4">
        <h3 className="text-sm font-semibold text-cloud">Create New API Key</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="e.g. Niger-Delta Indexer Pipeline"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            className="h-10 flex-1 rounded-xl border border-white/[0.07] bg-black/10 px-4 text-sm text-cloud outline-none placeholder:text-cloud/30 transition focus:border-emerald/30 focus:bg-black/20"
          />
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gold px-4 text-sm font-semibold text-ink transition hover:bg-sage shrink-0"
          >
            <Plus className="h-4 w-4" />
            Generate Key
          </button>
        </div>
      </form>

      {/* Feedback Panel */}
      {notice && (
        <div className="rounded-xl border border-emerald/20 bg-emerald/[0.04] p-4 text-sm text-emerald space-y-2">
          <p>{notice}</p>
          {createdKey && (
            <div className="rounded border border-emerald/30 bg-black/50 p-3 font-mono text-xs break-all select-all text-white">
              {createdKey}
              <p className="text-[10px] text-emerald/60 mt-1 font-sans">Copy this key now. It will not be shown again.</p>
            </div>
          )}
        </div>
      )}
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-4 text-sm text-red-400 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <ResourceTable
        columns={columns}
        rows={keys}
        loading={loading}
        emptyMessage="No active API keys issued."
      />

      <AttentionPanel
        title="Security Compliance"
        items={[
          {
            id: 'key-security',
            severity: 'warning',
            title: 'Immutable Storage',
            description: 'API keys are stored as cryptographically hashed records. Revocation cannot be undone.',
          }
        ]}
      />
    </div>
  );
}

export default ApiKeysAdmin;
