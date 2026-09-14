import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, 
  Terminal, 
  Layers, 
  Copy, 
  ChevronRight,
  RefreshCw,
  Home
} from 'lucide-react';

interface ErrorPageProps {
  statusCode?: number;
  errorTitle?: string;
  errorMessage?: string;
  stackTrace?: string;
  breadcrumbs?: string[];
  onReset?: () => void;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({
  statusCode = 500,
  errorTitle = 'Internal Server Error',
  errorMessage = 'An unexpected failure occurred within the Connect Africa domain architecture. The transaction was aborted to preserve schema integrity.',
  stackTrace = `Error: DBConnectionError: Failed to acquire postgres client from pool\n    at Pool.acquire (backend/src/shared/infrastructure/Postgres.ts:24:11)\n    at Object.execute (backend/src/modules/entity/infrastructure/PostgresEntityRepository.ts:89:32)\n    at EntityService.list (backend/src/modules/entity/application/services/EntityService.ts:42:15)\n    at EntityController.list (backend/src/modules/entity/interfaces/EntityController.ts:18:24)`,
  breadcrumbs = [
    'INIT: bootstrap/startup/BootstrapService',
    'ROUTE: GET /api/v1/entity',
    'RBAC: Checked ENTITY_READ (GRANTED)',
    'INFRA: PostgresEntityRepository.list()',
    'EXCEPTION: Connection pool exhaustion detected'
  ],
  onReset
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCopy = () => {
    const copyText = `Error Code: ${statusCode}\nTitle: ${errorTitle}\nMessage: ${errorMessage}\n\nPath: ${location?.pathname || 'unknown'}\n\nBreadcrumbs:\n${breadcrumbs.map((b, i) => `  [${i + 1}] ${b}`).join('\n')}\n\nStack Trace:\n${stackTrace}`;
    navigator.clipboard.writeText(copyText);
    alert('Diagnostics copied to clipboard.');
  };

  const handleGoBack = () => {
    navigate(-1); // Seamlessly navigate back to where the user was last before the error
  };

  return (
    <div className="min-h-screen bg-ink flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 text-cloud relative overflow-hidden select-none">
      
      {/* Sleek modern design: futuristic dot grid matrix background */}
      <div className="absolute inset-0 bg-[radial-gradient(#164A35_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
      
      {/* Sleek subtle ambient glowing aura in the center top */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[350px] w-[600px] rounded-full bg-terra/5 blur-[120px]" />
      
      {/* Header Info */}
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center relative z-20 border-b border-white/[0.04] pb-6">
        <div className="flex items-center space-x-3">
          <div className="h-2 w-2 rounded-full bg-terra animate-ping" />
          <span className="text-xs font-mono tracking-widest text-mist uppercase">Connect Africa • Telemetry Console</span>
        </div>
        <span className="text-xs font-mono text-terra uppercase tracking-wider bg-terra/10 border border-terra/20 px-3 py-1 rounded-full">
          Status Code: {statusCode}
        </span>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto w-full my-auto py-12 relative z-10 space-y-8">
        
        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Visual Alert, Back Control, and Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-terra block">Architectural Exception</span>
              <h1 className="text-4xl font-extrabold tracking-tight text-cloud leading-none">{errorTitle}</h1>
              <p className="text-sm leading-relaxed text-mist mt-3">
                {errorMessage}
              </p>
            </div>

            {/* Back Actions Panel */}
            <div className="flex flex-col gap-3 pt-4 border-t border-white/[0.05]">
              <button
                onClick={handleGoBack}
                className="w-full bg-white text-ink hover:bg-cloud font-bold px-5 py-3 rounded-xl text-sm transition duration-300 flex items-center justify-center space-x-2 group shadow-glow"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <span>Go Back to Previous Page</span>
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate('/')}
                  className="bg-forest hover:bg-forest/80 text-cloud font-semibold px-4 py-2.5 rounded-xl text-xs border border-white/[0.07] transition duration-300 flex items-center justify-center space-x-2"
                >
                  <Home className="h-3.5 w-3.5 text-sage" />
                  <span>Dashboard Home</span>
                </button>
                
                {onReset && (
                  <button
                    onClick={onReset}
                    className="bg-forest hover:bg-forest/80 text-cloud font-semibold px-4 py-2.5 rounded-xl text-xs border border-white/[0.07] transition duration-300 flex items-center justify-center space-x-2"
                  >
                    <RefreshCw className="h-3.5 w-3.5 text-emerald" />
                    <span>Hard Reset</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Diagnostic traceback breadcrumbs & Stack terminal */}
          <div className="lg:col-span-7 space-y-6 bg-forest/40 border border-white/[0.06] rounded-3xl p-6 shadow-soft backdrop-blur-md">
            
            {/* Traceback Breadcrumbs */}
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-white/[0.04] pb-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-mist flex items-center space-x-2">
                  <Layers className="h-4 w-4 text-emerald" />
                  <span>Traceback Path</span>
                </h3>
                <span className="text-[10px] font-mono text-sage">Secure Execution Flow</span>
              </div>
              
              <div className="space-y-2.5">
                {breadcrumbs.map((breadcrumb, index) => (
                  <div key={index} className="flex items-center space-x-3 text-xs bg-ink/40 border border-white/[0.03] p-2.5 rounded-xl">
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded ${
                      index === breadcrumbs.length - 1 
                        ? 'bg-terra/25 text-terra border border-terra/30 font-bold' 
                        : 'bg-white/[0.03] text-mist border border-white/[0.05]'
                    }`}>
                      0{index + 1}
                    </span>
                    <span className={`font-mono flex-1 truncate ${
                      index === breadcrumbs.length - 1 ? 'text-terra font-semibold' : 'text-cloud/85'
                    }`}>
                      {breadcrumb}
                    </span>
                    {index < breadcrumbs.length - 1 && (
                      <ChevronRight className="h-3 w-3 text-white/10 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal Stack Trace */}
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-white/[0.04] pb-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-mist flex items-center space-x-2">
                  <Terminal className="h-4 w-4 text-terra" />
                  <span>Exception Traceback</span>
                </h3>
                <button 
                  onClick={handleCopy}
                  className="text-xs text-sage hover:text-cloud transition flex items-center space-x-1"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Logs</span>
                </button>
              </div>
              
              <div className="bg-black/90 rounded-2xl border border-white/[0.07] p-4 overflow-auto max-h-48 shadow-inner font-mono text-[11px] text-terra/90 leading-relaxed">
                <pre className="whitespace-pre">{stackTrace}</pre>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Footer Info */}
      <div className="max-w-7xl mx-auto w-full text-center relative z-20 border-t border-white/[0.04] pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] font-mono text-mist/40">
        <span>Connect Africa Compliance • EngineV2 Security Guard</span>
        <span>Diagnostics Active • Session Encrypted</span>
      </div>

    </div>
  );
};
