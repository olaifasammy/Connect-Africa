import { Routes, Route } from 'react-router-dom';
import { AIAdmin } from '../intelligence/AIAdmin';
import { ProviderAdmin } from '../intelligence/ProviderAdmin';
import { CrawlAdmin } from '../intelligence/CrawlAdmin';
import { KnowledgeGapAdmin } from '../intelligence/KnowledgeGapAdmin';
import { PromptAdmin } from '../intelligence/PromptAdmin';

export function IntelligenceRoutes() {
  return (
    <Routes>
      <Route path="/ai" element={<AIAdmin />} />
      <Route path="/providers" element={<ProviderAdmin />} />
      <Route path="/crawl" element={<CrawlAdmin />} />
      <Route path="/knowledge-gaps" element={<KnowledgeGapAdmin />} />
      <Route path="/prompts" element={<PromptAdmin />} />
    </Routes>
  );
}

export default IntelligenceRoutes;
