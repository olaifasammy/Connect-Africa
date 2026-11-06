import { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  Search,
  Trash2,
  Loader2,
  ArrowUpRight,
  X,
  Check,
  Edit3,
} from 'lucide-react';
import { articleApi, api, entityApi, type EntitySummary } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';

interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  category?: string;
  description?: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
}

export function ArticleAdmin() {
  const { isAdmin } = useAuth();
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [entities, setEntities] = useState<EntitySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Editor Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Archival Research');
  const [summary, setSummary] = useState('');
  const [bodyContent, setBodyContent] = useState('');
  const [entityId, setEntityId] = useState('');
  const [tags, setTags] = useState('Policy, Archive, Heritage');
  const [saving, setSaving] = useState(false);

  const fetchArticlesAndEntities = async () => {
    setLoading(true);
    setActionError(null);
    try {
      const [articleData, entityData] = await Promise.all([
        articleApi.getLatest(100),
        entityApi.list(100).catch(() => []),
      ]);

      const mapped: ArticleItem[] = (articleData || []).map((a) => ({
        id: a.id,
        title: a.title,
        slug: a.slug,
        category: a.category || 'Archival Research',
        description: a.description || undefined,
        content: a.content || undefined,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
      }));
      setArticles(mapped);
      setEntities(entityData || []);
    } catch (err: any) {
      setActionError(err.message || 'Failed to fetch studio data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchArticlesAndEntities();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setTitle('');
    setCategory('Archival Research');
    setSummary('');
    setBodyContent('');
    setEntityId(entities[0]?.id || '');
    setTags('Policy, Archive, Heritage');
    setIsModalOpen(true);
  };

  const openEditModal = (art: ArticleItem) => {
    setEditingId(art.id);
    setTitle(art.title);
    setCategory(art.category || 'Archival Research');
    setSummary(art.description || '');
    setBodyContent(art.content || '');
    setEntityId(entities[0]?.id || '');
    setTags('Policy, Archive, Heritage');
    setIsModalOpen(true);
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) {
      setActionError('Title and summary are required.');
      return;
    }

    if (!editingId && !entityId) {
      setActionError('An article must be connected to a knowledge entity.');
      return;
    }

    setSaving(true);
    setActionError(null);
    setActionSuccess(null);

    try {
      const payload: Record<string, unknown> = {
        title: title.trim(),
        summary: summary.trim(),
        content: bodyContent.trim() || summary.trim(),
        category: category.trim(),
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      };

      if (!editingId) {
        payload.entityId = entityId;
        await api.post('/article', payload);
        setActionSuccess('Article successfully created and linked to entity.');
      } else {
        await api.put(`/article/${editingId}`, payload);
        setActionSuccess('Article successfully updated.');
      }

      setIsModalOpen(false);
      await fetchArticlesAndEntities();
    } catch (err: any) {
      setActionError(err.message || 'Failed to save article.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this article?')) {
      return;
    }
    setActionError(null);
    setActionSuccess(null);
    try {
      await api.delete(`/article/${id}`);
      setActionSuccess('Article successfully deleted.');
      await fetchArticlesAndEntities();
    } catch (err: any) {
      setActionError(err.message || 'Failed to delete article. Insufficient permissions.');
    }
  };

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.category && a.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-stone/10 pb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
            Content & Article Studio
          </h1>
          <p className="mt-1 text-xs text-text-muted">
            Author, review, publish, and govern knowledge articles connected to the graph across Connect Africa.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="ca-btn-primary px-4 py-2.5 text-xs font-mono uppercase tracking-wider"
        >
          <Plus className="h-4 w-4" />
          <span>New Article</span>
        </button>
      </div>

      {actionError && (
        <div role="alert" className="ca-msg-error font-mono text-xs">
          {actionError}
        </div>
      )}

      {actionSuccess && (
        <div role="status" className="ca-msg-success font-mono text-xs">
          {actionSuccess}
        </div>
      )}

      {/* Search and Filter */}
      <div className="ca-card bg-surface p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 max-w-md rounded-xl border border-stone/20 bg-canvas px-3.5 py-2">
          <Search className="h-4 w-4 text-stone" />
          <input
            type="text"
            placeholder="Search articles by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-xs text-text-main placeholder:text-stone/50 focus:outline-none"
          />
        </div>
        <div className="font-mono text-xs text-text-muted">
          Showing <span className="text-text-main font-bold">{filteredArticles.length}</span> articles
        </div>
      </div>

      {/* Articles Table */}
      <div className="ca-card bg-surface p-6 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 gap-3 font-mono text-xs text-text-muted">
            <Loader2 className="h-5 w-5 animate-spin text-[var(--accent-teal)]" />
            Loading articles from database...
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="py-16 text-center font-mono text-xs text-text-muted">
            No articles found matching your search term.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-text-main font-sans">
              <thead>
                <tr className="border-b border-stone/10 font-mono text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  <th className="pb-3">Article Title</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Slug</th>
                  <th className="pb-3">Updated</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone/10">
                {filteredArticles.map((art) => (
                  <tr key={art.id} className="group transition hover:bg-stone/5">
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-stone/20 bg-stone/5 text-text-main">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-serif font-bold text-sm text-text-main group-hover:text-[var(--accent-teal)] transition">
                            {art.title}
                          </p>
                          <p className="text-[11px] text-text-muted truncate max-w-md">
                            {art.description || 'No summary provided.'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="ca-badge-emerald">
                        {art.category || 'Research'}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 font-mono text-[11px] text-text-muted">
                      {art.slug}
                    </td>
                    <td className="py-3.5 pr-4 font-mono text-text-muted">
                      {art.updatedAt ? new Date(art.updatedAt).toLocaleDateString() : 'Recent'}
                    </td>
                    <td className="py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2 font-mono">
                        <a
                          href={`/articles/${encodeURIComponent(art.slug)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="ca-btn-outline p-1.5"
                          title="View live article"
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>

                        <button
                          type="button"
                          onClick={() => openEditModal(art)}
                          className="ca-btn-outline p-1.5"
                          title="Edit Article"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>

                        {isAdmin && (
                          <button
                            type="button"
                            onClick={() => handleDelete(art.id)}
                            className="ca-btn-outline p-1.5 text-clay hover:text-[var(--accent-terracotta)]"
                            title="Delete Article"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ARTICLE CREATION / EDITING MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-2xl border border-stone/20 bg-surface p-6 shadow-2xl max-h-[90vh] overflow-y-auto admin-scrollbar">
            <div className="flex items-center justify-between border-b border-stone/10 pb-4">
              <h2 className="font-serif text-2xl font-bold text-text-main">
                {editingId ? 'Edit Article Record' : 'Create New Article Record'}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-2 text-text-muted hover:bg-stone/10 hover:text-text-main"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="mt-6 space-y-5 font-sans">
              <div>
                <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Renewable Energy Infrastructure in East Africa"
                  className="ca-input"
                />
              </div>

              {!editingId && (
                <div>
                  <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                    Connected Knowledge Entity *
                  </label>
                  <select
                    value={entityId}
                    onChange={(e) => setEntityId(e.target.value)}
                    required
                    className="ca-input"
                  >
                    <option value="">Select target knowledge entity...</option>
                    {entities.map((ent) => (
                      <option key={ent.id} value={ent.id}>
                        {ent.name} ({ent.type})
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 font-mono text-[10px] text-text-muted">
                    Every article must be anchored to an entity in the knowledge graph.
                  </p>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                    Category Domain
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="ca-input"
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
                  <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Policy, Archive, Heritage"
                    className="ca-input"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                  Summary / Abstract *
                </label>
                <textarea
                  rows={3}
                  required
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Provide a concise summary of the publication..."
                  className="ca-input resize-none"
                />
              </div>

              <div>
                <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                  Body Content / Paragraphs
                </label>
                <textarea
                  rows={8}
                  value={bodyContent}
                  onChange={(e) => setBodyContent(e.target.value)}
                  placeholder="Enter full article body text, headings, or structured notes..."
                  className="ca-input font-serif text-base"
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-stone/10 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="ca-btn-outline px-5 py-2.5 text-xs font-mono uppercase tracking-wider"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="ca-btn-primary px-6 py-2.5 text-xs font-mono uppercase tracking-wider flex items-center gap-2"
                >
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  <Check size={14} />
                  {editingId ? 'Update Record' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticleAdmin;
