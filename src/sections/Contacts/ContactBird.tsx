import styles from './ContactBird.module.css';

export function ContactBird() {
  return (
    <div className={['reveal', styles.bird].join(' ')} aria-hidden="true">
      <div className={styles.inner}>
        <img className={[styles.frame, styles.frameUp].join(' ')} src="/newLogoTransparent1.png" alt="" />
        <img className={[styles.frame, styles.frameMid].join(' ')} src="/newLogoTransparent.png" alt="" />
        <img className={[styles.frame, styles.frameDown].join(' ')} src="/newLogoTransparent2.png" alt="" />
      </div>
    </div>
  );
}
