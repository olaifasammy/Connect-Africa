import { useState } from 'react';
import {
  Plus,
  ShieldCheck,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { OntologyOverview } from './OntologyOverview';
import { OntologyEntityTypesTab } from './OntologyEntityTypesTab';
import { OntologyRelationshipTypesTab } from './OntologyRelationshipTypesTab';
import { OntologyValidationRulesTab } from './OntologyValidationRulesTab';
import { OntologyRequiredFieldsTab } from './OntologyRequiredFieldsTab';
import { OntologyConstraintsTab } from './OntologyConstraintsTab';
import { OntologyMetadataTab } from './OntologyMetadataTab';
import { OntologyVersionsTab } from './OntologyVersionsTab';
import { OntologyAuditTab } from './OntologyAuditTab';

const TABS = [
  'Overview',
  'Entity Types',
  'Relationship Types',
  'Validation Rules',
  'Required Fields',
  'Constraints',
  'Metadata',
  'Versions',
  'Audit',
] as const;

type TabName = typeof TABS[number];

export function OntologyAdmin() {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<TabName>('Overview');
  const [createNewOpen, setCreateNewOpen] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const triggerNotification = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => {
      setNotificationMsg(null);
    }, 4000);
  };

  const handleOpenAction = (actionName: string) => {
    triggerNotification(`Action initiated: ${actionName}`);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Notification Banner */}
      {notificationMsg && (
        <div role="alert" className="fixed top-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-gold/40 bg-surface px-4 py-3 shadow-scholar font-mono text-xs text-text-main animate-fade-in">
          <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Header & Action Bar */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-stone/20 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
              Ontology
            </h1>
            <span className="ca-badge-gold font-mono text-xs">
              v2.4.1 Published
            </span>
          </div>
          <p className="mt-1 text-xs text-text-muted">
            Manage the structure, rules and semantics of the Afriseek knowledge model.
          </p>
        </div>

        {isAdmin && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleOpenAction('Validate Ontology Suite')}
              className="ca-btn-outline px-4 py-2 text-xs font-mono"
            >
              <ShieldCheck className="h-4 w-4 text-gold" />
              <span>Validate Ontology</span>
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setCreateNewOpen((prev) => !prev)}
                className="ca-btn-primary px-4 py-2 text-xs font-mono"
              >
                <Plus className="h-4 w-4" />
                <span>Create New</span>
                <ChevronDown className="h-3.5 w-3.5 ml-1" />
              </button>

              {createNewOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Close create menu"
                    className="fixed inset-0 z-20 cursor-default bg-transparent"
                    onClick={() => setCreateNewOpen(false)}
                  />
                  <div className="absolute right-0 top-full z-30 mt-2 w-56 rounded-xl border border-stone/20 bg-surface p-1.5 shadow-scholar font-mono text-xs space-y-1">
                    {[
                      { label: 'Create Entity Type', tab: 'Entity Types' },
                      { label: 'Create Relationship Type', tab: 'Relationship Types' },
                      { label: 'Add Validation Rule', tab: 'Validation Rules' },
                      { label: 'Add Constraint', tab: 'Constraints' },
                      { label: 'Add Metadata Field', tab: 'Metadata' },
                      { label: 'New Schema Version', tab: 'Versions' },
                    ].map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => {
                          setActiveTab(item.tab as TabName);
                          setCreateNewOpen(false);
                          handleOpenAction(item.label);
                        }}
                        className="flex w-full items-center rounded-lg px-3 py-2 text-left text-text-muted hover:bg-gold/10 hover:text-gold transition font-medium"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {!isAdmin && (
        <div role="alert" className="ca-msg-error font-mono text-xs">
          Access Restricted: Ontology schema management is locked to Administrators.
        </div>
      )}

      {/* Navigation Tabs (Matching OntologyDashboard.png) */}
      <div className="flex overflow-x-auto border-b border-stone/20 no-scrollbar">
        <div className="flex gap-2">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={[
                  'relative px-4 py-3 font-sans text-xs font-semibold whitespace-nowrap transition-all duration-200',
                  isActive
                    ? 'text-gold border-b-2 border-gold bg-gold/5'
                    : 'text-text-muted hover:text-text-main hover:bg-stone/5',
                ].join(' ')}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Renderer */}
      <div className="mt-6">
        {activeTab === 'Overview' && (
          <OntologyOverview
            onNavigateTab={(t) => setActiveTab(t as TabName)}
            onOpenAction={handleOpenAction}
          />
        )}
        {activeTab === 'Entity Types' && (
          <OntologyEntityTypesTab onOpenAction={handleOpenAction} />
        )}
        {activeTab === 'Relationship Types' && (
          <OntologyRelationshipTypesTab onOpenAction={handleOpenAction} />
        )}
        {activeTab === 'Validation Rules' && (
          <OntologyValidationRulesTab onOpenAction={handleOpenAction} />
        )}
        {activeTab === 'Required Fields' && (
          <OntologyRequiredFieldsTab onOpenAction={handleOpenAction} />
        )}
        {activeTab === 'Constraints' && (
          <OntologyConstraintsTab onOpenAction={handleOpenAction} />
        )}
        {activeTab === 'Metadata' && (
          <OntologyMetadataTab onOpenAction={handleOpenAction} />
        )}
        {activeTab === 'Versions' && (
          <OntologyVersionsTab onOpenAction={handleOpenAction} />
        )}
        {activeTab === 'Audit' && (
          <OntologyAuditTab onOpenAction={handleOpenAction} />
        )}
      </div>
    </div>
  );
}

export default OntologyAdmin;
