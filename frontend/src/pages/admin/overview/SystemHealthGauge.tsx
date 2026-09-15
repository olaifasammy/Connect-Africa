export function SystemHealthGauge({ health = '98%' }: { health?: string }) {
  const percentage = parseInt(health, 10) || 98;
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#10201A]/60 p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-cloud">System Health</h2>
          <p className="mt-0.5 text-xs text-sage">All systems operational</p>
        </div>
      </div>

      <div className="my-5 flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center">
          <svg className="h-32 w-32 -rotate-90 transform" viewBox="0 0 120 120">
            {/* Background ring */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              className="stroke-white/[0.08]"
              strokeWidth="10"
              fill="none"
            />
            {/* Value ring */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#22A06B"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="none"
              className="transition-all duration-1000 ease-out"
              style={{ filter: 'drop-shadow(0 0 8px rgba(34, 160, 107, 0.4))' }}
            />
          </svg>

          {/* Centered Value */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-3xl font-bold tracking-tight text-cloud">
              {percentage}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SystemHealthGauge;
