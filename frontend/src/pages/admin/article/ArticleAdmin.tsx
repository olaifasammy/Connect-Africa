import { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  Search,
  Trash2,
  Loader2,
  ArrowUpRight,
} from 'lucide-react';
import { articleApi, api } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';

interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  category?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export function ArticleAdmin() {
  const { isAdmin } = useAuth();
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const fetchArticles = async () => {
    setLoading(true);
    setActionError(null);
    try {
      const data = await articleApi.getLatest(100);
      const mapped: ArticleItem[] = (data || []).map((a) => ({
        id: a.id,
        title: a.title,
        slug: a.slug,
        category: a.category || undefined,
        description: a.description || undefined,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
      }));
      setArticles(mapped);
    } catch (err: any) {
      setActionError(err.message || 'Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchArticles();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this article? (Restricted to Administrators)')) {
      return;
    }
    setActionError(null);
    setActionSuccess(null);
    try {
      await api.delete(`/article/${id}`);
      setActionSuccess('Article successfully deleted.');
      await fetchArticles();
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
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-stone/20 pb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
            Content & Article Studio
          </h1>
          <p className="mt-1 text-xs text-text-muted">
            Author, review, publish, and govern knowledge articles across Connect Africa.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert('New Article Modal')}
          className="ca-btn-primary px-4 py-2 text-xs font-mono uppercase tracking-wider"
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
      <div className="ca-card bg-surface p-4 shadow-scholar flex flex-wrap items-center justify-between gap-4">
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
      <div className="ca-card bg-surface p-6 shadow-scholar overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 gap-3 font-mono text-xs text-text-muted">
            <Loader2 className="h-5 w-5 animate-spin text-gold" />
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
                <tr className="border-b border-stone/20 font-mono text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  <th className="pb-3">Article Title</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Slug</th>
                  <th className="pb-3">Updated</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone/15">
                {filteredArticles.map((art) => (
                  <tr key={art.id} className="group transition hover:bg-stone/5">
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-gold">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-serif font-bold text-sm text-text-main group-hover:text-emerald-900 dark:group-hover:text-gold transition">
                            {art.title}
                          </p>
                          <p className="text-[11px] text-text-muted truncate max-w-md">
                            {art.description || 'No summary provided.'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="ca-badge-clay">
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

                        {isAdmin && (
                          <button
                            type="button"
                            onClick={() => handleDelete(art.id)}
                            className="ca-btn-outline p-1.5 text-clay"
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
    </div>
  );
}

export default ArticleAdmin;
