import { useState, useEffect, useRef } from 'react';

interface CountUpProps {
  end: number;
  dur?: number;
  suffix?: string;
}

export function CountUp({ end, dur = 1500, suffix = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (done.current) return;
      done.current = true;
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(end * e));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (ents) => ents.forEach((en) => en.isIntersecting && run()),
      { threshold: 0.35 },
    );
    io.observe(el);

    const t = setTimeout(() => {
      const r = el.getBoundingClientRect();
      if (r.top < (window.innerHeight || 800)) run();
    }, 700);

    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, [end, dur]);

  return (
    <span ref={ref}>
      {val}{suffix}
    </span>
  );
}
