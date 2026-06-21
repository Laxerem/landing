import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span>© 2026 Григорий Воробьёв</span>
        <span>Backend · C# · .NET</span>
        <a href="#top">Наверх ↑</a>
      </div>
    </footer>
  );
}
