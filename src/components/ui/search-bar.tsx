import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="mb-6 w-full max-w-3xl">
      <label className="block text-sm font-medium text-muted-foreground mb-1">
        Organization Name
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="10" cy="10" r="4" />
            <path d="M16 16l-3-3" />
          </svg>
        </span>
        <Input
          className="pl-10"
          placeholder="Search for an Organization’s Requests"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
