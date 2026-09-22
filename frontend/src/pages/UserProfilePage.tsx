import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Check,
  Edit3,
  Globe,
  History,
  Lock,
  Mail,
  MapPin,
  Save,
  Settings,
  Shield,
  UserRound,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { profileApi, type UserProfileData } from '../services/api';

export const UserProfilePage: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  // Form state
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [country, setCountry] = useState('');
  const [website, setWebsite] = useState('');
  const [languagesInput, setLanguagesInput] = useState('');
  const [expertiseInput, setExpertiseInput] = useState('');
  const [researchInput, setResearchInput] = useState('');

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await profileApi.getProfile();
        if (active && data) {
          setProfile(data);
          setDisplayName(data.displayName || '');
          setBio(data.bio || '');
          setAvatarUrl(data.avatarUrl || '');
          setCountry(data.country || '');
          setWebsite(data.website || '');
          setLanguagesInput(data.languages?.join(', ') || '');
          setExpertiseInput(data.expertise?.join(', ') || '');
          setResearchInput(data.researchInterests?.join(', ') || '');
        }
      } catch {
        if (active) {
          const fallbackName =
            [user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
            user?.email?.split('@')[0] ||
            'Connect-Africa Scholar';
          setDisplayName(fallbackName);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadProfile();

    return () => {
      active = false;
    };
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError('');
      setNotice('');

      const languages = languagesInput
        ? languagesInput.split(',').map((s) => s.trim()).filter(Boolean)
        : undefined;
      const expertise = expertiseInput
        ? expertiseInput.split(',').map((s) => s.trim()).filter(Boolean)
        : undefined;
      const researchInterests = researchInput
        ? researchInput.split(',').map((s) => s.trim()).filter(Boolean)
        : undefined;

      await profileApi.updateProfile({
        displayName,
        bio,
        avatarUrl,
        country,
        website,
        languages,
        expertise,
        researchInterests,
      });

      const updated = await profileApi.getProfile();
      setProfile(updated);
      setNotice('Profile record updated successfully.');
      setEditing(false);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile record.');
    } finally {
      setSaving(false);
    }
  };

  const resolvedDisplayName =
    profile?.displayName ||
    [user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
    user?.email?.split('@')[0] ||
    'Connect-Africa Scholar';

  const initials =
    resolvedDisplayName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) ||
    user?.email?.[0]?.toUpperCase() ||
    'C';

  const roles = user?.roles?.length ? user.roles : ['USER'];

  if (loading) {
    return (
      <div className="min-h-screen bg-scholar-canvas bg-canvas pb-20 pt-10 text-text-main sm:pt-14 font-sans">
        <div className="ca-container">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-40 rounded bg-stone/20" />
            <div className="h-64 rounded-xl bg-surface border border-stone/20" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-scholar-canvas bg-canvas pb-20 pt-8 text-text-main sm:pt-12 font-sans transition-colors duration-300">
      <div className="ca-container space-y-6">
        {/* Banner Section */}
        <section className="ca-card bg-surface shadow-scholar">
          <div className="relative border-b border-stone/15 pb-8">
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                {profile?.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={resolvedDisplayName}
                    className="h-20 w-20 shrink-0 rounded-xl border border-stone/20 object-cover shadow-sm"
                  />
                ) : (
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 font-serif text-2xl font-bold text-gold">
                    {initials}
                  </div>
                )}

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="ca-eyebrow">Archival Profile Record</p>
                    {profile?.country && (
                      <span className="ca-badge-gold">
                        <MapPin className="h-3 w-3 mr-1 text-gold" />
                        {profile.country}
                      </span>
                    )}
                  </div>
                  <h1 className="mt-1 font-serif text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
                    {resolvedDisplayName}
                  </h1>

                  {user?.email && (
                    <div className="mt-2 flex items-center gap-2 font-mono text-xs text-text-muted">
                      <Mail className="h-3.5 w-3.5 shrink-0 text-stone" />
                      <span className="truncate">{user.email}</span>
                    </div>
                  )}

                  {profile?.bio && (
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-muted font-sans">
                      {profile.bio}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setEditing(!editing)}
                className="ca-btn-secondary h-10 px-4 text-xs font-semibold"
              >
                {editing ? <X className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                {editing ? 'Cancel Editing' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {(error || notice) && (
            <div className="pt-4">
              {error && (
                <div className="ca-msg-error">
                  {error}
                </div>
              )}
              {notice && (
                <div className="ca-msg-success">
                  <Check className="h-4 w-4" />
                  {notice}
                </div>
              )}
            </div>
          )}

          {editing ? (
            <form onSubmit={handleSave} className="pt-6 space-y-6">
              <h2 className="font-serif text-xl font-bold text-text-main">Edit Profile Information</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                    className="ca-input mt-2"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Avatar URL
                  </label>
                  <input
                    type="url"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                    className="ca-input mt-2"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Bio / Scholar Summary
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    placeholder="Brief summary of academic or community interests..."
                    className="ca-input mt-2"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Country
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. Kenya, Nigeria, Senegal"
                    className="ca-input mt-2"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Academic / Personal Website
                  </label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://yourwebsite.com"
                    className="ca-input mt-2"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Languages (comma separated)
                  </label>
                  <input
                    type="text"
                    value={languagesInput}
                    onChange={(e) => setLanguagesInput(e.target.value)}
                    placeholder="Swahili, English, French, Yoruba"
                    className="ca-input mt-2"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Expertise Domains (comma separated)
                  </label>
                  <input
                    type="text"
                    value={expertiseInput}
                    onChange={(e) => setExpertiseInput(e.target.value)}
                    placeholder="Ontology, Archival Science, Policy"
                    className="ca-input mt-2"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Research Interests (comma separated)
                  </label>
                  <input
                    type="text"
                    value={researchInput}
                    onChange={(e) => setResearchInput(e.target.value)}
                    placeholder="Trans-Saharan Trade Routes, Swahili Archaeology"
                    className="ca-input mt-2"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-stone/15">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="ca-btn-outline px-5 py-2 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="ca-btn-primary px-5 py-2 text-xs"
                >
                  <Save className="h-4 w-4" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            <div className="grid gap-6 pt-6 lg:grid-cols-2">
              <div className="space-y-6">
                <div className="rounded-xl border border-stone/20 bg-canvas p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-900/30 bg-emerald-100/40 text-emerald-900 dark:text-emerald-300">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="ca-eyebrow">Access Authority</p>
                      <h2 className="font-serif text-base font-bold text-text-main">
                        Assigned Platform Roles
                      </h2>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {roles.map((role) => (
                      <span key={role} className="ca-badge-emerald">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-stone/20 bg-canvas p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-gold">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="ca-eyebrow">Provenance</p>
                      <h2 className="font-serif text-base font-bold text-text-main">
                        Regional & Contact Details
                      </h2>
                    </div>
                  </div>

                  <dl className="mt-4 space-y-3 font-sans text-xs">
                    <div className="flex items-start justify-between gap-6 border-b border-stone/15 pb-2">
                      <dt className="text-text-muted">Country</dt>
                      <dd className="font-medium text-text-main">{profile?.country || 'Not specified'}</dd>
                    </div>

                    <div className="flex items-start justify-between gap-6 border-b border-stone/15 pb-2">
                      <dt className="text-text-muted">Website</dt>
                      <dd className="max-w-[60%] truncate font-medium text-text-main">
                        {profile?.website ? (
                          <a href={profile.website} target="_blank" rel="noreferrer" className="ca-article-link">
                            {profile.website}
                          </a>
                        ) : (
                          'Not specified'
                        )}
                      </dd>
                    </div>

                    <div className="flex items-start justify-between gap-6 border-b border-stone/15 pb-2">
                      <dt className="text-text-muted">Languages</dt>
                      <dd className="font-medium text-text-main">
                        {profile?.languages?.length ? profile.languages.join(', ') : 'Not specified'}
                      </dd>
                    </div>

                    <div className="flex items-start justify-between gap-6">
                      <dt className="text-text-muted">Email</dt>
                      <dd className="font-mono text-text-main">{user?.email || 'Not available'}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-xl border border-stone/20 bg-canvas p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-clay/30 bg-clay/10 text-clay">
                      <UserRound className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="ca-eyebrow">Domains</p>
                      <h2 className="font-serif text-base font-bold text-text-main">
                        Professional Expertise
                      </h2>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {profile?.expertise?.length ? (
                      profile.expertise.map((item) => (
                        <span key={item} className="ca-badge-clay">
                          {item}
                        </span>
                      ))
                    ) : (
                      <p className="text-xs text-text-muted">No expertise specified.</p>
                    )}
                  </div>
                </div>

                <div className="rounded-xl border border-stone/20 bg-canvas p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-gold">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="ca-eyebrow">Research Agenda</p>
                      <h2 className="font-serif text-base font-bold text-text-main">
                        Research Interests
                      </h2>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {profile?.researchInterests?.length ? (
                      profile.researchInterests.map((item) => (
                        <span key={item} className="ca-badge-gold">
                          {item}
                        </span>
                      ))
                    ) : (
                      <p className="text-xs text-text-muted">No research interests specified.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="border-t border-stone/15 pt-6 mt-6">
            <div className="flex flex-wrap gap-3 font-mono text-xs">
              <Link to="/account" className="ca-btn-primary px-4 py-2 text-xs">
                <Settings className="h-4 w-4" />
                Account Center
              </Link>

              <Link to="/account/settings" className="ca-btn-outline px-4 py-2 text-xs">
                Settings
              </Link>

              <Link to="/account/security" className="ca-btn-outline px-4 py-2 text-xs">
                <Lock className="h-4 w-4 text-gold" />
                Security & MFA
              </Link>

              <Link to="/account/history" className="ca-btn-outline px-4 py-2 text-xs">
                <History className="h-4 w-4 text-gold" />
                Reading History
              </Link>

              {isAdmin && (
                <Link to="/admin" className="ca-btn-secondary px-4 py-2 text-xs">
                  Administration
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserProfilePage;
