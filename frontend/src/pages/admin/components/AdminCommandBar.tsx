import { Command, Search } from 'lucide-react';
import { useState } from 'react';

export interface AdminCommandBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

export function AdminCommandBar({
  placeholder = 'Search administration...',
  onSearch,
}: AdminCommandBarProps) {
  const [value, setValue] = useState('');

  function handleChange(nextValue: string) {
    setValue(nextValue);
    onSearch?.(nextValue);
  }

  return (
    <div className="relative w-full max-w-md">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cloud/30" />

      <input
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-10 w-full rounded-xl border border-white/[0.07] bg-black/10 pl-10 pr-12 text-sm text-cloud outline-none placeholder:text-cloud/30 transition focus:border-emerald/30 focus:bg-black/20"
      />

      <span className="pointer-events-none absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-lg border border-white/[0.06] bg-white/[0.025] px-2 py-1 text-[10px] font-medium text-cloud/30">
        <Command className="h-3 w-3" />
        K
      </span>
    </div>
  );
}

export default AdminCommandBar;
