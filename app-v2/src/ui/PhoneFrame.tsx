import type { ReactNode } from 'react';

// On a real phone the app fills the screen. In a desktop browser we center a
// 390x844 iPhone-sized frame so it matches the maquettes.
export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-full w-full flex items-center justify-center">
      <div
        className="bg-ios text-ink font-sys flex flex-col overflow-hidden relative w-full h-[100dvh] sm:w-[390px] sm:h-[844px] sm:rounded-[44px] sm:shadow-2xl"
      >
        {children}
      </div>
    </div>
  );
}
