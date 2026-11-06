import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Loader2,
  Image as ImageIcon,
  MapPin,
  Heading,
  List,
  Quote,
  AlertCircle,
  Sparkles,
  BookOpen,
  Eye,
  Edit3,
  Send,
  ShieldCheck,
  Search,
  Plus,
  X,
} from 'lucide-react';
import { articleApi, api, entityApi, type EntitySummary } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';

const ENTITY_TYPES = ['Person', 'Place', 'Organization', 'Work', 'Concept', 'Event'];

export function ArticleEditorPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAdmin } = useAuth();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  // Entity Autocomplete State
  const [entityQuery, setEntityQuery] = useState('');
  const [entitySuggestions, setEntitySuggestions] = useState<EntitySummary[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<EntitySummary | null>(null);
  const [searchingEntities, setSearchingEntities] = useState(false);

  // Quick Create Entity Modal State
  const [isCreateEntityOpen, setIsCreateEntityOpen] = useState(false);
  const [newEntityName, setNewEntityName] = useState('');
  const [newEntityType, setNewEntityType] = useState('Person');
  const [newEntityDesc, setNewEntityDesc] = useState('');
  const [publishImmediately, setPublishImmediately] = useState(isAdmin);
  const [creatingEntity, setCreatingEntity] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Archival Research');
  const [summary, setSummary] = useState('');
  const [entityId, setEntityId] = useState('');
  const [tags, setTags] = useState('Policy, Archive, Heritage');
  const [markdownContent, setMarkdownContent] = useState(
`## Introduction & Historical Context
Enter your historical analysis, research findings, and comprehensive documentation here. You can write fluidly just like a professional encyclopedia or digital archive.

> "The archive is not a static repository of the past, but a living foundation for future innovation."

### Key Themes & Methodologies
- Accelerated investment in renewable energy corridors and cross-border connectivity.
- Enhanced multi-lateral cooperation and open-access scholarly citation networks.
- Strong institutional commitment to sustainable economic diversification and archival digitization.`
  );

  const errorRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    let active = true;
    const loadData = async () => {
      setLoading(true);
      try {
        if (isEditing && id) {
          const articles = await articleApi.getLatest(100);
          const found = articles.find((a) => a.id === id);
          if (found) {
            setTitle(found.title);
            setCategory(found.category || 'Archival Research');
            setSummary(found.description || '');
            if (typeof found.content === 'string') {
              try {
                const json = JSON.parse(found.content);
                if (Array.isArray(json)) {
                  const md = json.map((b: any) => {
                    if (b.type === 'heading') return `\n\n## ${b.text}`;
                    if (b.type === 'blockquote') return `\n\n> "${b.text}"`;
                    if (b.type === 'list' && Array.isArray(b.items)) return `\n\n- ${b.items.join('\n- ')}`;
                    return `\n\n${b.text || b.description || ''}`;
                  }).join('');
                  setMarkdownContent(md.trim());
                } else {
                  setMarkdownContent(found.content);
                }
              } catch {
                setMarkdownContent(found.content || found.description || '');
              }
            }
          }
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

  // Debounced Entity Search
  useEffect(() => {
    if (!entityQuery.trim() || entityQuery.trim().length < 2) {
      setEntitySuggestions([]);
      return;
    }

    let cancelled = false;
    const timer = window.setTimeout(async () => {
      setSearchingEntities(true);
      try {
        const results = await entityApi.search(entityQuery.trim());
        if (!cancelled) {
          setEntitySuggestions(results.slice(0, 8));
        }
      } catch {
        if (!cancelled) {
          setEntitySuggestions([]);
        }
      } finally {
        if (!cancelled) {
          setSearchingEntities(false);
        }
      }
    }, 250);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [entityQuery]);

  const selectEntity = (ent: EntitySummary) => {
    setSelectedEntity(ent);
    setEntityId(ent.id);
    setEntityQuery('');
    setEntitySuggestions([]);
  };

  const handleQuickCreateEntity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntityName.trim()) return;

    setCreatingEntity(true);
    try {
      const payload = {
        name: newEntityName.trim(),
        type: newEntityType,
        description: newEntityDesc.trim() || undefined,
        attributes: {},
        source: 'Article Studio',
        tags: [],
      };
      const res = await entityApi.create(payload);
      const createdId = res?.id || res?.data?.id;

      if (createdId) {
        selectEntity({
          id: createdId,
          name: newEntityName.trim(),
          type: newEntityType,
          description: newEntityDesc.trim(),
        });

        // Apply publication lifecycle workflow for the entity
        if (publishImmediately && isAdmin) {
          try {
            await api.post(`/entity/${createdId}/publish`, {});
            setSuccess(`Success: Entity "${newEntityName.trim()}" created and published immediately with confirmation.`);
          } catch {
            await api.post(`/entity/${createdId}/submit`, {});
            setSuccess(`Entity created and submitted for review (In Review).`);
          }
        } else {
          try {
            await api.post(`/entity/${createdId}/submit`, {});
            setSuccess(`Success: Entity "${newEntityName.trim()}" created and flagged as "In Review" for editors & admins.`);
          } catch {}
        }
      }

      setIsCreateEntityOpen(false);
      setNewEntityName('');
      setNewEntityDesc('');
    } catch (err: any) {
      setError(err.message || 'Failed to create new entity in the database.');
    } finally {
      setCreatingEntity(false);
    }
  };

  const insertSnippet = (snippet: string) => {
    if (!editorRef.current) return;
    const el = editorRef.current;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const text = el.value;
    const updated = text.substring(0, start) + snippet + text.substring(end);
    setMarkdownContent(updated);
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + snippet.length, start + snippet.length);
    }, 50);
  };

  const handleWorkflowAction = async (action: 'draft' | 'submit' | 'publish') => {
    setError(null);
    setSuccess(null);

    if (!title.trim()) {
      setError('Validation Error: Article title is required.');
      errorRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!summary.trim()) {
      setError('Validation Error: Summary/Abstract is required.');
      errorRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!isEditing && !entityId) {
      setError('Validation Error: Every article must be connected to a knowledge graph entity.');
      errorRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!markdownContent.trim() || markdownContent.trim().length < 20) {
      setError('Validation Error: Article body content is too short.');
      errorRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setSaving(true);

    try {
      const lines = markdownContent.split('\n');
      const blocks: any[] = [];
      let currentPara = '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('## ')) {
          if (currentPara) { blocks.push({ type: 'paragraph', text: currentPara.trim() }); currentPara = ''; }
          blocks.push({ type: 'heading', level: 2, text: trimmed.replace('## ', '') });
        } else if (trimmed.startsWith('### ')) {
          if (currentPara) { blocks.push({ type: 'paragraph', text: currentPara.trim() }); currentPara = ''; }
          blocks.push({ type: 'heading', level: 3, text: trimmed.replace('### ', '') });
        } else if (trimmed.startsWith('> ')) {
          if (currentPara) { blocks.push({ type: 'paragraph', text: currentPara.trim() }); currentPara = ''; }
          blocks.push({ type: 'blockquote', text: trimmed.replace('> ', '').replace(/"/g, '') });
        } else if (trimmed.startsWith('- ')) {
          if (currentPara) { blocks.push({ type: 'paragraph', text: currentPara.trim() }); currentPara = ''; }
          const lastBlock = blocks[blocks.length - 1];
          if (lastBlock && lastBlock.type === 'list') {
            lastBlock.items.push(trimmed.replace('- ', ''));
          } else {
            blocks.push({ type: 'list', items: [trimmed.replace('- ', '')] });
          }
        } else if (trimmed === '') {
          if (currentPara) { blocks.push({ type: 'paragraph', text: currentPara.trim() }); currentPara = ''; }
        } else {
          currentPara += (currentPara ? ' ' : '') + trimmed;
        }
      }
      if (currentPara) {
        blocks.push({ type: 'paragraph', text: currentPara.trim() });
      }

      const payload: Record<string, unknown> = {
        title: title.trim(),
        summary: summary.trim(),
        content: JSON.stringify(blocks),
        category: category.trim(),
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        expectedVersion: 1,
      };

      let targetId = id;

      if (!isEditing) {
        payload.entityId = entityId;
        const res = await api.post('/article', payload);
        targetId = res.id;
      } else {
        await api.put(`/article/${id}`, payload);
      }

      if (action === 'submit' && targetId) {
        await api.post(`/article/${targetId}/submit`, {});
        setSuccess('Workflow Status: Article successfully submitted for review.');
      } else if (action === 'publish' && targetId) {
        try { await api.post(`/article/${targetId}/submit`, {}); } catch {}
        if (isAdmin) {
          try { await api.post(`/article/${targetId}/approve`, {}); } catch {}
        }
        await api.post(`/article/${targetId}/publish`, {});
        setSuccess('Workflow Status: Article successfully approved & published to knowledge graph!');
      } else {
        setSuccess('Workflow Status: Article draft saved successfully.');
      }

      setTimeout(() => {
        navigate('/admin/article');
      }, 1500);
    } catch (err: any) {
      setError(`Workflow Execution Failed: ${err.message || 'Backend transaction rejected.'}`);
      errorRef.current?.scrollIntoView({ behavior: 'smooth' });
    } finally {
      setSaving(false);
    }
  };

  const renderRichPreview = () => {
    const lines = markdownContent.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={elements.length} className="list-disc pl-6 space-y-2 font-serif text-lg my-4 text-text-main">
            {listItems.map((li, i) => <li key={i}>{li}</li>)}
          </ul>
        );
        listItems = [];
      }
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={idx} className="font-serif text-3xl font-bold tracking-tight text-text-main mt-8 mb-4">
            {trimmed.replace('## ', '')}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={idx} className="font-serif text-2xl font-bold tracking-tight text-text-main mt-6 mb-3">
            {trimmed.replace('### ', '')}
          </h3>
        );
      } else if (trimmed.startsWith('> ')) {
        flushList();
        elements.push(
          <blockquote key={idx} className="border-l-2 border-[var(--accent-amber)] pl-6 py-2 my-6 font-serif italic text-xl text-text-muted">
            {trimmed.replace('> ', '').replace(/"/g, '')}
          </blockquote>
        );
      } else if (trimmed.startsWith('- ')) {
        listItems.push(trimmed.replace('- ', ''));
      } else if (trimmed === '') {
        flushList();
      } else {
        flushList();
        elements.push(
          <p key={idx} className="font-serif text-lg leading-relaxed text-text-main mb-4">
            {trimmed}
          </p>
        );
      }
    });
    flushList();
    return elements;
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center font-mono text-xs text-text-muted">
        <Loader2 className="mr-2 h-5 w-5 animate-spin text-[var(--accent-teal)]" />
        Loading master editor workspace...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-10 font-sans pb-32 pt-6 px-4 sm:px-6" ref={errorRef}>
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
            <p className="ca-eyebrow">Enterprise Lifecycle Studio</p>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
              {isEditing ? 'Edit Publication' : 'Author Publication'}
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className="ca-btn-outline px-4 py-2.5 uppercase tracking-wider flex items-center gap-2"
          >
            {previewMode ? <Edit3 size={14} /> : <Eye size={14} />}
            {previewMode ? 'Editor' : 'Preview'}
          </button>

          <button
            type="button"
            onClick={() => handleWorkflowAction('draft')}
            disabled={saving}
            className="ca-btn-outline px-4 py-2.5 uppercase tracking-wider"
          >
            Save Draft
          </button>

          <button
            type="button"
            onClick={() => handleWorkflowAction('submit')}
            disabled={saving}
            className="ca-btn-secondary px-4 py-2.5 uppercase tracking-wider flex items-center gap-1.5"
          >
            <Send size={13} /> Submit for Review
          </button>

          <button
            type="button"
            onClick={() => handleWorkflowAction('publish')}
            disabled={saving}
            className="ca-btn-primary px-5 py-2.5 uppercase tracking-wider flex items-center gap-1.5"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            <ShieldCheck size={14} /> Publish
          </button>
        </div>
      </div>

      {error && (
        <div role="alert" className="ca-msg-error p-4 text-xs flex items-center gap-3 animate-pulse">
          <AlertCircle size={18} className="shrink-0 text-clay" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {success && (
        <div role="status" className="ca-msg-success p-4 text-xs font-semibold">
          {success}
        </div>
      )}

      <div className="space-y-12">
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
              <div className="relative">
                <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-text-muted">
                  Connected Knowledge Entity (Search Millions) *
                </label>

                {selectedEntity ? (
                  <div className="flex items-center justify-between rounded-xl border border-[var(--accent-teal)]/40 bg-[var(--accent-teal)]/5 p-3.5">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-[var(--accent-teal)]/20 text-[var(--accent-teal)] flex items-center justify-center font-bold text-xs font-mono">
                        {selectedEntity.type?.charAt(0) || 'E'}
                      </div>
                      <div>
                        <p className="font-serif font-bold text-sm text-text-main">{selectedEntity.name}</p>
                        <p className="font-mono text-[10px] uppercase text-text-muted">{selectedEntity.type} · ID: {selectedEntity.id}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setSelectedEntity(null); setEntityId(''); }}
                      className="text-xs font-mono text-stone hover:text-text-main underline"
                    >
                      Change Entity
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="relative flex items-center">
                      <Search className="absolute left-3.5 text-stone" size={16} />
                      <input
                        type="text"
                        value={entityQuery}
                        onChange={(e) => setEntityQuery(e.target.value)}
                        placeholder="Type to search millions of entities (e.g. Mansa Musa, Timbuktu)..."
                        className="ca-input pl-10 py-3.5 text-sm"
                      />
                      {searchingEntities && (
                        <Loader2 className="absolute right-3.5 animate-spin text-[var(--accent-teal)]" size={16} />
                      )}
                    </div>

                    {entitySuggestions.length > 0 && (
                      <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-64 overflow-y-auto rounded-xl border border-stone/20 bg-surface shadow-xl font-sans">
                        {entitySuggestions.map((ent) => (
                          <button
                            key={ent.id}
                            type="button"
                            onClick={() => selectEntity(ent)}
                            className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-stone/10 border-b border-stone/10 last:border-0"
                          >
                            <div>
                              <p className="font-serif font-bold text-sm text-text-main">{ent.name}</p>
                              <p className="font-mono text-[10px] text-text-muted">{ent.description || ent.type}</p>
                            </div>
                            <span className="ca-badge-emerald shrink-0">{ent.type}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="mt-3 flex items-center justify-between">
                      <p className="font-mono text-[10px] text-text-muted">
                        Every article must be anchored to an entity in the knowledge graph.
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsCreateEntityOpen(true)}
                        className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[var(--accent-teal)] hover:underline"
                      >
                        <Plus size={14} /> Create New
                      </button>
                    </div>
                  </div>
                )}
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

        {/* MASTER WIKIPEDIA-GRADE RICH TEXT WORKSPACE */}
        <section className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone/10 pb-4 gap-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-text-main">
                Master Publication Editor
              </h2>
              <p className="mt-1 text-xs text-text-muted">
                Write fluently with markdown or use quick insertion tools for headings, quotes, lists, media, and maps.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 font-mono text-xs">
              <button type="button" onClick={() => insertSnippet('\n\n## Section Heading\n')} className="ca-btn-outline px-3 py-2">
                <Heading size={14} className="inline mr-1" /> Heading
              </button>
              <button type="button" onClick={() => insertSnippet('\n\n> "Inspirational quote or epigraph here..."\n')} className="ca-btn-outline px-3 py-2">
                <Quote size={14} className="inline mr-1" /> Quote
              </button>
              <button type="button" onClick={() => insertSnippet('\n\n- First point\n- Second point\n')} className="ca-btn-outline px-3 py-2">
                <List size={14} className="inline mr-1" /> List
              </button>
              <button type="button" onClick={() => insertSnippet('\n\n[Figure: /images/africa.svg | Caption: Continental Map]\n')} className="ca-btn-outline px-3 py-2">
                <ImageIcon size={14} className="inline mr-1" /> Image
              </button>
              <button type="button" onClick={() => insertSnippet('\n\n[Map: Trans-Sahara Trade Network | Region: Sahel & West Africa]\n')} className="ca-btn-outline px-3 py-2">
                <MapPin size={14} className="inline mr-1" /> Map
              </button>
            </div>
          </div>

          {previewMode ? (
            <div className="rounded-2xl border border-stone/20 bg-surface p-8 shadow-sm min-h-[400px]">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--accent-teal)] border-b border-stone/10 pb-3 mb-6">
                <BookOpen size={16} /> Live Encyclopedia Preview Mode
              </div>
              <article className="max-w-2xl mx-auto">
                <h1 className="font-serif text-4xl font-bold text-text-main mb-4">{title || 'Untitled Article'}</h1>
                <p className="font-serif text-xl italic text-text-muted mb-8">{summary || 'No summary provided.'}</p>
                <div className="space-y-4">
                  {renderRichPreview()}
                </div>
              </article>
            </div>
          ) : (
            <div className="rounded-2xl border border-stone/20 bg-surface p-6 shadow-sm">
              <textarea
                ref={editorRef}
                rows={18}
                required
                value={markdownContent}
                onChange={(e) => setMarkdownContent(e.target.value)}
                placeholder="Write your article in fluent Markdown / text..."
                className="w-full bg-transparent font-serif text-lg leading-relaxed text-text-main placeholder:text-stone/30 outline-none resize-y admin-scrollbar"
              />
              <div className="mt-4 flex items-center justify-between border-t border-stone/10 pt-3 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                <span>Markdown Syntax Supported (## Heading, &gt; Quote, - List)</span>
                <span>{markdownContent.length} characters</span>
              </div>
            </div>
          )}
        </section>

        {/* BOTTOM WORKFLOW BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone/10 pt-8">
          <button
            type="button"
            onClick={() => navigate('/admin/article')}
            className="ca-btn-outline px-8 py-3.5 text-xs font-mono uppercase tracking-wider w-full sm:w-auto"
          >
            Cancel / Back
          </button>
          
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => handleWorkflowAction('draft')}
              disabled={saving}
              className="ca-btn-outline px-6 py-3.5 text-xs font-mono uppercase tracking-wider flex-1 sm:flex-initial"
            >
              Save Draft
            </button>
            <button
              type="button"
              onClick={() => handleWorkflowAction('submit')}
              disabled={saving}
              className="ca-btn-secondary px-6 py-3.5 text-xs font-mono uppercase tracking-wider flex-1 sm:flex-initial flex items-center justify-center gap-1.5"
            >
              <Send size={13} /> Submit for Review
            </button>
            <button
              type="button"
              onClick={() => handleWorkflowAction('publish')}
              disabled={saving}
              className="ca-btn-primary px-8 py-3.5 text-xs font-mono uppercase tracking-wider flex-1 sm:flex-initial flex items-center justify-center gap-1.5"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              <ShieldCheck size={14} /> Publish Now
            </button>
          </div>
        </div>
      </div>

      {/* QUICK CREATE ENTITY MODAL */}
      {isCreateEntityOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-stone/20 bg-surface p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone/10 pb-4">
              <h3 className="font-serif text-xl font-bold text-text-main">Create New Knowledge Entity</h3>
              <button
                type="button"
                onClick={() => setIsCreateEntityOpen(false)}
                className="rounded-lg p-2 text-text-muted hover:bg-stone/10 hover:text-text-main"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleQuickCreateEntity} className="mt-6 space-y-4 font-sans">
              <div>
                <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                  Entity Name *
                </label>
                <input
                  type="text"
                  required
                  value={newEntityName}
                  onChange={(e) => setNewEntityName(e.target.value)}
                  placeholder="e.g. Queen Amina of Zazzau"
                  className="ca-input py-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                  Entity Type *
                </label>
                <select
                  value={newEntityType}
                  onChange={(e) => setNewEntityType(e.target.value)}
                  className="ca-input py-3"
                >
                  {ENTITY_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                  Short Description
                </label>
                <textarea
                  rows={3}
                  value={newEntityDesc}
                  onChange={(e) => setNewEntityDesc(e.target.value)}
                  placeholder="Brief historical context or definition..."
                  className="ca-input resize-none p-3 text-xs"
                />
              </div>

              {isAdmin && (
                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="publish-immediately"
                    checked={publishImmediately}
                    onChange={(e) => setPublishImmediately(e.target.checked)}
                    className="h-4 w-4 rounded border-stone/30 accent-[var(--accent-teal)]"
                  />
                  <label htmlFor="publish-immediately" className="font-sans text-xs text-text-main cursor-pointer">
                    Publish entity immediately with confirmation toast
                  </label>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 border-t border-stone/10 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCreateEntityOpen(false)}
                  className="ca-btn-outline px-5 py-2 text-xs font-mono uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingEntity}
                  className="ca-btn-primary px-6 py-2 text-xs font-mono uppercase tracking-wider flex items-center gap-2"
                >
                  {creatingEntity && <Loader2 className="h-4 w-4 animate-spin" />}
                  <Plus size={14} /> Create & Connect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticleEditorPage;
