import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, AlertCircle } from 'lucide-react';
import { entityApi } from '../../../services/api';

const entityTypes = ['Person', 'Place', 'Organization', 'Work', 'Concept', 'Event'];

export function CreateNewEntityPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: 'Person',
    description: '',
    source: '',
    tags: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Entity name is required.');
      return;
    }
    if (!formData.type.trim()) {
      setError('Entity type is required.');
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        name: formData.name.trim(),
        type: formData.type.trim(),
        description: formData.description.trim() || undefined,
        source: formData.source.trim() || undefined,
        tags: formData.tags
          ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
          : [],
        attributes: {},
      };

      await entityApi.create(payload);
      setSuccess('Entity created successfully! Redirecting...');
      setTimeout(() => {
        navigate('/admin/entities');
      }, 1200);
    } catch (err: any) {
      setError(err.message || 'Failed to create entity.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto font-sans">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate('/admin/entities')}
          className="text-text-muted hover:text-text-main transition"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-text-main">Create New Entity</h1>
      </div>

      {error && (
        <div role="alert" className="ca-msg-error p-4 text-xs flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-terra shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div role="status" className="ca-msg-success p-4 text-xs">
          {success}
        </div>
      )}

      <form onSubmit={handleCreate} className="ca-card bg-surface p-6 shadow-scholar space-y-6">
        <div>
          <label htmlFor="entity-name" className="block font-mono text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
            Entity Name <span className="text-terra">*</span>
          </label>
          <input
            id="entity-name"
            type="text"
            required
            placeholder="e.g. Kwame Nkrumah"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="ca-input w-full"
          />
        </div>

        <div>
          <label htmlFor="entity-type" className="block font-mono text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
            Entity Type <span className="text-terra">*</span>
          </label>
          <select
            id="entity-type"
            value={formData.type}
            onChange={(e) => handleInputChange('type', e.target.value)}
            className="ca-input w-full"
          >
            {entityTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="entity-description" className="block font-mono text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
            Description
          </label>
          <textarea
            id="entity-description"
            rows={4}
            placeholder="Detailed background or summary of the entity..."
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="ca-input w-full"
          />
        </div>

        <div>
          <label htmlFor="entity-source" className="block font-mono text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
            Primary Source / Reference
          </label>
          <input
            id="entity-source"
            type="text"
            placeholder="e.g. https://example.org/source"
            value={formData.source}
            onChange={(e) => handleInputChange('source', e.target.value)}
            className="ca-input w-full"
          />
        </div>

        <div>
          <label htmlFor="entity-tags" className="block font-mono text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
            Tags (comma separated)
          </label>
          <input
            id="entity-tags"
            type="text"
            placeholder="history, politics, leader"
            value={formData.tags}
            onChange={(e) => handleInputChange('tags', e.target.value)}
            className="ca-input w-full"
          />
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-stone/15">
          <button
            type="submit"
            disabled={saving}
            className="ca-btn-primary px-6 py-2.5 text-xs font-mono uppercase tracking-wider flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            <span>{saving ? 'Creating...' : 'Create Entity'}</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/entities')}
            className="ca-btn-outline px-4 py-2.5 text-xs font-mono"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateNewEntityPage;
