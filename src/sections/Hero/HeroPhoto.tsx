import styles from './HeroPhoto.module.css';

interface HeroPhotoProps {
  src: string;
  alt: string;
}

export function HeroPhoto({ src, alt }: HeroPhotoProps) {
  return (
    <div className={styles.photoCol}>
      <div className={styles.photoWrap}>
        <img src={src} alt={alt} className={styles.photo} draggable={false} />
      </div>
    </div>
  );
}
