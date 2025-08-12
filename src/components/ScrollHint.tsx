// src/components/ScrollHint.tsx
import { useEffect, useState } from "react";
export default function ScrollHint() {
  const [hide, setHide] = useState(false);
  useEffect(() => {
    const onScroll = () => setHide(true);
    window.addEventListener("scroll", onScroll, { once: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (hide) return null;
  return (
    <div className="pointer-events-none fixed left-1/2 bottom-6 -translate-x-1/2 text-sm text-zinc-600 animate-bounce">
      <span className="px-3 py-1 rounded-full bg-white/80 ring-1 ring-black/5 backdrop-blur">
        Scroll
      </span>
    </div>
  );
}
