import styles from './ContactBird.module.css';
import logo0 from '../../assets/newLogoTransparent.webp';
import logo1 from '../../assets/newLogoTransparent1.webp';
import logo2 from '../../assets/newLogoTransparent2.webp';

export function ContactBird() {
  return (
    <div className={['reveal', styles.bird].join(' ')} aria-hidden="true">
      <div className={styles.inner}>
        <img className={[styles.frame, styles.frameUp].join(' ')} src={logo1} alt="" />
        <img className={[styles.frame, styles.frameMid].join(' ')} src={logo0} alt="" />
        <img className={[styles.frame, styles.frameDown].join(' ')} src={logo2} alt="" />
      </div>
    </div>
  );
}
