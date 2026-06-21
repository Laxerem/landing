import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    let raf = 0;

    const check = () => {
      raf = 0;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      document.querySelectorAll<HTMLElement>('.reveal:not(.in)').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > 0) el.classList.add('in');
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };

    requestAnimationFrame(check);
    const t = setTimeout(check, 120);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}
