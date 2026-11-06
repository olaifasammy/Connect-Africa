import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Loader2,
  Check,
  Image as ImageIcon,
  MapPin,
  Heading,
  List,
  Quote,
  ArrowDown,
  ArrowUp,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { articleApi, api, entityApi, type EntitySummary } from '../../../services/api';

interface ContentBlock {
  type: 'paragraph' | 'heading' | 'blockquote' | 'list' | 'image' | 'map';
  text?: string;
  level?: 2 | 3;
  items?: string[];
  url?: string;
  caption?: string;
  align?: 'left' | 'center' | 'right';
  size?: 'small' | 'medium' | 'full';
  title?: string;
  description?: string;
  location?: string;
}

export function ArticleEditorPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [entities, setEntities] = useState<EntitySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Archival Research');
  const [summary, setSummary] = useState('');
  const [entityId, setEntityId] = useState('');
  const [tags, setTags] = useState('Policy, Archive, Heritage');
  const [blocks, setBlocks] = useState<ContentBlock[]>([
    { type: 'paragraph', text: 'Enter introductory paragraph text here...' },
  ]);

  const isEditing = Boolean(id);

  useEffect(() => {
    let active = true;
    const loadData = async () => {
      setLoading(true);
      try {
        const entityData = await entityApi.list(100).catch(() => []);
        if (!active) return;
        setEntities(entityData || []);

        if (isEditing && id) {
          const articles = await articleApi.getLatest(100);
          const found = articles.find((a) => a.id === id);
          if (found) {
            setTitle(found.title);
            setCategory(found.category || 'Archival Research');
            setSummary(found.description || '');
            let parsedBlocks: ContentBlock[] = [];
            try {
              if (typeof found.content === 'string') {
                const json = JSON.parse(found.content);
                if (Array.isArray(json)) parsedBlocks = json;
              } else if (Array.isArray(found.content)) {
                parsedBlocks = found.content;
              }
            } catch {
              parsedBlocks = [{ type: 'paragraph', text: String(found.content || found.description || '') }];
            }
            if (parsedBlocks.length > 0) setBlocks(parsedBlocks);
          }
        } else if (entityData && entityData.length > 0) {
          setEntityId(entityData[0].id);
        }
      } catch (err: any) {
        if (active) setError(err.message || 'Failed to initialize editor workspace.');
      } finally {
        if (active) setLoading(false);
      }
    };

    void loadData();
    return () => {
      active = false;
    };
  }, [id, isEditing]);

  const addBlock = (type: ContentBlock['type']) => {
    let newBlock: ContentBlock = { type };
    if (type === 'paragraph') newBlock.text = '';
    if (type === 'heading') { newBlock.text = ''; newBlock.level = 2; }
    if (type === 'blockquote') newBlock.text = '';
    if (type === 'list') newBlock.items = ['First point', 'Second point'];
    if (type === 'image') { newBlock.url = '/images/africa.svg'; newBlock.caption = 'Figure caption'; newBlock.align = 'center'; newBlock.size = 'medium'; }
    if (type === 'map') { newBlock.title = 'Geographic Corridor'; newBlock.description = 'Mapping regional trade networks'; newBlock.location = 'EAC Region'; }
    
    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (index: number) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= blocks.length) return;
    const updated = [...blocks];
    const temp = updated[index];
    updated[index] = updated[target];
    updated[target] = temp;
    setBlocks(updated);
  };

  const updateBlock = (index: number, updatedProps: Partial<ContentBlock>) => {
    const updated = [...blocks];
    updated[index] = { ...updated[index], ...updatedProps };
    setBlocks(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) {
      setError('Article Title and Summary are required.');
      return;
    }
    if (!isEditing && !entityId) {
      setError('An article must be connected to a knowledge graph entity.');
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const payload: Record<string, unknown> = {
        title: title.trim(),
        summary: summary.trim(),
        content: JSON.stringify(blocks),
        category: category.trim(),
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      };

      if (!isEditing) {
        payload.entityId = entityId;
        await api.post('/article', payload);
        setSuccess('Article successfully created and published to the graph!');
      } else {
        await api.put(`/article/${id}`, payload);
        setSuccess('Article successfully updated!');
      }

      setTimeout(() => {
        navigate('/admin/article');
      }, 1200);
    } catch (err: any) {
      setError(err.message || 'Failed to save article record.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center font-mono text-xs text-text-muted">
        <Loader2 className="mr-2 h-5 w-5 animate-spin text-[var(--accent-teal)]" />
        Loading article editor workspace...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-10 font-sans pb-32 pt-6 px-4 sm:px-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone/10 pb-6 gap-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/article')}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-stone/20 text-text-muted hover:border-[var(--accent-teal)] hover:text-text-main transition"
            aria-label="Back to articles"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <p className="ca-eyebrow">Enterprise Studio</p>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
              {isEditing ? 'Edit Publication' : 'Author Publication'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/article')}
            className="ca-btn-outline px-5 py-3 text-xs font-mono uppercase tracking-wider"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="ca-btn-primary px-8 py-3 text-xs font-mono uppercase tracking-wider flex items-center gap-2"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            <Check size={16} />
            {isEditing ? 'Save Changes' : 'Publish Article'}
          </button>
        </div>
      </div>

      {error && (
        <div role="alert" className="ca-msg-error p-4 text-xs flex items-center gap-3">
          <AlertCircle size={16} className="shrink-0 text-clay" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div role="status" className="ca-msg-success p-4 text-xs">
          {success}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-12">
        {/* METADATA SECTION */}
        <section className="space-y-6">
          <div className="border-b border-stone/10 pb-3 flex items-center gap-2">
            <Sparkles size={16} className="text-[var(--accent-teal)]" />
            <h2 className="font-serif text-xl font-bold text-text-main">Metadata & Entity Anchor</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-text-muted">
                Article Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title..."
                className="w-full bg-transparent font-serif text-3xl sm:text-4xl font-bold text-text-main placeholder:text-stone/30 outline-none border-b border-stone/20 pb-4 focus:border-[var(--accent-teal)] transition"
              />
            </div>

            {!isEditing && (
              <div>
                <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-text-muted">
                  Connected Knowledge Entity *
                </label>
                <select
                  value={entityId}
                  onChange={(e) => setEntityId(e.target.value)}
                  required
                  className="ca-input py-3.5 text-sm"
                >
                  <option value="">Select target knowledge graph entity...</option>
                  {entities.map((ent) => (
                    <option key={ent.id} value={ent.id}>
                      {ent.name} ({ent.type})
                    </option>
                  ))}
                </select>
                <p className="mt-1.5 font-mono text-[10px] text-text-muted">
                  Mandatory domain rule: Every article must be anchored to a knowledge graph entity.
                </p>
              </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-text-muted">
                  Category Domain
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="ca-input py-3.5 text-sm"
                >
                  <option value="Archival Research">Archival Research</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Technology">Technology</option>
                  <option value="Policy">Policy</option>
                  <option value="Culture">Culture</option>
                  <option value="Trade & Economics">Trade & Economics</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-text-muted">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Policy, Archive, Heritage"
                  className="ca-input py-3.5 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-text-muted">
                Summary / Abstract *
              </label>
              <textarea
                rows={3}
                required
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Provide a concise scholarly abstract..."
                className="ca-input resize-none p-4 font-sans text-sm leading-relaxed"
              />
            </div>
          </div>
        </section>

        {/* DYNAMIC CONTENT CANVAS (EXPANSIVE & BORDERLESS) */}
        <section className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone/10 pb-4 gap-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-text-main">
                Dynamic Content Canvas
              </h2>
              <p className="mt-1 text-xs text-text-muted">
                Compose expansive body content with paragraphs, headings, blockquotes, media, and interactive maps.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 font-mono text-xs">
              <button type="button" onClick={() => addBlock('paragraph')} className="ca-btn-outline px-3 py-2">
                + Paragraph
              </button>
              <button type="button" onClick={() => addBlock('heading')} className="ca-btn-outline px-3 py-2">
                <Heading size={14} className="inline mr-1" /> Heading
              </button>
              <button type="button" onClick={() => addBlock('blockquote')} className="ca-btn-outline px-3 py-2">
                <Quote size={14} className="inline mr-1" /> Quote
              </button>
              <button type="button" onClick={() => addBlock('list')} className="ca-btn-outline px-3 py-2">
                <List size={14} className="inline mr-1" /> List
              </button>
              <button type="button" onClick={() => addBlock('image')} className="ca-btn-outline px-3 py-2">
                <ImageIcon size={14} className="inline mr-1" /> Image
              </button>
              <button type="button" onClick={() => addBlock('map')} className="ca-btn-outline px-3 py-2">
                <MapPin size={14} className="inline mr-1" /> Map
              </button>
            </div>
          </div>

          <div className="space-y-8">
            {blocks.map((block, idx) => (
              <div key={idx} className="group relative border-b border-stone/15 pb-8 last:border-b-0">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--accent-teal)]">
                    Block 0{idx + 1} — {block.type}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => moveBlock(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 rounded text-stone hover:text-text-main disabled:opacity-20 transition"
                      title="Move Up"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveBlock(idx, 'down')}
                      disabled={idx === blocks.length - 1}
                      className="p-1 rounded text-stone hover:text-text-main disabled:opacity-20 transition"
                      title="Move Down"
                    >
                      <ArrowDown size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeBlock(idx)}
                      className="p-1 rounded text-clay hover:text-[var(--accent-terracotta)] transition ml-2"
                      title="Delete Block"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {block.type === 'paragraph' && (
                  <div>
                    <textarea
                      rows={6}
                      value={block.text || ''}
                      onChange={(e) => updateBlock(idx, { text: e.target.value })}
                      placeholder="Write expansive paragraph text here..."
                      className="w-full bg-transparent font-serif text-lg leading-relaxed text-text-main placeholder:text-stone/30 outline-none resize-y min-h-[140px]"
                    />
                  </div>
                )}

                {block.type === 'heading' && (
                  <div className="grid gap-4 sm:grid-cols-[160px_1fr] items-center">
                    <select
                      value={block.level || 2}
                      onChange={(e) => updateBlock(idx, { level: Number(e.target.value) as 2 | 3 })}
                      className="ca-input py-3 text-xs font-mono"
                    >
                      <option value={2}>Heading 2 (H2)</option>
                      <option value={3}>Heading 3 (H3)</option>
                    </select>
                    <input
                      type="text"
                      value={block.text || ''}
                      onChange={(e) => updateBlock(idx, { text: e.target.value })}
                      placeholder="Section heading title..."
                      className="w-full bg-transparent font-serif text-2xl font-bold text-text-main placeholder:text-stone/30 outline-none border-b border-stone/20 pb-2 focus:border-[var(--accent-teal)]"
                    />
                  </div>
                )}

                {block.type === 'blockquote' && (
                  <div>
                    <textarea
                      rows={3}
                      value={block.text || ''}
                      onChange={(e) => updateBlock(idx, { text: e.target.value })}
                      placeholder="Enter inspiring quotation or archival excerpt..."
                      className="w-full bg-transparent font-serif italic text-xl leading-relaxed text-text-main placeholder:text-stone/30 outline-none border-l-2 border-[var(--accent-amber)] pl-4 py-2"
                    />
                  </div>
                )}

                {block.type === 'list' && (
                  <div>
                    <textarea
                      rows={5}
                      value={(block.items || []).join('\n')}
                      onChange={(e) => updateBlock(idx, { items: e.target.value.split('\n') })}
                      placeholder="Enter bullet items (one per line)..."
                      className="w-full bg-transparent font-serif text-base leading-relaxed text-text-main placeholder:text-stone/30 outline-none resize-y p-3 rounded-xl border border-stone/20 bg-surface"
                    />
                  </div>
                )}

                {block.type === 'image' && (
                  <div className="space-y-4 rounded-xl border border-stone/20 bg-surface p-6 shadow-sm">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-amber)]">
                      <ImageIcon size={16} /> Image / Media Block
                    </div>
                    <input
                      type="text"
                      value={block.url || ''}
                      onChange={(e) => updateBlock(idx, { url: e.target.value })}
                      placeholder="Image URL (e.g. /images/africa.svg or external link)..."
                      className="ca-input text-xs font-mono py-3"
                    />
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          value={block.caption || ''}
                          onChange={(e) => updateBlock(idx, { caption: e.target.value })}
                          placeholder="Figure caption & citation..."
                          className="ca-input text-xs py-3"
                        />
                      </div>
                      <div>
                        <select
                          value={block.align || 'center'}
                          onChange={(e) => updateBlock(idx, { align: e.target.value as any })}
                          className="ca-input text-xs py-3"
                        >
                          <option value="left">Align Left</option>
                          <option value="center">Align Center</option>
                          <option value="right">Align Right</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {block.type === 'map' && (
                  <div className="space-y-4 rounded-xl border border-[var(--accent-teal)]/30 bg-[var(--accent-teal)]/5 p-6 shadow-sm">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-teal)]">
                      <MapPin size={16} /> Interactive Geospatial Map Block
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        type="text"
                        value={block.title || ''}
                        onChange={(e) => updateBlock(idx, { title: e.target.value })}
                        placeholder="Map Title..."
                        className="ca-input text-sm font-bold py-3 bg-surface"
                      />
                      <input
                        type="text"
                        value={block.location || ''}
                        onChange={(e) => updateBlock(idx, { location: e.target.value })}
                        placeholder="Geographic Region / Zone..."
                        className="ca-input text-xs font-mono py-3 bg-surface"
                      />
                    </div>
                    <input
                      type="text"
                      value={block.description || ''}
                      onChange={(e) => updateBlock(idx, { description: e.target.value })}
                      placeholder="Short geospatial description..."
                      className="ca-input text-xs py-3 bg-surface"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center pt-8">
            <button
              type="button"
              onClick={() => addBlock('paragraph')}
              className="ca-btn-secondary px-8 py-3.5 text-xs font-mono uppercase tracking-wider"
            >
              <Plus size={16} /> Add Content Block
            </button>
          </div>
        </section>

        {/* BOTTOM SUBMIT BAR */}
        <div className="flex items-center justify-end gap-4 border-t border-stone/10 pt-8">
          <button
            type="button"
            onClick={() => navigate('/admin/article')}
            className="ca-btn-outline px-8 py-3.5 text-xs font-mono uppercase tracking-wider"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="ca-btn-primary px-10 py-3.5 text-xs font-mono uppercase tracking-wider flex items-center gap-2"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            <Check size={18} />
            {isEditing ? 'Save Changes' : 'Publish Dynamic Article'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ArticleEditorPage;
