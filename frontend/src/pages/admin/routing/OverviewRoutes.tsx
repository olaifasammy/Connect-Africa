import { Routes, Route } from 'react-router-dom';
import { KnowledgeHealth } from '../overview/KnowledgeHealth';
import { SystemHealth } from '../overview/SystemHealth';
import { OperationsFeed } from '../overview/OperationsFeed';

export function OverviewRoutes() {
  return (
    <Routes>
      <Route path="/knowledge" element={<KnowledgeHealth />} />
      <Route path="/system" element={<SystemHealth />} />
      <Route path="/operations" element={<OperationsFeed />} />
    </Routes>
  );
}

export default OverviewRoutes;
