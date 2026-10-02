import { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { entityApi } from '../../../services/api';

export function CreateNewEntityPage() {
  const [schema, setSchema] = useState<Record<string, unknown> | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const res = await entityApi.getSchema();
        setSchema(res);
        if (res && (res as any).fields) {
          const initial: Record<string, string> = {};
          ((res as any).fields as any[]).forEach((f: any) => {
            initial[f.name] = '';
          });
          setFormData(initial);
        }
      } catch {
        // silent failure per production rules
      }
    };
    fetchSchema();
  }, []);

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleCreate = async () => {
    setSaving(true);
    try {
      await entityApi.create(formData);
    } catch {
      // production silence; no fake success
    } finally {
      setSaving(false);
    }
  };

  const fields = schema && (schema as any).fields ? (schema as any).fields as any[] : [];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <a href="#" className="text-text-muted hover:text-text-main">
          <ArrowLeft className="h-5 w-5" />
        </a>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-text-main">Create New Entity</h1>
      </div>
      <div className="ca-card bg-surface p-6 shadow-scholar space-y-4">
        {!fields.length ? (
          <p className="text-xs text-text-muted">Loading creation fields from backend schema...</p>
        ) : (
          fields.map((field: any) => (
            <div key={field.name}>
              <label htmlFor={`field-${field.name}`} className="block font-mono text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                {field.label} {field.required ? '(required)' : ''}
              </label>
              {field.type === 'select' ? (
                <select
                  id={`field-${field.name}`}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="ca-input w-full"
                >
                  <option value="">Select...</option>
                  {field.options && field.options.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  id={`field-${field.name}`}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="ca-input w-full h-32"
                  placeholder={field.label}
                />
              ) : field.type === 'tags' ? (
                <input
                  id={`field-${field.name}`}
                  type="text"
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="ca-input w-full"
                  placeholder="tag1, tag2, tag3"
                />
              ) : field.type === 'json' ? (
                <textarea
                  id={`field-${field.name}`}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="ca-input w-full h-24"
                  placeholder='{"key":"value"}'
                />
              ) : (
                <input
                  id={`field-${field.name}`}
                  type="text"
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="ca-input w-full"
                  placeholder={field.label}
                />
              )}
            </div>
          ))
        )}
        <div className="flex items-center gap-3 pt-4 border-t border-stone/15">
          <button onClick={handleCreate} disabled={saving || !fields.length} className="ca-btn-primary px-6 py-2.5 text-xs font-mono uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>{saving ? 'Creating...' : 'Create Entity'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
