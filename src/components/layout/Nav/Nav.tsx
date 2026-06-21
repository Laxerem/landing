import { useState, useEffect } from 'react';
import styles from './Nav.module.css';

function IconGitHub() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.05.78 2.12 0 1.53-.01 2.77-.01 3.15 0 .31.21.68.8.56A11.53 11.53 0 0 0 23.5 12.02C23.5 5.74 18.27.5 12 .5Z" />
    </svg>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={[styles.nav, scrolled ? styles.scrolled : ''].filter(Boolean).join(' ')}>
      <a href="#top" className={styles.brand}>
        <span className={styles.logo}>
          <img src="/laxerem_logo.png" alt="Laxerem" />
        </span>
        Laxerem
      </a>

      <div className={styles.links}>
        <a href="#about">Обо мне</a>
        <a href="#stack">Стек</a>
        <a href="#projects">Проекты</a>
        <a href="#contact">Контакты</a>
      </div>

      <a
        className={[styles.btn, styles.ghReveal].join(' ')}
        href="https://github.com/Laxerem"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
      >
        <IconGitHub />
        <span className={styles.ghLabel}>GitHub</span>
      </a>
    </nav>
  );
}
