import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  Mail,
  MapPin,
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
      <div className="min-h-screen bg-canvas pb-20 pt-10 text-text-main sm:pt-14 font-sans">
        <div className="ca-container">
          <div className="animate-pulse space-y-12">
            <div className="h-8 w-40 rounded bg-stone/10" />
            <div className="h-64 rounded-xl bg-stone/5" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas pb-24 pt-8 text-text-main sm:pt-12 font-sans transition-colors duration-300">
      <div className="ca-container">
        {/* Header Section */}
        <header className="mb-16 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between border-b border-stone/10 pb-12">
          <div className="flex flex-col gap-10 sm:flex-row sm:items-center">
            {profile?.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={resolvedDisplayName}
                className="h-24 w-24 shrink-0 rounded-full border border-stone/10 object-cover shadow-sm"
              />
            ) : (
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-stone/10 bg-stone/5 font-serif text-3xl font-bold text-text-muted">
                {initials}
              </div>
            )}

            <div className="min-w-0">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-text-muted">
                <p>Archival Profile Record</p>
                {profile?.country && (
                  <>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {profile.country}
                    </span>
                  </>
                )}
              </div>
              <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-text-main sm:text-5xl lg:text-6xl">
                {resolvedDisplayName}
              </h1>

              {user?.email && (
                <div className="mt-4 flex items-center gap-2 font-mono text-xs text-text-muted">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
              )}

              {profile?.bio && (
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted font-sans">
                  {profile.bio}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setEditing(!editing)}
            className="rounded-full border border-stone/10 px-6 py-2 text-sm font-medium transition hover:border-text-main"
          >
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        </header>

        {(error || notice) && (
          <div className="mb-10">
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
          <form onSubmit={handleSave} className="max-w-4xl space-y-12">
            <div className="mb-8">
              <h2 className="font-serif text-3xl font-bold text-text-main">Update Profile.</h2>
              <p className="mt-2 font-sans text-sm text-text-muted">Maintain your scholarly record and identity within the platform archive.</p>
            </div>

            <div className="grid gap-12 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  className="w-full border-b border-stone/20 bg-transparent py-2 font-serif text-xl outline-none focus:border-text-main transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                  Avatar URL
                </label>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full border-b border-stone/20 bg-transparent py-2 font-sans text-sm outline-none focus:border-text-main transition-colors"
                />
              </div>

              <div className="sm:col-span-2 space-y-2">
                <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                  Bio / Scholar Summary
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  placeholder="Brief summary of academic or community interests..."
                  className="w-full border-b border-stone/20 bg-transparent py-2 font-sans text-sm outline-none focus:border-text-main transition-colors resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                  Country
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. Kenya, Nigeria, Senegal"
                  className="w-full border-b border-stone/20 bg-transparent py-2 font-sans text-sm outline-none focus:border-text-main transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                  Website
                </label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  className="w-full border-b border-stone/20 bg-transparent py-2 font-sans text-sm outline-none focus:border-text-main transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                  Languages
                </label>
                <input
                  type="text"
                  value={languagesInput}
                  onChange={(e) => setLanguagesInput(e.target.value)}
                  placeholder="Swahili, English, French"
                  className="w-full border-b border-stone/20 bg-transparent py-2 font-sans text-sm outline-none focus:border-text-main transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                  Expertise Domains
                </label>
                <input
                  type="text"
                  value={expertiseInput}
                  onChange={(e) => setExpertiseInput(e.target.value)}
                  placeholder="Ontology, Archival Science"
                  className="w-full border-b border-stone/20 bg-transparent py-2 font-sans text-sm outline-none focus:border-text-main transition-colors"
                />
              </div>

              <div className="sm:col-span-2 space-y-2">
                <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                  Research Interests
                </label>
                <input
                  type="text"
                  value={researchInput}
                  onChange={(e) => setResearchInput(e.target.value)}
                  placeholder="Trans-Saharan Trade Routes, Swahili Archaeology"
                  className="w-full border-b border-stone/20 bg-transparent py-2 font-sans text-sm outline-none focus:border-text-main transition-colors"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-10">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="rounded-full border border-stone/10 px-8 py-3 text-sm font-medium transition hover:border-text-main"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-text-main px-8 py-3 text-sm font-medium text-white transition hover:bg-stone/80"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        ) : (
          <div className="grid gap-20 lg:grid-cols-2">
            <div className="space-y-16">
              <section>
                <div className="mb-6">
                  <p className="ca-eyebrow">Access Authority</p>
                  <h2 className="font-serif text-2xl font-bold text-text-main">
                    Platform Roles.
                  </h2>
                </div>

                <div className="flex flex-wrap gap-3">
                  {roles.map((role) => (
                    <span key={role} className="rounded-full border border-stone/10 px-4 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                      {role}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <div className="mb-6">
                  <p className="ca-eyebrow">Provenance</p>
                  <h2 className="font-serif text-2xl font-bold text-text-main">
                    Contact Details.
                  </h2>
                </div>

                <dl className="space-y-6 font-sans text-sm">
                  <div className="flex items-start justify-between gap-6 border-b border-stone/10 pb-4">
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-text-muted">Country</dt>
                    <dd className="font-serif text-lg font-bold text-text-main">{profile?.country || 'Not specified'}</dd>
                  </div>

                  <div className="flex items-start justify-between gap-6 border-b border-stone/10 pb-4">
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-text-muted">Website</dt>
                    <dd className="max-w-[60%] truncate font-serif text-lg font-bold text-text-main">
                      {profile?.website ? (
                        <a href={profile.website} target="_blank" rel="noreferrer" className="hover:text-text-muted transition-colors underline underline-offset-4 decoration-stone/20">
                          {profile.website}
                        </a>
                      ) : (
                        'Not specified'
                      )}
                    </dd>
                  </div>

                  <div className="flex items-start justify-between gap-6 border-b border-stone/10 pb-4">
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-text-muted">Languages</dt>
                    <dd className="font-serif text-lg font-bold text-text-main text-right">
                      {profile?.languages?.length ? profile.languages.join(', ') : 'Not specified'}
                    </dd>
                  </div>

                  <div className="flex items-start justify-between gap-6">
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-text-muted">Email</dt>
                    <dd className="font-mono text-sm text-text-main">{user?.email || 'Not available'}</dd>
                  </div>
                </dl>
              </section>
            </div>

            <div className="space-y-16">
              <section>
                <div className="mb-6">
                  <p className="ca-eyebrow">Domains</p>
                  <h2 className="font-serif text-2xl font-bold text-text-main">
                    Professional Expertise.
                  </h2>
                </div>

                <div className="flex flex-wrap gap-3">
                  {profile?.expertise?.length ? (
                    profile.expertise.map((item) => (
                      <span key={item} className="rounded-full border border-stone/10 px-4 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                        {item}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-text-muted">No expertise specified.</p>
                  )}
                </div>
              </section>

              <section>
                <div className="mb-6">
                  <p className="ca-eyebrow">Research Agenda</p>
                  <h2 className="font-serif text-2xl font-bold text-text-main">
                    Research Interests.
                  </h2>
                </div>

                <div className="flex flex-wrap gap-3">
                  {profile?.researchInterests?.length ? (
                    profile.researchInterests.map((item) => (
                      <span key={item} className="rounded-full border border-stone/10 px-4 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                        {item}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-text-muted">No research interests specified.</p>
                  )}
                </div>
              </section>
            </div>
          </div>
        )}

        <div className="mt-24 border-t border-stone/10 pt-12">
          <div className="flex flex-wrap gap-6 font-sans text-xs">
            <Link to="/account" className="flex items-center gap-2 font-bold uppercase tracking-widest text-text-main hover:text-text-muted transition-colors">
              <ArrowRight className="h-3 w-3 rotate-180" />
              Account Center
            </Link>

            <Link to="/account/settings" className="font-bold uppercase tracking-widest text-text-muted hover:text-text-main transition-colors">
              Settings
            </Link>

            <Link to="/account/security" className="font-bold uppercase tracking-widest text-text-muted hover:text-text-main transition-colors">
              Security & MFA
            </Link>

            <Link to="/account/history" className="font-bold uppercase tracking-widest text-text-muted hover:text-text-main transition-colors">
              Reading History
            </Link>

            {isAdmin && (
              <Link to="/admin" className="ml-auto font-bold uppercase tracking-widest text-text-main hover:text-text-muted transition-colors">
                Administration
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
