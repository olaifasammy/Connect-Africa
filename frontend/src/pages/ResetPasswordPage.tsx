import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeyRound } from 'lucide-react';
import { api } from '../services/api';

export const ResetPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setSubmitted(true);
    } catch (err: any) {
      setSubmitted(true); // graceful success for demo UX
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-900 p-8 rounded-xl border border-slate-800 shadow-xl">
        <div className="text-center mb-8">
          <div className="h-12 w-12 bg-emerald-950 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3">
            <KeyRound className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Reset Password</h2>
        </div>

        {submitted ? (
          <div className="bg-emerald-950 border border-emerald-800 text-emerald-200 px-4 py-4 rounded-lg text-center mb-4">
            If an account exists for {email}, password reset instructions have been sent.
            <div className="mt-4">
              <Link to="/login" className="text-white underline font-medium">Return to Login</Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-400 text-sm">{error}</div>}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                placeholder="user@example.com"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg transition duration-200"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
            <div className="text-center mt-4">
              <Link to="/login" className="text-sm text-slate-400 hover:text-white">Back to Login</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
