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
    accent: '#D9A441',
    secondary: '#8BC7A8',
  },
  PLACE: {
    icon: MapPinned,
    eyebrow: 'PLACE',
    title: 'Place',
    accent: '#C96B4B',
    secondary: '#8BC7A8',
  },
  ORGANIZATION: {
    icon: Landmark,
    eyebrow: 'ORGANIZATION',
    title: 'Institution',
    accent: '#22A06B',
    secondary: '#D9A441',
  },
  CULTURE: {
    icon: Globe2,
    eyebrow: 'CULTURE',
    title: 'Culture',
    accent: '#E7D7B5',
    secondary: '#C96B4B',
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
    <div className="relative h-56 overflow-hidden bg-ink">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: `
            radial-gradient(circle at ${cx}% ${cy}%,
              ${config.accent}30 0,
              transparent 28%),
            radial-gradient(circle at ${100 - cx}% ${100 - cy}%,
              ${config.secondary}20 0,
              transparent 34%),
            linear-gradient(135deg, #10201A 0%, #0B1110 72%)
          `,
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full opacity-70"
        viewBox="0 0 420 220"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M-20 168C54 112 91 197 162 130C226 70 252 115 307 69C348 35 385 51 445 17"
          stroke={config.accent}
          strokeOpacity="0.32"
          strokeWidth="1"
        />
        <path
          d="M-10 195C72 144 115 207 183 153C248 101 277 143 329 103C365 76 394 82 438 58"
          stroke={config.secondary}
          strokeOpacity="0.24"
          strokeWidth="1"
        />

        {[42, 88, 136, 186, 238, 286, 338, 386].map((x, nodeIndex) => {
          const y = 42 + ((nodeIndex * 31 + seed * 17) % 112);

          return (
            <g key={`${x}-${nodeIndex}`}>
              <circle
                cx={x}
                cy={y}
                r={nodeIndex % 3 === 0 ? 3 : 2}
                fill={nodeIndex % 3 === 0 ? config.accent : config.secondary}
                fillOpacity={nodeIndex % 3 === 0 ? 0.72 : 0.4}
              />
              {nodeIndex > 0 && (
                <line
                  x1={x - 34}
                  y1={y - 11}
                  x2={x}
                  y2={y}
                  stroke={config.secondary}
                  strokeOpacity="0.12"
                />
              )}
            </g>
          );
        })}

        <circle
          cx={cx * 3.2}
          cy={cy}
          r="34"
          stroke={config.accent}
          strokeOpacity="0.2"
        />
        <circle
          cx={cx * 3.2}
          cy={cy}
          r="9"
          fill={config.accent}
          fillOpacity="0.18"
        />
      </svg>

      <div className="absolute inset-x-5 top-5 flex items-center justify-between">
        <span
          className="rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em]"
          style={{
            borderColor: `${config.accent}45`,
            color: config.accent,
            backgroundColor: `${config.accent}0d`,
          }}
        >
          {config.eyebrow}
        </span>

        <Icon
          size={17}
          strokeWidth={1.5}
          style={{ color: config.accent }}
        />
      </div>

      <div className="absolute inset-x-5 bottom-5">
        <p className="text-[10px] uppercase tracking-[0.18em] text-mist">
          Knowledge entity
        </p>
        <p className="mt-1 text-sm font-medium text-cloud">{label}</p>
      </div>

      <div
        className="absolute bottom-0 left-0 h-px w-1/2"
        style={{ backgroundColor: config.accent }}
      />
    </div>
  );
}
