import { Routes, Route } from 'react-router-dom';
import { EntityAdmin } from '../entities/EntityAdmin';
import { RelationshipAdmin } from '../relationships/RelationshipAdmin';
import { OntologyAdmin } from '../ontology/OntologyAdmin';

export function EntityRelationshipRoutes() {
  return (
    <Routes>
      <Route path="/entities" element={<EntityAdmin />} />
      <Route path="/relationships" element={<RelationshipAdmin />} />
      <Route path="/ontology" element={<OntologyAdmin />} />
    </Routes>
  );
}

export default EntityRelationshipRoutes;
