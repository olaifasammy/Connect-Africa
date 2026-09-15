import { Routes, Route } from 'react-router-dom';
import { SearchAdmin } from '../search/SearchAdmin';
import { SearchDiagnostics } from '../search/SearchDiagnostics';
import { SearchIndexHealth } from '../search/SearchIndexHealth';

export function SearchManagementRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SearchAdmin />} />
      <Route path="/diagnostics" element={<SearchDiagnostics />} />
      <Route path="/index-health" element={<SearchIndexHealth />} />
    </Routes>
  );
}

export default SearchManagementRoutes;
