import { useState, useEffect } from 'react';
import {
  Activity,
  CheckCircle2,
  XCircle,
  Loader2,
} from 'lucide-react';
import { auditApi } from '../../../services/api';

interface AuditItem {
  id: string;
  action: string;
  user: string;
  resource?: string;
  status: 'SUCCESS' | 'FAILURE';
  ipAddress?: string;
  timestamp: string;
}

export function AuditAdmin() {
  const [logs, setLogs] = useState<AuditItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const fetchAuditLogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await auditApi.list();
        if (!active) return;
        const mapped: AuditItem[] = (data || []).map((l: any, index: number) => ({
          id: l.id || String(index),
          action: l.action || 'SYSTEM_OPERATION',
          user: l.user || l.userId || 'system',
          resource: l.resource || l.target || 'N/A',
          status: l.status === 'SUCCESS' || l.success ? 'SUCCESS' : 'FAILURE',
          ipAddress: l.ipAddress || l.ip || '127.0.0.1',
          timestamp: l.createdAt || l.timestamp || new Date().toISOString(),
        }));
        setLogs(mapped);
      } catch (err: any) {
        if (!active) return;
        setError(err.message || 'Failed to fetch audit logs from database.');
      } finally {
        if (active) setLoading(false);
      }
    };
    void fetchAuditLogs();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-cloud sm:text-3xl">
              Immutable Audit Logs
            </h1>
            <span className="rounded-full border border-emerald/30 bg-emerald/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald">
              Write-Once Secure
            </span>
          </div>
          <p className="mt-1 text-sm text-cloud/55">
            Cryptographically tracked audit trail of all administrative and system operations.
          </p>
        </div>
      </div>

      {error && (
        <div role="alert" className="ca-msg-error p-4 text-xs">
          {error}
        </div>
      )}

      {/* Audit Table */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#10201A]/60 p-6 backdrop-blur-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 gap-3 text-xs text-mist">
            <Loader2 className="h-5 w-5 animate-spin text-gold" />
            Loading audit logs from database...
          </div>
        ) : logs.length === 0 ? (
          <div className="py-16 text-center text-xs text-mist">
            No audit log records found in database.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-cloud">
              <thead>
                <tr className="border-b border-white/[0.07] text-[10px] font-semibold uppercase tracking-[0.15em] text-mist/60">
                  <th className="pb-3.5 font-medium">Operation Action</th>
                  <th className="pb-3.5 font-medium">Actor / User</th>
                  <th className="pb-3.5 font-medium">Resource</th>
                  <th className="pb-3.5 font-medium">Status</th>
                  <th className="pb-3.5 font-medium">IP Address</th>
                  <th className="pb-3.5 font-medium text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {logs.map((log) => (
                  <tr key={log.id} className="group transition hover:bg-white/[0.02]">
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/10 border border-gold/30 text-gold">
                          <Activity className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-mono font-semibold text-cloud group-hover:text-gold transition">
                            {log.action}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4 font-mono text-mist text-[11px]">{log.user}</td>
                    <td className="py-3.5 pr-4 text-mist">{log.resource}</td>
                    <td className="py-3.5 pr-4">
                      <span
                        className={[
                          'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-medium',
                          log.status === 'SUCCESS'
                            ? 'bg-emerald/10 text-emerald border border-emerald/20'
                            : 'bg-terra/10 text-terra border border-terra/20',
                        ].join(' ')}
                      >
                        {log.status === 'SUCCESS' ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                        {log.status}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 font-mono text-mist/70 text-[11px]">{log.ipAddress}</td>
                    <td className="py-3.5 text-right text-mist/60 font-mono text-[11px]">
                      {new Date(log.timestamp).toLocaleString()}
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

export default AuditAdmin;
