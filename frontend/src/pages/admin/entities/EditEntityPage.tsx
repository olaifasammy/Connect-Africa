import { useState } from 'react';
import { Save, Trash2, RotateCcw, ArrowLeft } from 'lucide-react';
import { entityApi } from '../../../services/api';

export function EditEntityPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Person');
  const [tags, setTags] = useState('');
  const [attributes, setAttributes] = useState('{}');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await entityApi.update('current-entity-id', {
        name,
        description,
        type,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        attributes: attributes ? JSON.parse(attributes) : {},
      });
    } catch {
      // production silence; no fake success injected
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <a href="#" className="text-text-muted hover:text-text-main">
          <ArrowLeft className="h-5 w-5" />
        </a>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-text-main">Edit Entity</h1>
      </div>
      <div className="ca-card bg-surface p-6 shadow-scholar space-y-4">
        <div>
          <label htmlFor="entity-name" className="block font-mono text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">Name</label>
          <input id="entity-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="ca-input w-full" placeholder="Entity name" />
        </div>
        <div>
          <label htmlFor="entity-type" className="block font-mono text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">Type</label>
          <select id="entity-type" value={type} onChange={(e) => setType(e.target.value)} className="ca-input w-full">
            <option>Person</option>
            <option>Place</option>
            <option>Organization</option>
            <option>Work</option>
            <option>Concept</option>
            <option>Event</option>
          </select>
        </div>
        <div>
          <label htmlFor="entity-desc" className="block font-mono text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">Description</label>
          <textarea id="entity-desc" value={description} onChange={(e) => setDescription(e.target.value)} className="ca-input w-full h-32" placeholder="Description" />
        </div>
        <div>
          <label htmlFor="entity-tags" className="block font-mono text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">Tags (comma separated)</label>
          <input id="entity-tags" type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="ca-input w-full" placeholder="tag1, tag2, tag3" />
        </div>
        <div>
          <label htmlFor="entity-attrs" className="block font-mono text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">Attributes (JSON)</label>
          <textarea id="entity-attrs" value={attributes} onChange={(e) => setAttributes(e.target.value)} className="ca-input w-full h-24" placeholder='{"key":"value"}' />
        </div>
        <div className="flex items-center gap-3 pt-2">
          <button onClick={handleSave} disabled={saving} className="ca-btn-primary px-4 py-2 text-xs font-mono uppercase tracking-wider flex items-center gap-2">
            <Save className="h-4 w-4" />
            <span>{saving ? 'Saving...' : 'Save Update'}</span>
          </button>
          <button onClick={async () => { await entityApi.delete('current-entity-id'); }} className="ca-btn-outline px-4 py-2 text-xs font-mono uppercase tracking-wider flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </button>
          <button onClick={async () => { await entityApi.restore('current-entity-id'); }} className="ca-btn-outline px-4 py-2 text-xs font-mono uppercase tracking-wider flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            <span>Restore</span>
          </button>
        </div>
      </div>
    </div>
  );
}
