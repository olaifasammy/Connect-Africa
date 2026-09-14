import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { UserAccountCenterPage } from './pages/UserAccountCenterPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { ArticleListPage } from './pages/ArticleListPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { AccountNotificationsPage } from './pages/account/AccountNotificationsPage';
import { AccountBookmarksPage } from './pages/account/AccountBookmarksPage';
import { AccountHistoryPage } from './pages/account/AccountHistoryPage';
import { AccountSearchesPage } from './pages/account/AccountSearchesPage';
import { AccountSettingsPage } from './pages/account/AccountSettingsPage';
import { AccountSecurityPage } from './pages/account/AccountSecurityPage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ErrorPage } from './pages/ErrorPage';

export function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-ink text-cloud">
            <Navbar />

            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/profile" element={<UserProfilePage />} />
                <Route path="/account" element={<UserAccountCenterPage />} />
                <Route path="/account/notifications" element={<AccountNotificationsPage />} />
                <Route path="/account/bookmarks" element={<AccountBookmarksPage />} />
                <Route path="/account/history" element={<AccountHistoryPage />} />
                <Route path="/account/searches" element={<AccountSearchesPage />} />
                <Route path="/account/settings" element={<AccountSettingsPage />} />
                <Route path="/account/security" element={<AccountSecurityPage />} />
                <Route path="/admin/*" element={<AdminDashboardPage />} />
                <Route path="/articles" element={<ArticleListPage />} />
                <Route path="/articles/:slug" element={<ArticleDetailPage />} />
                
                {/* Fallback 404 Route formatted in Connect Africa aesthetic */}
                <Route 
                  path="*" 
                  element={
                    <ErrorPage 
                      statusCode={404} 
                      errorTitle="Resource Not Found" 
                      errorMessage="The requested node, context, or presentation layer does not exist in the platform schema. Double-check your route address or consult the system graph."
                      breadcrumbs={[
                        'INIT: Platform Router Instantiation',
                        'ROUTE: Lookup matching routing keys',
                        'RESULT: 0 routing matches found',
                        'EXCEPTION: HTTP 404 Route Not Found'
                      ]}
                      stackTrace="Error: RouteResolutionException: Cannot resolve route path\n    at Matcher.resolve (frontend/src/App.tsx:52:12)\n    at Router.dispatch (node_modules/react-router/dist/index.js:189:22)"
                    />
                  } 
                />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
