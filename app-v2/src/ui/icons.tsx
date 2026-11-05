// Inline SVG icons matching the maquette stroke style.
type P = { size?: number; color?: string; className?: string };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  'aria-hidden': true as const,
});

export const CheckIcon = ({ size = 24, color = '#1E2A5A' }: P) => (
  <svg {...base(size)} stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

export const SearchIcon = ({ size = 20, color = '#5E5E66' }: P) => (
  <svg {...base(size)} stroke={color} strokeWidth={2} strokeLinecap="round">
    <circle cx="11" cy="11" r="6" />
    <path d="M20 20l-4.5-4.5" />
  </svg>
);

export const PlusIcon = ({ size = 20, color = '#FFFFFF' }: P) => (
  <svg {...base(size)} stroke={color} strokeWidth={2.5} strokeLinecap="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const ClockIcon = ({ size = 22, color = '#8A4A0F' }: P) => (
  <svg {...base(size)} stroke={color} strokeWidth={2} strokeLinecap="round">
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v4l3 2" />
  </svg>
);

export const PillIcon = ({ size = 22, color = '#1E2A5A' }: P) => (
  <svg {...base(size)} stroke={color} strokeWidth={2} strokeLinecap="round">
    <rect x="3" y="8" width="18" height="8" rx="4" />
    <path d="M12 8v8" />
  </svg>
);

export const CircleDashIcon = ({ size = 22, color = '#1E2A5A' }: P) => (
  <svg {...base(size)} stroke={color} strokeWidth={2} strokeLinecap="round">
    <circle cx="12" cy="12" r="7" />
    <path d="M8 12h8" />
  </svg>
);

export const ChevronLeft = ({ size = 20, color = '#1E2A5A' }: P) => (
  <svg {...base(size)} stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 5l-7 7 7 7" />
  </svg>
);

export const ChevronRight = ({ size = 20, color = '#8E8E93' }: P) => (
  <svg {...base(size)} stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 5l7 7-7 7" />
  </svg>
);

export const WarningIcon = ({ size = 28, color = '#B4262B' }: P) => (
  <svg {...base(size)} stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4l9 16H3z" />
    <path d="M12 10v4M12 17.5v.5" />
  </svg>
);

export const PhoneIcon = ({ size = 24, color = '#B4262B' }: P) => (
  <svg {...base(size)} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1" />
  </svg>
);

export const CrossSmall = ({ size = 24, color = '#1E2A5A' }: P) => (
  <svg {...base(size)} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12h16M12 4v16" />
  </svg>
);

export const HomeTab = ({ color }: { color: string }) => (
  <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-5H9v5H5a1 1 0 0 1-1-1z" />
  </svg>
);

export const JournalTab = ({ color }: { color: string }) => (
  <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 17c3-8 5-8 7-3s4 5 7-6l4 9" />
  </svg>
);

export const SearchTab = ({ color }: { color: string }) => (
  <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" aria-hidden>
    <circle cx="11" cy="11" r="6" />
    <path d="M20 20l-4.5-4.5" />
  </svg>
);

export const ProfileTab = ({ color }: { color: string }) => (
  <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" aria-hidden>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6" />
  </svg>
);
