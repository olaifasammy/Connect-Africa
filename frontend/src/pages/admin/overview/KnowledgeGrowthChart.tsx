import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const timeFilters = [
  { id: 'month', label: 'This Month' },
  { id: 'quarter', label: 'This Quarter' },
  { id: 'year', label: 'This Year' },
];

interface DataPoint {
  date: string;
  entities: number;     // In thousands/millions scale
  relationships: number;
  articles: number;
  sources: number;
}

const monthlyData: DataPoint[] = [
  { date: 'May 1', entities: 700, relationships: 400, articles: 200, sources: 120 },
  { date: 'May 7', entities: 1100, relationships: 650, articles: 280, sources: 180 },
  { date: 'May 14', entities: 1700, relationships: 1050, articles: 460, sources: 240 },
  { date: 'May 20', entities: 2200, relationships: 1550, articles: 680, sources: 310 },
  { date: 'May 27', entities: 2450, relationships: 1890, articles: 840, sources: 390 },
];

export function KnowledgeGrowthChart() {
  const [selectedFilter, setSelectedFilter] = useState(timeFilters[0]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // SVG dimensions
  const width = 460;
  const height = 230;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 25;
  const paddingBottom = 35;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  const maxY = 2800;

  // Scale functions
  const getX = (index: number) =>
    paddingLeft + (index / (monthlyData.length - 1)) * chartWidth;
  const getY = (val: number) =>
    paddingTop + chartHeight - (val / maxY) * chartHeight;

  // Generate smooth cubic bezier SVG path
  const createSplinePath = (vals: number[]) => {
    const points = vals.map((val, idx) => ({ x: getX(idx), y: getY(val) }));
    if (points.length === 0) return '';
    if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX = (p0.x + p1.x) / 2;
      path += ` C ${cpX} ${p0.y}, ${cpX} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return path;
  };

  const entityPath = createSplinePath(monthlyData.map((d) => d.entities));
  const relationshipPath = createSplinePath(monthlyData.map((d) => d.relationships));
  const articlePath = createSplinePath(monthlyData.map((d) => d.articles));
  const sourcePath = createSplinePath(monthlyData.map((d) => d.sources));

  // Area under curve for entities
  const entityArea = `${entityPath} L ${getX(monthlyData.length - 1)} ${paddingTop + chartHeight} L ${getX(0)} ${paddingTop + chartHeight} Z`;

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-white/[0.07] bg-[#10201A]/60 p-5 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-cloud">
            Knowledge Growth
          </h2>
          <p className="mt-0.5 text-xs text-cloud/45">
            Cumulative growth across knowledge domains
          </p>
        </div>

        {/* Time Filter Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setFilterOpen((prev) => !prev)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-cloud/70 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-cloud"
          >
            <span>{selectedFilter.label}</span>
            <ChevronDown className="h-3 w-3 text-cloud/40" />
          </button>

          {filterOpen && (
            <>
              <button
                type="button"
                aria-label="Close time filter"
                className="fixed inset-0 z-20 cursor-default bg-transparent"
                onClick={() => setFilterOpen(false)}
              />
              <div className="absolute right-0 top-full z-30 mt-1.5 w-36 rounded-xl border border-white/[0.08] bg-ink/95 p-1 shadow-2xl backdrop-blur-xl">
                {timeFilters.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      setSelectedFilter(f);
                      setFilterOpen(false);
                    }}
                    className={[
                      'w-full text-left rounded-lg px-2.5 py-1.5 text-xs transition',
                      f.id === selectedFilter.id
                        ? 'bg-emerald/15 font-medium text-sage'
                        : 'text-cloud/70 hover:bg-white/[0.05] hover:text-cloud',
                    ].join(' ')}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* SVG Chart Area */}
      <div className="relative my-4 flex h-60 w-full items-center justify-center overflow-hidden rounded-xl border border-white/[0.04] bg-ink/70">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full select-none">
          <defs>
            <linearGradient id="entityGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines & Y-Axis Labels */}
          {[
            { val: 2800, label: '2.8M' },
            { val: 2100, label: '2.1M' },
            { val: 1400, label: '1.4M' },
            { val: 700, label: '700K' },
            { val: 0, label: '0' },
          ].map((tick) => {
            const y = getY(tick.val);
            return (
              <g key={tick.label}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  className="fill-cloud/35 text-[9px] font-mono select-none"
                >
                  {tick.label}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={entityArea} fill="url(#entityGradient)" />

          {/* Lines */}
          <path
            d={entityPath}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d={relationshipPath}
            fill="none"
            stroke="#a855f7"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d={articlePath}
            fill="none"
            stroke="#22A06B"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d={sourcePath}
            fill="none"
            stroke="#D9A441"
            strokeWidth="1.75"
            strokeLinecap="round"
          />

          {/* Data Points on Curves */}
          {monthlyData.map((d, i) => (
            <g key={d.date}>
              <circle
                cx={getX(i)}
                cy={getY(d.entities)}
                r="3.5"
                fill="#38bdf8"
                stroke="#0B1110"
                strokeWidth="1.5"
              />
              <circle
                cx={getX(i)}
                cy={getY(d.relationships)}
                r="3"
                fill="#a855f7"
                stroke="#0B1110"
                strokeWidth="1.5"
              />
              <circle
                cx={getX(i)}
                cy={getY(d.articles)}
                r="2.5"
                fill="#22A06B"
                stroke="#0B1110"
                strokeWidth="1.5"
              />
              <circle
                cx={getX(i)}
                cy={getY(d.sources)}
                r="2.5"
                fill="#D9A441"
                stroke="#0B1110"
                strokeWidth="1.5"
              />

              {/* X-Axis Dates */}
              <text
                x={getX(i)}
                y={height - 12}
                textAnchor="middle"
                className="fill-cloud/40 text-[9.5px] select-none"
              >
                {d.date}
              </text>

              {/* Interactive Hover Hitbox */}
              <rect
                x={getX(i) - 20}
                y={paddingTop}
                width="40"
                height={chartHeight}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            </g>
          ))}

          {/* Hover Tooltip Overlay */}
          {hoveredIndex !== null && (
            <g>
              <line
                x1={getX(hoveredIndex)}
                y1={paddingTop}
                x2={getX(hoveredIndex)}
                y2={paddingTop + chartHeight}
                stroke="#8BC7A8"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Legend Footer */}
      <div className="flex flex-wrap items-center justify-center gap-6 border-t border-white/[0.05] pt-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#38bdf8]" />
          <span className="text-cloud/65">Entities</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#a855f7]" />
          <span className="text-cloud/65">Relationships</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald" />
          <span className="text-cloud/65">Articles</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gold" />
          <span className="text-cloud/65">Sources</span>
        </div>
      </div>
    </div>
  );
}

export default KnowledgeGrowthChart;
