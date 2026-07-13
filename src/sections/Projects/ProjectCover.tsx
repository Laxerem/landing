import { useImageLoad } from '../../hooks/useImageLoad';
import styles from './ProjectCover.module.css';
import type { ProjectItem } from '../../types/content';

interface ProjectCoverProps {
  project: ProjectItem;
}

export function ProjectCover({ project }: ProjectCoverProps) {
  const { loaded, loading } = useImageLoad(project.coverImageUrl);
  const galleryCount = project.images?.length ?? 0;
  const hasUrl = !!project.coverImageUrl;

  return (
    <div
      className={styles.cover}
      style={{ ['--c' as string]: project.langColor }}
    >
      {hasUrl ? (
        <>
          {loading && <span className={styles.shimmer} />}
          <img
            src={project.coverImageUrl}
            alt={`Превью ${project.name}`}
            style={{ opacity: loaded ? 1 : 0 }}
          />
          {loaded && galleryCount > 1 && (
            <span className={styles.count}>{galleryCount} фото</span>
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
