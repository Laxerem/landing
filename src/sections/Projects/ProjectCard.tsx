import { ProjectCover } from './ProjectCover';
import styles from './ProjectCard.module.css';
import type { ProjectItem } from '../../types/content';

function IconArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="m12 2 2.95 6.6 7.05.62-5.34 4.7 1.6 6.98L12 17.77 5.74 20.9l1.6-6.98L2 9.22l7.05-.62z" />
    </svg>
  );
}

interface ProjectCardProps {
  project: ProjectItem;
  onOpen: (project: ProjectItem) => void;
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <button
      type="button"
      className={styles.card}
      onClick={() => onOpen(project)}
      aria-label={`Открыть описание проекта ${project.name}`}
    >
      <ProjectCover project={project} />
      <div className={styles.body}>
        <h3 className={styles.name}>{project.name}</h3>
        <p className={styles.desc}>{project.description}</p>
        <div className={styles.foot}>
          {project.stars > 0 && (
            <span className={styles.stars}>
              <IconStar /> {project.stars}
              <span className={styles.starsLbl}>на GitHub</span>
            </span>
          )}
          <span className={styles.see}>
            Смотреть <IconArrow />
          </span>
        </div>
      </div>
    </button>
  );
}
