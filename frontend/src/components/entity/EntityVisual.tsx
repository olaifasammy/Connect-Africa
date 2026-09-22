import { Globe2, Landmark, MapPinned, UsersRound } from 'lucide-react';

type EntityVisualProps = {
  type: 'PERSON' | 'PLACE' | 'ORGANIZATION' | 'CULTURE';
  label: string;
  index?: number;
};

const visualConfig = {
  PERSON: {
    icon: UsersRound,
    eyebrow: 'PERSON',
    title: 'People',
    accent: '#C9A86A',     // Savanna Gold
    secondary: '#064E3B',  // Emerald 900
    badgeBg: 'rgba(201, 168, 106, 0.12)',
  },
  PLACE: {
    icon: MapPinned,
    eyebrow: 'PLACE',
    title: 'Place',
    accent: '#A1624D',     // Clay
    secondary: '#C9A86A',  // Savanna Gold
    badgeBg: 'rgba(161, 98, 77, 0.12)',
  },
  ORGANIZATION: {
    icon: Landmark,
    eyebrow: 'ORGANIZATION',
    title: 'Institution',
    accent: '#064E3B',     // Emerald 900
    secondary: '#C9A86A',  // Savanna Gold
    badgeBg: 'rgba(6, 78, 59, 0.12)',
  },
  CULTURE: {
    icon: Globe2,
    eyebrow: 'CULTURE',
    title: 'Culture',
    accent: '#C9A86A',     // Savanna Gold
    secondary: '#A1624D',  // Clay
    badgeBg: 'rgba(201, 168, 106, 0.12)',
  },
} as const;

export function EntityVisual({
  type,
  label,
  index = 0,
}: EntityVisualProps) {
  const config = visualConfig[type];
  const Icon = config.icon;

  const seed = index % 4;
  const cx = [72, 118, 92, 138][seed];
  const cy = [76, 104, 68, 92][seed];

  return (
    <div className="relative h-56 overflow-hidden rounded-t-xl bg-surface border-b border-stone/20 transition-colors duration-300">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: `
            radial-gradient(circle at ${cx}% ${cy}%,
              ${config.accent}18 0,
              transparent 35%),
            radial-gradient(circle at ${100 - cx}% ${100 - cy}%,
              rgba(6, 78, 59, 0.08) 0,
              transparent 40%)
          `,
        }}
      />

      {/* "The Scholar" Ontology Graph Background Rendering */}
      <svg
        className="absolute inset-0 h-full w-full opacity-60"
        viewBox="0 0 420 220"
        fill="none"
        aria-hidden="true"
      >
        {/* Verified Savanna Gold relationship lines */}
        <path
          d="M-20 168C54 112 91 197 162 130C226 70 252 115 307 69C348 35 385 51 445 17"
          stroke="#C9A86A"
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
        {/* Inferred relationship dashed line */}
        <path
          d="M-10 195C72 144 115 207 183 153C248 101 277 143 329 103C365 76 394 82 438 58"
          stroke="#C9A86A"
          strokeOpacity="0.3"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Graph Nodes */}
        {[42, 88, 136, 186, 238, 286, 338, 386].map((x, nodeIndex) => {
          const y = 42 + ((nodeIndex * 31 + seed * 17) % 112);
          const isSelected = nodeIndex === 3;

          return (
            <g key={`${x}-${nodeIndex}`} className="group/node cursor-pointer">
              <circle
                cx={x}
                cy={y}
                r={isSelected ? 6 : nodeIndex % 3 === 0 ? 4 : 3}
                fill={isSelected ? '#064E3B' : '#FFFFFF'}
                stroke={isSelected ? '#C9A86A' : '#121619'}
                strokeWidth={isSelected ? 1.5 : 1}
                className="transition-all duration-300 group-hover/node:fill-[#D1FAE5] group-hover/node:stroke-[#064E3B] group-hover/node:r-6"
              />
              {nodeIndex > 0 && (
                <line
                  x1={x - 34}
                  y1={y - 11}
                  x2={x}
                  y2={y}
                  stroke="#C9A86A"
                  strokeOpacity="0.25"
                  strokeWidth="1.5"
                />
              )}
            </g>
          );
        })}

        <circle
          cx={cx * 3.2}
          cy={cy}
          r="34"
          stroke="#C9A86A"
          strokeOpacity="0.2"
        />
        <circle
          cx={cx * 3.2}
          cy={cy}
          r="9"
          fill="#064E3B"
          fillOpacity="0.8"
        />
      </svg>

      <div className="absolute inset-x-5 top-5 flex items-center justify-between">
        <span
          className="rounded-md border px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider"
          style={{
            borderColor: `${config.accent}45`,
            color: config.accent,
            backgroundColor: config.badgeBg,
          }}
        >
          {config.eyebrow}
        </span>

        <Icon
          size={18}
          strokeWidth={1.5}
          style={{ color: config.accent }}
        />
      </div>

      <div className="absolute inset-x-5 bottom-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
          Knowledge Entity
        </p>
        <p className="mt-1 font-serif text-lg font-bold text-text-main">{label}</p>
      </div>

      <div
        className="absolute bottom-0 left-0 h-0.5 w-1/2"
        style={{ backgroundColor: config.accent }}
      />
    </div>
  );
}
