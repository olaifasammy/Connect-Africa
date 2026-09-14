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
      } catch (err) {
        if (active) {
          // Fallback to auth user data if profile doesn't exist yet or endpoint error
          const fallbackName =
            [user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
            user?.email?.split('@')[0] ||
            'Connect-Africa user';
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
      setNotice('Profile updated successfully.');
      setEditing(false);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const resolvedDisplayName =
    profile?.displayName ||
    [user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
    user?.email?.split('@')[0] ||
    'Connect-Africa user';

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
      <div className="min-h-screen bg-ink pb-20 pt-10 text-cloud sm:pt-14">
        <div className="ca-container">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-40 rounded bg-white/[0.06]" />
            <div className="h-64 rounded-3xl bg-forest/50" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink pb-20 pt-8 text-cloud sm:pt-12">
      <div className="ca-container space-y-6">
        {/* Header / Banner */}
        <section className="overflow-hidden rounded-3xl border border-white/[0.07] bg-forest/70 shadow-soft">
          <div className="relative border-b border-white/[0.06] px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
            <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-emerald/10 blur-3xl" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                {profile?.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={resolvedDisplayName}
                    className="h-20 w-20 shrink-0 rounded-3xl border border-emerald/25 object-cover shadow-glow"
                  />
                ) : (
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-emerald/25 bg-brand text-2xl font-semibold text-sage shadow-glow">
                    {initials}
                  </div>
                )}

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="ca-eyebrow">Identity & Profile</p>
                    {profile?.country && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-xs text-mist">
                        <MapPin className="h-3 w-3 text-emerald" />
                        {profile.country}
                      </span>
                    )}
                  </div>
                  <h1 className="mt-2 text-3xl font-semibold tracking-tight text-cloud sm:text-4xl">
                    {resolvedDisplayName}
                  </h1>

                  {user?.email && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-mist">
                      <Mail className="h-4 w-4 shrink-0" />
                      <span className="truncate">{user.email}</span>
                    </div>
                  )}

                  {profile?.bio && (
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-mist">
                      {profile.bio}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setEditing(!editing)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald/30 bg-emerald/[0.08] px-4 py-2.5 text-sm font-semibold text-sage transition hover:bg-emerald/[0.15]"
              >
                {editing ? <X className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                {editing ? 'Cancel editing' : 'Edit profile'}
              </button>
            </div>
          </div>

          {(error || notice) && (
            <div className="px-6 pt-4 sm:px-8">
              {error && (
                <div className="rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}
              {notice && (
                <div className="flex items-center gap-2 rounded-xl border border-emerald/20 bg-emerald/[0.06] px-4 py-3 text-sm text-sage">
                  <Check className="h-4 w-4" />
                  {notice}
                </div>
              )}
            </div>
          )}

          {editing ? (
            <form onSubmit={handleSave} className="p-6 sm:p-8 lg:p-10 space-y-6">
              <h2 className="text-xl font-semibold">Edit your profile details</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-mist">
                    Display name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                    className="mt-2 w-full rounded-xl border border-white/[0.08] bg-ink px-4 py-3 text-sm text-cloud outline-none transition focus:border-emerald/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-mist">
                    Avatar URL
                  </label>
                  <input
                    type="url"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                    className="mt-2 w-full rounded-xl border border-white/[0.08] bg-ink px-4 py-3 text-sm text-cloud outline-none transition focus:border-emerald/50"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-mist">
                    Bio
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    placeholder="Tell the community about your professional background and interests..."
                    className="mt-2 w-full rounded-xl border border-white/[0.08] bg-ink px-4 py-3 text-sm text-cloud outline-none transition focus:border-emerald/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-mist">
                    Country
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. Kenya, Nigeria, South Africa"
                    className="mt-2 w-full rounded-xl border border-white/[0.08] bg-ink px-4 py-3 text-sm text-cloud outline-none transition focus:border-emerald/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-mist">
                    Website
                  </label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://yourwebsite.com"
                    className="mt-2 w-full rounded-xl border border-white/[0.08] bg-ink px-4 py-3 text-sm text-cloud outline-none transition focus:border-emerald/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-mist">
                    Languages (comma separated)
                  </label>
                  <input
                    type="text"
                    value={languagesInput}
                    onChange={(e) => setLanguagesInput(e.target.value)}
                    placeholder="English, French, Arabic"
                    className="mt-2 w-full rounded-xl border border-white/[0.08] bg-ink px-4 py-3 text-sm text-cloud outline-none transition focus:border-emerald/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-mist">
                    Expertise (comma separated)
                  </label>
                  <input
                    type="text"
                    value={expertiseInput}
                    onChange={(e) => setExpertiseInput(e.target.value)}
                    placeholder="AgriTech, Renewable Energy, Policy"
                    className="mt-2 w-full rounded-xl border border-white/[0.08] bg-ink px-4 py-3 text-sm text-cloud outline-none transition focus:border-emerald/50"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-mist">
                    Research interests (comma separated)
                  </label>
                  <input
                    type="text"
                    value={researchInput}
                    onChange={(e) => setResearchInput(e.target.value)}
                    placeholder="Continental Trade, Sustainable Infrastructure"
                    className="mt-2 w-full rounded-xl border border-white/[0.08] bg-ink px-4 py-3 text-sm text-cloud outline-none transition focus:border-emerald/50"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-cloud transition hover:bg-white/[0.06]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-sage disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {saving ? 'Saving...' : 'Save changes'}
                </button>
              </div>
            </form>
          ) : (
            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-2 lg:p-10">
              <div className="space-y-6">
                <div className="rounded-2xl border border-white/[0.07] bg-ink/50 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mist">
                        Access
                      </p>
                      <h2 className="mt-1 text-base font-semibold text-cloud">
                        Roles & permissions
                      </h2>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {roles.map((role) => (
                      <span
                        key={role}
                        className="rounded-lg border border-emerald/20 bg-emerald/[0.07] px-3 py-1.5 text-xs font-medium text-sage"
                      >
                        {role}
                      </span>
                    ))}
                  </div>

                  <p className="mt-5 text-sm leading-6 text-mist">
                    Administrative capabilities are determined by your
                    authenticated account role.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-ink/50 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mist">
                        Professional & Regional
                      </p>
                      <h2 className="mt-1 text-base font-semibold text-cloud">
                        Background details
                      </h2>
                    </div>
                  </div>

                  <dl className="mt-6 space-y-4">
                    <div className="flex items-start justify-between gap-6 border-b border-white/[0.05] pb-3">
                      <dt className="text-sm text-mist">Country</dt>
                      <dd className="text-right text-sm font-medium text-cloud">
                        {profile?.country || 'Not specified'}
                      </dd>
                    </div>

                    <div className="flex items-start justify-between gap-6 border-b border-white/[0.05] pb-3">
                      <dt className="text-sm text-mist">Website</dt>
                      <dd className="max-w-[60%] truncate text-right text-sm font-medium text-cloud">
                        {profile?.website ? (
                          <a
                            href={profile.website}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald hover:underline"
                          >
                            {profile.website}
                          </a>
                        ) : (
                          'Not specified'
                        )}
                      </dd>
                    </div>

                    <div className="flex items-start justify-between gap-6 border-b border-white/[0.05] pb-3">
                      <dt className="text-sm text-mist">Languages</dt>
                      <dd className="text-right text-sm font-medium text-cloud">
                        {profile?.languages?.length
                          ? profile.languages.join(', ')
                          : 'Not specified'}
                      </dd>
                    </div>

                    <div className="flex items-start justify-between gap-6">
                      <dt className="text-sm text-mist">Email</dt>
                      <dd className="max-w-[60%] truncate text-right text-sm font-medium text-cloud">
                        {user?.email || 'Not available'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl border border-white/[0.07] bg-ink/50 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-sage">
                      <UserRound className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mist">
                        Expertise
                      </p>
                      <h2 className="mt-1 text-base font-semibold text-cloud">
                        Professional domains
                      </h2>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {profile?.expertise?.length ? (
                      profile.expertise.map((item) => (
                        <span
                          key={item}
                          className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-cloud"
                        >
                          {item}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm text-mist">No expertise areas specified.</p>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-ink/50 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mist">
                        Research
                      </p>
                      <h2 className="mt-1 text-base font-semibold text-cloud">
                        Research interests
                      </h2>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {profile?.researchInterests?.length ? (
                      profile.researchInterests.map((item) => (
                        <span
                          key={item}
                          className="rounded-lg border border-emerald/25 bg-emerald/[0.05] px-3 py-1.5 text-xs font-medium text-sage"
                        >
                          {item}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm text-mist">No research interests specified.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="border-t border-white/[0.06] px-6 py-6 sm:px-8 lg:px-10">
            <div className="flex flex-wrap gap-3">
              <Link
                to="/account"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald px-5 py-3 text-sm font-semibold text-ink transition hover:bg-sage"
              >
                <Settings className="h-4 w-4" />
                Account center
              </Link>

              <Link
                to="/account/settings"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-5 py-3 text-sm font-medium text-cloud transition hover:border-emerald/30 hover:bg-emerald/[0.04]"
              >
                Settings
              </Link>

              <Link
                to="/account/security"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-5 py-3 text-sm font-medium text-cloud transition hover:border-emerald/30 hover:bg-emerald/[0.04]"
              >
                <Lock className="h-4 w-4 text-gold" />
                Security & MFA
              </Link>

              <Link
                to="/account/history"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-5 py-3 text-sm font-medium text-cloud transition hover:border-emerald/30 hover:bg-emerald/[0.04]"
              >
                <History className="h-4 w-4 text-sage" />
                Reading history
              </Link>

              {isAdmin && (
                <Link
                  to="/admin"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gold/20 bg-gold/[0.04] px-5 py-3 text-sm font-medium text-gold transition hover:border-gold/40"
                >
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
