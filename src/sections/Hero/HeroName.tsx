import styles from './HeroName.module.css';

interface HeroNameProps {
  firstName: string;
  lastName: string;
}

export function HeroName({ firstName, lastName }: HeroNameProps) {
  return (
    <h1 className={styles.name}>
      <span className={styles.silver}>{firstName}</span>
      <br />
      <span className={[styles.silver, styles.shine].join(' ')}>{lastName}</span>
    </h1>
  );
}
