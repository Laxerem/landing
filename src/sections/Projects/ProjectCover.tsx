import styles from './ProjectCover.module.css';
import type { ProjectItem } from '../../types/content';

interface ProjectCoverProps {
  project: ProjectItem;
}

export function ProjectCover({ project }: ProjectCoverProps) {
  const imgs = project.images ?? [];
  const hasImage = imgs.length > 0;

  return (
    <div
      className={[styles.cover, !hasImage ? styles.placeholder : ''].filter(Boolean).join(' ')}
      style={{ ['--c' as string]: project.langColor }}
    >
      {hasImage ? (
        <>
          <img src={imgs[0]} alt={`Превью ${project.name}`} />
          {imgs.length > 1 && (
            <span className={styles.count}>{imgs.length} фото</span>
          )}
        </>
      ) : (
        <>
          <span className={styles.orb} />
          <span className={styles.tag}>превью · {project.lang}</span>
        </>
      )}
    </div>
  );
}
