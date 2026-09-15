import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GraphNode {
  id: string;
  x: number;
  y: number;
  r: number;
  type: 'entity' | 'relationship' | 'article' | 'source';
  label?: string;
}

interface GraphEdge {
  from: string;
  to: string;
}

const nodes: GraphNode[] = [
  // Central Hub
  { id: 'hub', x: 230, y: 140, r: 10, type: 'entity', label: 'Core Hub' },

  // Surrounding Entity nodes (Blue)
  { id: 'e1', x: 130, y: 135, r: 6.5, type: 'entity' },
  { id: 'e2', x: 200, y: 80, r: 5, type: 'entity' },
  { id: 'e3', x: 275, y: 95, r: 6.5, type: 'entity' },
  { id: 'e4', x: 330, y: 155, r: 6, type: 'entity' },
  { id: 'e5', x: 235, y: 195, r: 5.5, type: 'entity' },
  { id: 'e6', x: 150, y: 175, r: 6, type: 'entity' },

  // Outer Relationship nodes (Purple)
  { id: 'r1', x: 80, y: 120, r: 4.5, type: 'relationship' },
  { id: 'r2', x: 110, y: 70, r: 4.5, type: 'relationship' },
  { id: 'r3', x: 170, y: 45, r: 4, type: 'relationship' },
  { id: 'r4', x: 250, y: 55, r: 4.5, type: 'relationship' },
  { id: 'r5', x: 320, y: 80, r: 4, type: 'relationship' },
  { id: 'r6', x: 375, y: 130, r: 4.5, type: 'relationship' },
  { id: 'r7', x: 350, y: 190, r: 4.5, type: 'relationship' },
  { id: 'r8', x: 280, y: 205, r: 4, type: 'relationship' },
  { id: 'r9', x: 190, y: 215, r: 4.5, type: 'relationship' },
  { id: 'r10', x: 110, y: 200, r: 4, type: 'relationship' },

  // Article nodes (Emerald)
  { id: 'a1', x: 50, y: 160, r: 3.5, type: 'article' },
  { id: 'a2', x: 140, y: 235, r: 4, type: 'article' },
  { id: 'a3', x: 395, y: 175, r: 4, type: 'article' },
  { id: 'a4', x: 295, y: 40, r: 3.5, type: 'article' },

  // Source nodes (Amber)
  { id: 's1', x: 65, y: 80, r: 3.5, type: 'source' },
  { id: 's2', x: 360, y: 50, r: 3.5, type: 'source' },
  { id: 's3', x: 235, y: 245, r: 3.5, type: 'source' },
];

const edges: GraphEdge[] = [
  // Hub connections
  { from: 'hub', to: 'e1' },
  { from: 'hub', to: 'e2' },
  { from: 'hub', to: 'e3' },
  { from: 'hub', to: 'e4' },
  { from: 'hub', to: 'e5' },
  { from: 'hub', to: 'e6' },

  // Inner ring interconnects
  { from: 'e1', to: 'e2' },
  { from: 'e2', to: 'e3' },
  { from: 'e3', to: 'e4' },
  { from: 'e4', to: 'e5' },
  { from: 'e5', to: 'e6' },
  { from: 'e6', to: 'e1' },

  // Outer radial connections
  { from: 'e1', to: 'r1' },
  { from: 'e1', to: 'r2' },
  { from: 'e2', to: 'r3' },
  { from: 'e2', to: 'r4' },
  { from: 'e3', to: 'r5' },
  { from: 'e4', to: 'r6' },
  { from: 'e4', to: 'r7' },
  { from: 'e5', to: 'r8' },
  { from: 'e5', to: 'r9' },
  { from: 'e6', to: 'r10' },

  // Peripheral leaves
  { from: 'r1', to: 'a1' },
  { from: 'r2', to: 's1' },
  { from: 'r5', to: 's2' },
  { from: 'r4', to: 'a4' },
  { from: 'r7', to: 'a3' },
  { from: 'r9', to: 's3' },
  { from: 'r10', to: 'a2' },
];

const typeColors = {
  entity: {
    fill: '#38bdf8', // Sky/blue
    glow: 'rgba(56, 189, 248, 0.4)',
    border: '#0284c7',
  },
  relationship: {
    fill: '#a855f7', // Purple
    glow: 'rgba(168, 85, 247, 0.4)',
    border: '#7e22ce',
  },
  article: {
    fill: '#22A06B', // Emerald
    glow: 'rgba(34, 160, 107, 0.4)',
    border: '#164A35',
  },
  source: {
    fill: '#D9A441', // Gold
    glow: 'rgba(217, 164, 65, 0.4)',
    border: '#b47a3d',
  },
};

export function KnowledgeGraphOverview() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodeMap = new Map<string, GraphNode>();
  nodes.forEach((n) => nodeMap.set(n.id, n));

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-white/[0.07] bg-[#10201A]/60 p-5 backdrop-blur-sm">
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-cloud">
            Knowledge Graph Overview
          </h2>
          <p className="mt-0.5 text-xs text-cloud/45">
            Real-time topology of connected nodes
          </p>
        </div>

        <Link
          to="/admin/entities"
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-sage transition hover:border-emerald/30 hover:bg-emerald/10 hover:text-cloud"
        >
          <span>View Graph</span>
          <ExternalLink className="h-3 w-3" />
        </Link>
      </div>

      {/* SVG Interactive Canvas */}
      <div className="relative my-4 flex h-60 w-full items-center justify-center overflow-hidden rounded-xl border border-white/[0.04] bg-ink/70">
        <svg
          viewBox="0 0 460 270"
          className="h-full w-full select-none"
          style={{ filter: 'drop-shadow(0 0 16px rgba(34, 160, 107, 0.08))' }}
        >
          <defs>
            {/* Ambient Radial background gradient */}
            <radialGradient id="graphBgGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22A06B" stopOpacity="0.1" />
              <stop offset="60%" stopColor="#10201A" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#0B1110" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Glow */}
          <circle cx="230" cy="140" r="160" fill="url(#graphBgGlow)" />

          {/* Connections / Edges */}
          <g className="stroke-white/15" strokeWidth="1">
            {edges.map((edge, index) => {
              const fromNode = nodeMap.get(edge.from);
              const toNode = nodeMap.get(edge.to);
              if (!fromNode || !toNode) return null;

              const isHighlighted =
                hoveredNode === edge.from || hoveredNode === edge.to;

              return (
                <line
                  key={`${edge.from}-${edge.to}-${index}`}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={isHighlighted ? '#8BC7A8' : 'rgba(255, 255, 255, 0.12)'}
                  strokeWidth={isHighlighted ? 1.75 : 1}
                  className="transition-colors duration-150"
                />
              );
            })}
          </g>

          {/* Nodes */}
          <g>
            {nodes.map((node) => {
              const colorInfo = typeColors[node.type];
              const isHovered = hoveredNode === node.id;

              return (
                <g
                  key={node.id}
                  className="cursor-pointer transition-transform duration-200"
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Subtle Halo */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isHovered ? node.r + 5 : node.r + 2}
                    fill={colorInfo.glow}
                    className="transition-all duration-200"
                  />

                  {/* Core Node Circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.r}
                    fill={colorInfo.fill}
                    stroke="#0B1110"
                    strokeWidth="1.5"
                    className="transition-all duration-200"
                  />
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Legend Footer matching the mockup */}
      <div className="flex flex-wrap items-center justify-center gap-6 border-t border-white/[0.05] pt-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#38bdf8]" />
          <span className="text-cloud/65">Entity</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#a855f7]" />
          <span className="text-cloud/65">Relationship</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald" />
          <span className="text-cloud/65">Article</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gold" />
          <span className="text-cloud/65">Source</span>
        </div>
      </div>
    </div>
  );
}

export default KnowledgeGraphOverview;
